import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const configured = isAdminConfigured();

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center">
        <div className="grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/4 p-8 md:p-10">
            <span className="section-label">Admin Panel</span>
            <h1
              className="mt-6 text-4xl font-black leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Tüm site içeriklerini tek panelden yönetin.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
              Ana sayfa, footer, blog yazıları, hizmet sayfaları, ikonlar ve görsel
              URL&apos;leri bu panelden düzenlenebilir.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-white/55">
              <div className="rounded-2xl border border-white/8 bg-black/25 px-4 py-3">
                Ana sayfa başlıkları, kartları, istatistikleri ve CTA alanları
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/25 px-4 py-3">
                Header, footer, iletişim alanları ve sosyal linkler
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/25 px-4 py-3">
                Hizmet landing page içerikleri ve blog yazı editörü
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-primary/15 bg-white/[0.03] p-8 md:p-10">
            <h2
              className="text-3xl font-black"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Giriş Yap
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/45">
              Yönetim paneline erişmek için admin şifresini girin.
            </p>

            {!configured ? (
              <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-50">
                `ADMIN_PASSWORD` henüz tanımlı değil. `.env.local` dosyasında bu değeri
                oluşturmanız gerekiyor.
              </div>
            ) : null}

            <div className="mt-8">
              <AdminLoginForm configured={configured} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
