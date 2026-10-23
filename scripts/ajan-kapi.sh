#!/usr/bin/env bash
# SEO-GEO ajanının yayın kapısı (PlusDijital/seo-geo-ajani > site-sablonlari/ajan-kapi.sh kopyası).
# GitHub Actions'ta main dalındaki "SEO ajanı: yayın kapısı" iş akışından (zamanlanmış) çalışır;
# ajan dallarındaki hiçbir dosya bu scripti ya da iş akışını değiştiremez.
#
# 1) origin/claude/ajan-* dallarından en eskisini alır ve ajandan bağımsız denetler:
#    yalnızca izinli dosyalar, silme yok, güncellenen içerikte adres değişmemiş, YAYINLA raporu,
#    sitenin kural kontrolü, canlı derleme. Geçerse main'e birleştirir (yayın iş akışta yapılır).
#    Geçmezse dalı claude/taslak-* yapar ve issue açar.
# 2) Bildirilmemiş claude/taslak-* dalları için issue açar.
#
# Ortam (iş akışı verir):
#   KAPI_YENI      eklenebilecek dosyalar (regex)       KAPI_DEGISIM  değiştirilebilecek dosyalar (regex)
#   KAPI_ICERIK    içerik dosyaları (regex)             KAPI_KONTROL  içerik dosyası başına kontrol komutu
#   KAPI_DERLE     derleme komutu                       KAPI_CIKTI    derleme sonrası kontrol komutu (isteğe bağlı)
#   SEO_AJANI_DURDUR, SEO_AJANI_HAFTALIK (varsayılan 3), GH_TOKEN
# Yerel deneme: KAPI_TEST=1 KURU=1 bash scripts/ajan-kapi.sh

set -euo pipefail

if [ "${GITHUB_ACTIONS:-}" != "true" ] && [ "${KAPI_TEST:-}" != "1" ]; then
  echo "Bu script GitHub Actions içinde çalışır. Yerel deneme için: KAPI_TEST=1 KURU=1" >&2
  exit 2
fi

MAX="${SEO_AJANI_HAFTALIK:-3}"
KURU="${KURU:-0}"
OZET="${GITHUB_STEP_SUMMARY:-/dev/stdout}"
CIKIS="${GITHUB_OUTPUT:-/dev/null}"
RAPOR_DESEN='^seo-ajani/raporlar/[A-Za-z0-9._-]+\.md$'
BOT=(-c user.name="SEO-GEO Ajanı" -c user.email="41898282+github-actions[bot]@users.noreply.github.com")

calistir() { if [ "$KURU" = "1" ]; then echo "[kuru] $*"; else "$@"; fi; }
issue() { # baslik govde_dosyasi
  if gh issue list --state all --search "\"$1\" in:title" --json title --jq '.[].title' 2>/dev/null | grep -qxF "$1"; then return 0; fi
  calistir gh issue create --title "$1" --body-file "$2" || true
}
adres() { # içerik dosyasının adresini tanımlayan satır (path:, "slug": ya da dosya adı)
  local icerik; icerik=$(cat)
  printf '%s\n' "$icerik" | grep -m1 -E '^path:|^slug:|"slug"[[:space:]]*:' || true
}

git fetch -q --prune origin '+refs/heads/*:refs/remotes/origin/*'
git checkout -q -B main origin/main

# --- 2) Taslak bildirimleri ----------------------------------------------------------------
for ref in $(git for-each-ref --format='%(refname:short)' 'refs/remotes/origin/claude/taslak-*'); do
  dal="${ref#origin/}"; slug="${dal#claude/taslak-}"
  rapor=$(git ls-tree -r --name-only "$ref" -- seo-ajani/raporlar | grep -- "-$slug\.md$" | head -1 || true)
  {
    echo "SEO ajanı bir içerik hazırladı ama kontrollerden geçmediği için **yayınlanmadı**. Siteye hiçbir şey eklenmedi."
    echo; echo "- Dal: \`$dal\`"
    if [ -n "$rapor" ]; then echo; echo "<details><summary>Rapor</summary>"; echo; git show "$ref:$rapor"; echo; echo "</details>"; fi
    echo; echo "Beğenirseniz bu daldan PR açıp birleştirebilirsiniz; istemiyorsanız dalı silmeniz yeterli."
  } > /tmp/taslak.md
  issue "SEO ajanı: yayınlanmadı ($slug)" /tmp/taslak.md
done

# --- 1) Yayın dalı ----------------------------------------------------------------------------
DAL_REF=$(git for-each-ref --sort=committerdate --format='%(refname:short)' 'refs/remotes/origin/claude/ajan-*' | head -1)
if [ -z "$DAL_REF" ]; then echo "Yayın bekleyen dal yok."; exit 0; fi
DAL="${DAL_REF#origin/}"
SLUG="${DAL#claude/ajan-}"
echo "Denetlenen dal: $DAL"

reddet() {
  echo "Yayın yapılmadı: $1"
  {
    echo "Otomatik yayın kapısı içeriği **yayınlamadı**. Siteye hiçbir şey eklenmedi."
    echo; echo "- Neden: $1"
    echo "- Dal: \`claude/taslak-$SLUG\`"
    [ -n "${GITHUB_RUN_ID:-}" ] && echo "- Ayrıntı: $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
    echo; echo "Yine de yayınlamak isterseniz bu daldan PR açabilirsiniz; istemiyorsanız dalı silmeniz yeterli."
  } > /tmp/red.md
  git merge --abort 2>/dev/null || true
  calistir git push -q origin "$DAL_REF:refs/heads/claude/taslak-$SLUG"
  calistir git push -q origin --delete "$DAL"
  issue "SEO ajanı: yayınlanmadı ($SLUG)" /tmp/red.md
  echo "### Yayınlanmadı: $SLUG — $1" >> "$OZET"
  exit 0
}

if [ "${SEO_AJANI_DURDUR:-0}" = "1" ] || [ -f seo-ajani/DURDUR ]; then
  echo "SEO ajanı durdurulmuş; dal beklemede bırakıldı."; exit 0
fi
N=$(git log origin/main --since="7 days ago" --grep="^Ajan:" --oneline | wc -l | tr -d ' ')
if [ "$N" -ge "$MAX" ]; then echo "Haftalık sınır dolu ($N/$MAX); dal bekletiliyor."; exit 0; fi

# Dosya kapısı
BASE=$(git merge-base origin/main "$DAL_REF")
git diff --name-status --no-renames "$BASE" "$DAL_REF" > /tmp/degisen.txt
cat /tmp/degisen.txt
while read -r durum dosya; do
  case "$durum" in
    A) echo "$dosya" | grep -qE "$KAPI_YENI|$RAPOR_DESEN" || reddet "İzin dışı yeni dosya: $dosya" ;;
    M) echo "$dosya" | grep -qE "$KAPI_DEGISIM" || reddet "İzin dışı değişiklik: $dosya"
       [ "$(git show "$BASE:$dosya" | adres)" = "$(git show "$DAL_REF:$dosya" | adres)" ] || reddet "Güncellenen içeriğin adresi değişmiş: $dosya" ;;
    *) reddet "Silme ya da başka bir işlem yapılmış ($durum $dosya)" ;;
  esac
done < /tmp/degisen.txt
ICERIK=$(awk '{print $2}' /tmp/degisen.txt | grep -E "$KAPI_ICERIK" || true)
[ -n "$ICERIK" ] || reddet "Dalda içerik dosyası yok"
[ "$(echo "$ICERIK" | grep -c .)" -le 2 ] || reddet "Bir dalda en fazla 2 içerik dosyası olabilir"
RAPOR=$(awk '{print $2}' /tmp/degisen.txt | grep -E "^seo-ajani/raporlar/.*-$SLUG\.md$" | head -1 || true)
[ -n "$RAPOR" ] || reddet "Denetçi raporu yok (seo-ajani/raporlar/*-$SLUG.md)"
git show "$DAL_REF:$RAPOR" | head -1 | grep -q "^KARAR: YAYINLA" || reddet "Raporda YAYINLA kararı yok"
BASLIK=$(git show "$DAL_REF:$RAPOR" | sed -n 's/^BASLIK: //p' | head -1)
[ -n "$BASLIK" ] || BASLIK="$SLUG"

# Birleştir (henüz commit'leme), main'deki kontrollerle denetle ve derle
git "${BOT[@]}" merge -q --no-ff --no-commit "$DAL_REF" || reddet "main ile birleştirmede çakışma var"
for d in $ICERIK; do
  $KAPI_KONTROL "$d" || reddet "Kural kontrolü geçmedi: $d"
done
bash -c "$KAPI_DERLE" > /tmp/derleme.log 2>&1 || { tail -40 /tmp/derleme.log; reddet "Site derlenemedi"; }
if [ -n "${KAPI_CIKTI:-}" ]; then bash -c "$KAPI_CIKTI" || reddet "Derleme çıktısı kontrolü geçmedi"; fi

git "${BOT[@]}" commit -q -m "Ajan: $BASLIK" -m "Dal: $DAL"
calistir git push -q origin main
calistir git push -q origin --delete "$DAL"
echo "yayinla=true" >> "$CIKIS"
{ echo "### Birleştirildi: $BASLIK"; echo "Dal: $DAL"; } >> "$OZET"
