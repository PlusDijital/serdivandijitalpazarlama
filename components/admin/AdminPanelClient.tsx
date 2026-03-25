"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Code2,
  Copy,
  ExternalLink,
  Globe,
  Home,
  ImagePlus,
  LayoutGrid,
  LogOut,
  Newspaper,
  Phone,
  Plus,
  Save,
  Trash2,
  Users,
} from "lucide-react";
import type {
  AboutValue,
  BlogPost,
  CmsData,
  ContactItem,
  IconName,
  LinkItem,
  ProcessStep,
  ServiceCard,
  ServiceLandingPage,
  SocialLink,
  TeamMember,
  Testimonial,
} from "@/lib/cms-types";
import { CONTENT_ICON_OPTIONS } from "@/lib/icon-map";

type TabId =
  | "general"
  | "home"
  | "about"
  | "contact"
  | "services"
  | "blog"
  | "media"
  | "json";

type PathPart = string | number;

type TabConfig = {
  id: TabId;
  label: string;
  icon: typeof Home;
};

const tabs: TabConfig[] = [
  { id: "general", label: "Genel", icon: Globe },
  { id: "home", label: "Ana Sayfa", icon: Home },
  { id: "about", label: "Hakkımızda", icon: Users },
  { id: "contact", label: "İletişim", icon: Phone },
  { id: "services", label: "Hizmetler", icon: LayoutGrid },
  { id: "blog", label: "Blog", icon: Newspaper },
  { id: "media", label: "Medya", icon: ImagePlus },
  { id: "json", label: "Ham JSON", icon: Code2 },
];

function getAtPath(value: unknown, path: PathPart[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return path.reduce((accumulator: any, key) => accumulator?.[key], value);
}

function setAtPath<T>(value: T, path: PathPart[], nextValue: unknown): T {
  if (path.length === 0) {
    return nextValue as T;
  }

  const [head, ...tail] = path;

  if (Array.isArray(value)) {
    return value.map((item, index) =>
      index === head ? setAtPath(item, tail, nextValue) : item,
    ) as T;
  }

  const objectValue = value as Record<string, unknown>;

  return {
    ...objectValue,
    [head]:
      tail.length === 0
        ? nextValue
        : setAtPath(objectValue[head] as never, tail, nextValue),
  } as T;
}

function appendAtPath<T>(value: T, path: PathPart[], item: unknown): T {
  const current = getAtPath(value, path);

  if (!Array.isArray(current)) {
    return value;
  }

  return setAtPath(value, path, [...current, item]);
}

function removeFromPath<T>(value: T, path: PathPart[], index: number): T {
  const current = getAtPath(value, path);

  if (!Array.isArray(current)) {
    return value;
  }

  return setAtPath(
    value,
    path,
    current.filter((_, currentIndex) => currentIndex !== index),
  );
}

function createLink(): LinkItem {
  return { label: "", href: "" };
}

function createSocialLink(): SocialLink {
  return { label: "", href: "", icon: "instagram" };
}

function createContactItem(): ContactItem {
  return { label: "", value: "", href: "", icon: "mail" };
}

function createServiceCard(): ServiceCard {
  return {
    icon: "bar-chart-3",
    tag: "",
    num: "00",
    title: "",
    description: "",
    span: "",
    href: "",
    footerText: "",
  };
}

function createProcessStep(): ProcessStep {
  return {
    num: "00",
    icon: "search",
    title: "",
    description: "",
    detail: "",
  };
}

function createAboutValue(): AboutValue {
  return {
    icon: "target",
    title: "",
    description: "",
  };
}

function createTeamMember(): TeamMember {
  return {
    name: "",
    role: "",
    description: "",
    avatar: "",
  };
}

function createTestimonial(): Testimonial {
  return {
    quote: "",
    name: "",
    role: "",
    company: "",
    avatar: "",
  };
}

function createServiceLandingPage(): ServiceLandingPage {
  return {
    slug: `yeni-hizmet-${Date.now()}`,
    navLabel: "Yeni Hizmet",
    eyebrow: "",
    title: "",
    metaTitle: "",
    metaDescription: "",
    heroTitle: "",
    heroDescription: "",
    primaryKeyword: "",
    secondaryKeywords: [],
    localFocus: [],
    benefits: [],
    deliverables: [],
    process: [{ title: "", description: "" }],
    faq: [{ question: "", answer: "" }],
    relatedPosts: [],
  };
}

function createBlogPost(): BlogPost {
  return {
    slug: `yeni-yazi-${Date.now()}`,
    title: "",
    metaTitle: "",
    metaDescription: "",
    excerpt: "",
    date: "",
    readTime: "",
    category: "",
    intro: "",
    primaryKeyword: "",
    secondaryKeywords: [],
    relatedServiceSlug: "",
    sections: [{ heading: "", body: "" }],
    coverImage: "",
    publishedAt: "",
    updatedAt: "",
    authorName: "",
  };
}

function PanelCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
      <div className="mb-5">
        <h2
          className="text-xl font-black text-white"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            {description}
          </p>
        ) : null}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/70">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40 focus:bg-white/5"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/70">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40 focus:bg-white/5"
      />
    </label>
  );
}

function IconSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: IconName;
  onChange: (value: IconName) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/70">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as IconName)}
        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40 focus:bg-white/5"
      >
        {CONTENT_ICON_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="bg-black">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ArrayActions({
  onAdd,
  addLabel,
}: {
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/50 hover:bg-primary/15"
    >
      <Plus size={15} />
      {addLabel}
    </button>
  );
}

function RemoveButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100 transition hover:bg-red-500/15"
    >
      <Trash2 size={14} />
      Sil
    </button>
  );
}

function SubCard({
  title,
  children,
  onRemove,
}: {
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
}) {
  return (
    <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-white/70">{title}</h3>
        {onRemove ? <RemoveButton onClick={onRemove} /> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function StringListEditor({
  label,
  values,
  onChange,
  addLabel = "Öğe ekle",
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  addLabel?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-white/70">{label}</span>
        <ArrayActions onAdd={() => onChange([...values, ""])} addLabel={addLabel} />
      </div>
      <div className="space-y-3">
        {values.map((item, index) => (
          <div key={`${label}-${index}`} className="flex gap-3">
            <input
              value={item}
              onChange={(event) =>
                onChange(
                  values.map((current, currentIndex) =>
                    currentIndex === index ? event.target.value : current,
                  ),
                )
              }
              className="flex-1 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40 focus:bg-white/5"
            />
            <button
              type="button"
              onClick={() =>
                onChange(values.filter((_, currentIndex) => currentIndex !== index))
              }
              className="rounded-2xl border border-white/10 px-3 text-white/50 transition hover:border-red-500/30 hover:text-red-100"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanelClient({
  initialData,
}: {
  initialData: CmsData;
}) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);
  const [jsonDraft, setJsonDraft] = useState(
    JSON.stringify(initialData, null, 2),
  );
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedService = data.serviceLandingPages[selectedServiceIndex];
  const selectedPost = data.blogPosts[selectedPostIndex];

  function update(path: PathPart[], value: unknown) {
    setData((current) => setAtPath(current, path, value));
  }

  function append(path: PathPart[], item: unknown) {
    setData((current) => appendAtPath(current, path, item));
  }

  function remove(path: PathPart[], index: number) {
    setData((current) => removeFromPath(current, path, index));
  }

  async function handleSave() {
    setIsSaving(true);
    setSaveMessage("");
    setErrorMessage("");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    if (!response.ok) {
      setIsSaving(false);
      setErrorMessage(result?.error ?? "Kaydetme işlemi başarısız.");
      return;
    }

    setIsSaving(false);
    setSaveMessage("İçerikler kaydedildi.");
    setJsonDraft(JSON.stringify(data, null, 2));
    router.refresh();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const result = (await response.json().catch(() => null)) as {
      error?: string;
      url?: string;
    } | null;

    if (!response.ok || !result?.url) {
      setUploading(false);
      setErrorMessage(result?.error ?? "Dosya yüklenemedi.");
      return;
    }

    setUploading(false);
    setUploadedImages((current) => [result.url as string, ...current]);

    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(result.url);
    }
  }

  function applyJsonDraft() {
    try {
      const parsed = JSON.parse(jsonDraft) as CmsData;
      setData(parsed);
      setSaveMessage("JSON taslağı çalışma alanına uygulandı.");
      setErrorMessage("");
    } catch {
      setErrorMessage("JSON formatı geçersiz.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden w-72 shrink-0 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 lg:block">
          <div className="border-b border-white/8 pb-5">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">
              Serdivan CMS
            </p>
            <h1
              className="mt-3 text-3xl font-black"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Admin Panel
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/45">
              Metin, ikon, link, görsel URL&apos;leri ve blog içeriklerini yönetin.
            </p>
          </div>

          <nav className="mt-5 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    isActive
                      ? "border border-primary/30 bg-primary/12 text-primary"
                      : "border border-transparent text-white/60 hover:border-white/8 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={17} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          <header className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="flex flex-wrap gap-2 lg:hidden">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                        activeTab === tab.id
                          ? "bg-primary text-black"
                          : "border border-white/10 text-white/60"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <h2
                  className="mt-3 text-3xl font-black"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {tabs.find((tab) => tab.id === activeTab)?.label}
                </h2>
                <p className="mt-2 text-sm text-white/45">
                  Değişiklikleri kaydettikten sonra site anında yeni içerikle çalışır.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={data.site.siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-primary/30 hover:text-primary"
                >
                  Siteyi Aç
                  <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Save size={16} />
                  {isSaving ? "Kaydediliyor..." : "Kaydet"}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-red-500/30 hover:text-red-100"
                >
                  <LogOut size={15} />
                  Çıkış
                </button>
              </div>
            </div>

            {saveMessage ? (
              <div className="mt-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                {saveMessage}
              </div>
            ) : null}

            {errorMessage ? (
              <div className="mt-4 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {errorMessage}
              </div>
            ) : null}
          </header>

          {activeTab === "general" ? (
            <div className="space-y-6">
              <PanelCard title="Site Ayarları">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Site URL"
                    value={data.site.siteUrl}
                    onChange={(value) => update(["site", "siteUrl"], value)}
                  />
                  <Field
                    label="Uygulama Adı"
                    value={data.site.applicationName}
                    onChange={(value) => update(["site", "applicationName"], value)}
                  />
                  <Field
                    label="Marka Adı"
                    value={data.site.brandName}
                    onChange={(value) => update(["site", "brandName"], value)}
                  />
                  <Field
                    label="Kısa Marka Adı"
                    value={data.site.brandShortName}
                    onChange={(value) => update(["site", "brandShortName"], value)}
                  />
                  <Field
                    label="Logo Harfi"
                    value={data.site.logoInitial}
                    onChange={(value) => update(["site", "logoInitial"], value)}
                  />
                </div>
              </PanelCard>

              <PanelCard title="Header">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Header CTA Metni"
                    value={data.header.cta.label}
                    onChange={(value) => update(["header", "cta", "label"], value)}
                  />
                  <Field
                    label="Header CTA Linki"
                    value={data.header.cta.href}
                    onChange={(value) => update(["header", "cta", "href"], value)}
                  />
                  <Field
                    label="Mobil CTA Metni"
                    value={data.header.mobileCtaLabel}
                    onChange={(value) =>
                      update(["header", "mobileCtaLabel"], value)
                    }
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-white/70">Menü Linkleri</h3>
                    <ArrayActions
                      onAdd={() => append(["header", "navLinks"], createLink())}
                      addLabel="Link ekle"
                    />
                  </div>
                  {data.header.navLinks.map((link, index) => (
                    <SubCard
                      key={`header-link-${index}`}
                      title={`Menü Linki ${index + 1}`}
                      onRemove={() => remove(["header", "navLinks"], index)}
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field
                          label="Metin"
                          value={link.label}
                          onChange={(value) =>
                            update(["header", "navLinks", index, "label"], value)
                          }
                        />
                        <Field
                          label="Link"
                          value={link.href}
                          onChange={(value) =>
                            update(["header", "navLinks", index, "href"], value)
                          }
                        />
                      </div>
                    </SubCard>
                  ))}
                </div>
              </PanelCard>

              <PanelCard title="Footer">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Üst Şerit Küçük Metin"
                    value={data.footer.topPrompt}
                    onChange={(value) => update(["footer", "topPrompt"], value)}
                  />
                  <Field
                    label="Üst Şerit Başlık"
                    value={data.footer.topTitle}
                    onChange={(value) => update(["footer", "topTitle"], value)}
                  />
                  <Field
                    label="Üst Şerit CTA Metni"
                    value={data.footer.topCta.label}
                    onChange={(value) =>
                      update(["footer", "topCta", "label"], value)
                    }
                  />
                  <Field
                    label="Üst Şerit CTA Linki"
                    value={data.footer.topCta.href}
                    onChange={(value) => update(["footer", "topCta", "href"], value)}
                  />
                  <Field
                    label="Hızlı Bağlantılar Başlığı"
                    value={data.footer.quickLinksTitle}
                    onChange={(value) =>
                      update(["footer", "quickLinksTitle"], value)
                    }
                  />
                  <Field
                    label="Hizmetler Başlığı"
                    value={data.footer.serviceLinksTitle}
                    onChange={(value) =>
                      update(["footer", "serviceLinksTitle"], value)
                    }
                  />
                  <Field
                    label="İletişim Başlığı"
                    value={data.footer.contactTitle}
                    onChange={(value) => update(["footer", "contactTitle"], value)}
                  />
                  <Field
                    label="Çalışma Saatleri Başlığı"
                    value={data.footer.workingHoursLabel}
                    onChange={(value) =>
                      update(["footer", "workingHoursLabel"], value)
                    }
                  />
                  <Field
                    label="Çalışma Saatleri"
                    value={data.footer.workingHoursValue}
                    onChange={(value) =>
                      update(["footer", "workingHoursValue"], value)
                    }
                  />
                </div>
                <TextAreaField
                  label="Footer Marka Açıklaması"
                  value={data.footer.brandDescription}
                  onChange={(value) =>
                    update(["footer", "brandDescription"], value)
                  }
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-white/70">Sosyal Linkler</h3>
                    <ArrayActions
                      onAdd={() => append(["footer", "socialLinks"], createSocialLink())}
                      addLabel="Sosyal link ekle"
                    />
                  </div>
                  {data.footer.socialLinks.map((item, index) => (
                    <SubCard
                      key={`social-${index}`}
                      title={`Sosyal Link ${index + 1}`}
                      onRemove={() => remove(["footer", "socialLinks"], index)}
                    >
                      <div className="grid gap-4 md:grid-cols-3">
                        <Field
                          label="Etiket"
                          value={item.label}
                          onChange={(value) =>
                            update(["footer", "socialLinks", index, "label"], value)
                          }
                        />
                        <Field
                          label="URL"
                          value={item.href}
                          onChange={(value) =>
                            update(["footer", "socialLinks", index, "href"], value)
                          }
                        />
                        <IconSelect
                          label="İkon"
                          value={item.icon}
                          onChange={(value) =>
                            update(["footer", "socialLinks", index, "icon"], value)
                          }
                        />
                      </div>
                    </SubCard>
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-sm font-semibold text-white/70">Hızlı Linkler</h3>
                      <ArrayActions
                        onAdd={() => append(["footer", "quickLinks"], createLink())}
                        addLabel="Link ekle"
                      />
                    </div>
                    {data.footer.quickLinks.map((link, index) => (
                      <SubCard
                        key={`quick-${index}`}
                        title={`Link ${index + 1}`}
                        onRemove={() => remove(["footer", "quickLinks"], index)}
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field
                            label="Metin"
                            value={link.label}
                            onChange={(value) =>
                              update(["footer", "quickLinks", index, "label"], value)
                            }
                          />
                          <Field
                            label="URL"
                            value={link.href}
                            onChange={(value) =>
                              update(["footer", "quickLinks", index, "href"], value)
                            }
                          />
                        </div>
                      </SubCard>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-sm font-semibold text-white/70">Footer Hizmet Linkleri</h3>
                      <ArrayActions
                        onAdd={() => append(["footer", "serviceLinks"], createLink())}
                        addLabel="Hizmet linki ekle"
                      />
                    </div>
                    {data.footer.serviceLinks.map((link, index) => (
                      <SubCard
                        key={`service-link-${index}`}
                        title={`Hizmet Linki ${index + 1}`}
                        onRemove={() => remove(["footer", "serviceLinks"], index)}
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field
                            label="Metin"
                            value={link.label}
                            onChange={(value) =>
                              update(["footer", "serviceLinks", index, "label"], value)
                            }
                          />
                          <Field
                            label="URL"
                            value={link.href}
                            onChange={(value) =>
                              update(["footer", "serviceLinks", index, "href"], value)
                            }
                          />
                        </div>
                      </SubCard>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-white/70">İletişim Öğeleri</h3>
                    <ArrayActions
                      onAdd={() => append(["footer", "contactItems"], createContactItem())}
                      addLabel="İletişim öğesi ekle"
                    />
                  </div>
                  {data.footer.contactItems.map((item, index) => (
                    <SubCard
                      key={`footer-contact-${index}`}
                      title={`İletişim ${index + 1}`}
                      onRemove={() => remove(["footer", "contactItems"], index)}
                    >
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <Field
                          label="Başlık"
                          value={item.label}
                          onChange={(value) =>
                            update(["footer", "contactItems", index, "label"], value)
                          }
                        />
                        <Field
                          label="Değer"
                          value={item.value}
                          onChange={(value) =>
                            update(["footer", "contactItems", index, "value"], value)
                          }
                        />
                        <Field
                          label="Link"
                          value={item.href}
                          onChange={(value) =>
                            update(["footer", "contactItems", index, "href"], value)
                          }
                        />
                        <IconSelect
                          label="İkon"
                          value={item.icon}
                          onChange={(value) =>
                            update(["footer", "contactItems", index, "icon"], value)
                          }
                        />
                      </div>
                    </SubCard>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-white/70">Yasal Linkler</h3>
                    <ArrayActions
                      onAdd={() => append(["footer", "legalLinks"], createLink())}
                      addLabel="Link ekle"
                    />
                  </div>
                  {data.footer.legalLinks.map((link, index) => (
                    <SubCard
                      key={`legal-${index}`}
                      title={`Yasal Link ${index + 1}`}
                      onRemove={() => remove(["footer", "legalLinks"], index)}
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field
                          label="Metin"
                          value={link.label}
                          onChange={(value) =>
                            update(["footer", "legalLinks", index, "label"], value)
                          }
                        />
                        <Field
                          label="URL"
                          value={link.href}
                          onChange={(value) =>
                            update(["footer", "legalLinks", index, "href"], value)
                          }
                        />
                      </div>
                    </SubCard>
                  ))}
                </div>
              </PanelCard>
            </div>
          ) : null}

          {activeTab === "home" ? (
            <div className="space-y-6">
              <PanelCard title="Hero Alanı">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Eyebrow"
                    value={data.home.hero.eyebrow}
                    onChange={(value) => update(["home", "hero", "eyebrow"], value)}
                  />
                  <Field
                    label="Vurgu Metni"
                    value={data.home.hero.titleHighlight}
                    onChange={(value) =>
                      update(["home", "hero", "titleHighlight"], value)
                    }
                  />
                  <Field
                    label="Birincil CTA Metni"
                    value={data.home.hero.primaryCta.label}
                    onChange={(value) =>
                      update(["home", "hero", "primaryCta", "label"], value)
                    }
                  />
                  <Field
                    label="Birincil CTA Linki"
                    value={data.home.hero.primaryCta.href}
                    onChange={(value) =>
                      update(["home", "hero", "primaryCta", "href"], value)
                    }
                  />
                  <Field
                    label="İkincil CTA Metni"
                    value={data.home.hero.secondaryCta.label}
                    onChange={(value) =>
                      update(["home", "hero", "secondaryCta", "label"], value)
                    }
                  />
                  <Field
                    label="İkincil CTA Linki"
                    value={data.home.hero.secondaryCta.href}
                    onChange={(value) =>
                      update(["home", "hero", "secondaryCta", "href"], value)
                    }
                  />
                  <Field
                    label="Puan Rozeti"
                    value={data.home.hero.ratingBadge}
                    onChange={(value) => update(["home", "hero", "ratingBadge"], value)}
                  />
                  <Field
                    label="Trend Rozeti"
                    value={data.home.hero.trendBadge}
                    onChange={(value) => update(["home", "hero", "trendBadge"], value)}
                  />
                  <Field
                    label="Panel Eyebrow"
                    value={data.home.hero.panelEyebrow}
                    onChange={(value) =>
                      update(["home", "hero", "panelEyebrow"], value)
                    }
                  />
                  <Field
                    label="Panel Başlığı"
                    value={data.home.hero.panelTitle}
                    onChange={(value) => update(["home", "hero", "panelTitle"], value)}
                  />
                  <Field
                    label="Panel Durumu"
                    value={data.home.hero.panelStatus}
                    onChange={(value) =>
                      update(["home", "hero", "panelStatus"], value)
                    }
                  />
                  <Field
                    label="Hedef Başlığı"
                    value={data.home.hero.goalLabel}
                    onChange={(value) => update(["home", "hero", "goalLabel"], value)}
                  />
                  <Field
                    label="Hedef Değeri"
                    value={data.home.hero.goalValue}
                    onChange={(value) => update(["home", "hero", "goalValue"], value)}
                  />
                  <Field
                    label="Hedef Yüzdesi"
                    type="number"
                    value={data.home.hero.goalProgress}
                    onChange={(value) =>
                      update(["home", "hero", "goalProgress"], Number(value))
                    }
                  />
                </div>
                <TextAreaField
                  label="Başlık"
                  value={data.home.hero.title}
                  onChange={(value) => update(["home", "hero", "title"], value)}
                  rows={3}
                />
                <TextAreaField
                  label="Açıklama"
                  value={data.home.hero.description}
                  onChange={(value) => update(["home", "hero", "description"], value)}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <TextAreaField
                    label="Odak Kanal Kartı"
                    value={data.home.hero.focusValue}
                    onChange={(value) => update(["home", "hero", "focusValue"], value)}
                    rows={2}
                  />
                  <TextAreaField
                    label="Dönüşüm Kartı"
                    value={data.home.hero.conversionValue}
                    onChange={(value) =>
                      update(["home", "hero", "conversionValue"], value)
                    }
                    rows={2}
                  />
                  <Field
                    label="Odak Kanal Başlığı"
                    value={data.home.hero.focusLabel}
                    onChange={(value) => update(["home", "hero", "focusLabel"], value)}
                  />
                  <Field
                    label="Dönüşüm Başlığı"
                    value={data.home.hero.conversionLabel}
                    onChange={(value) =>
                      update(["home", "hero", "conversionLabel"], value)
                    }
                  />
                  <Field
                    label="İlerleme Alt Metni"
                    value={data.home.hero.goalProgressText}
                    onChange={(value) =>
                      update(["home", "hero", "goalProgressText"], value)
                    }
                  />
                </div>
                <StringListEditor
                  label="Aktif Servis Etiketleri"
                  values={data.home.hero.activeServices}
                  onChange={(values) => update(["home", "hero", "activeServices"], values)}
                />
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-white/70">Hero İstatistikleri</h3>
                    <ArrayActions
                      onAdd={() => append(["home", "hero", "metrics"], { value: "", label: "" })}
                      addLabel="İstatistik ekle"
                    />
                  </div>
                  {data.home.hero.metrics.map((item, index) => (
                    <SubCard
                      key={`hero-metric-${index}`}
                      title={`İstatistik ${index + 1}`}
                      onRemove={() => remove(["home", "hero", "metrics"], index)}
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field
                          label="Değer"
                          value={item.value}
                          onChange={(value) =>
                            update(["home", "hero", "metrics", index, "value"], value)
                          }
                        />
                        <Field
                          label="Etiket"
                          value={item.label}
                          onChange={(value) =>
                            update(["home", "hero", "metrics", index, "label"], value)
                          }
                        />
                      </div>
                    </SubCard>
                  ))}
                </div>
              </PanelCard>

              <PanelCard title="Partner ve Sonuç Alanları">
                <Field
                  label="Partner Eyebrow"
                  value={data.home.partners.eyebrow}
                  onChange={(value) => update(["home", "partners", "eyebrow"], value)}
                />
                <StringListEditor
                  label="Partner Listesi"
                  values={data.home.partners.partners}
                  onChange={(values) => update(["home", "partners", "partners"], values)}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Sonuç Eyebrow"
                    value={data.home.results.eyebrow}
                    onChange={(value) => update(["home", "results", "eyebrow"], value)}
                  />
                  <Field
                    label="Sonuç Vurgu"
                    value={data.home.results.titleHighlight}
                    onChange={(value) =>
                      update(["home", "results", "titleHighlight"], value)
                    }
                  />
                </div>
                <TextAreaField
                  label="Sonuç Başlığı"
                  value={data.home.results.title}
                  onChange={(value) => update(["home", "results", "title"], value)}
                  rows={2}
                />
                <TextAreaField
                  label="Sonuç Açıklaması"
                  value={data.home.results.description}
                  onChange={(value) =>
                    update(["home", "results", "description"], value)
                  }
                />
                <StringListEditor
                  label="Grafik Çubukları"
                  values={data.home.results.chartBars.map(String)}
                  onChange={(values) =>
                    update(
                      ["home", "results", "chartBars"],
                      values.map((value) => Number(value || 0)),
                    )
                  }
                  addLabel="Bar ekle"
                />
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-white/70">Sonuç Kartları</h3>
                    <ArrayActions
                      onAdd={() =>
                        append(["home", "results", "stats"], {
                          value: "",
                          unit: "",
                          label: "",
                          sub: "",
                          wide: false,
                        })
                      }
                      addLabel="Kart ekle"
                    />
                  </div>
                  {data.home.results.stats.map((item, index) => (
                    <SubCard
                      key={`result-${index}`}
                      title={`Kart ${index + 1}`}
                      onRemove={() => remove(["home", "results", "stats"], index)}
                    >
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                        <Field
                          label="Değer"
                          value={item.value}
                          onChange={(value) =>
                            update(["home", "results", "stats", index, "value"], value)
                          }
                        />
                        <Field
                          label="Birim"
                          value={item.unit}
                          onChange={(value) =>
                            update(["home", "results", "stats", index, "unit"], value)
                          }
                        />
                        <Field
                          label="Başlık"
                          value={item.label}
                          onChange={(value) =>
                            update(["home", "results", "stats", index, "label"], value)
                          }
                        />
                        <Field
                          label="Alt Başlık"
                          value={item.sub}
                          onChange={(value) =>
                            update(["home", "results", "stats", index, "sub"], value)
                          }
                        />
                        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/70">
                          <input
                            type="checkbox"
                            checked={item.wide}
                            onChange={(event) =>
                              update(
                                ["home", "results", "stats", index, "wide"],
                                event.target.checked,
                              )
                            }
                          />
                          Geniş kart
                        </label>
                      </div>
                    </SubCard>
                  ))}
                </div>
              </PanelCard>

              <PanelCard title="Hizmet Kartları">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Eyebrow"
                    value={data.home.services.eyebrow}
                    onChange={(value) =>
                      update(["home", "services", "eyebrow"], value)
                    }
                  />
                  <Field
                    label="Vurgu"
                    value={data.home.services.titleHighlight}
                    onChange={(value) =>
                      update(["home", "services", "titleHighlight"], value)
                    }
                  />
                </div>
                <TextAreaField
                  label="Başlık"
                  value={data.home.services.title}
                  onChange={(value) => update(["home", "services", "title"], value)}
                  rows={2}
                />
                <TextAreaField
                  label="Açıklama"
                  value={data.home.services.description}
                  onChange={(value) =>
                    update(["home", "services", "description"], value)
                  }
                />
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white/70">Kartlar</h3>
                  <ArrayActions
                    onAdd={() => append(["home", "services", "cards"], createServiceCard())}
                    addLabel="Kart ekle"
                  />
                </div>
                {data.home.services.cards.map((item, index) => (
                  <SubCard
                    key={`service-card-${index}`}
                    title={`Kart ${index + 1}`}
                    onRemove={() => remove(["home", "services", "cards"], index)}
                  >
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <IconSelect
                        label="İkon"
                        value={item.icon}
                        onChange={(value) =>
                          update(["home", "services", "cards", index, "icon"], value)
                        }
                      />
                      <Field
                        label="Tag"
                        value={item.tag}
                        onChange={(value) =>
                          update(["home", "services", "cards", index, "tag"], value)
                        }
                      />
                      <Field
                        label="Numara"
                        value={item.num}
                        onChange={(value) =>
                          update(["home", "services", "cards", index, "num"], value)
                        }
                      />
                      <Field
                        label="Span Sınıfı"
                        value={item.span}
                        onChange={(value) =>
                          update(["home", "services", "cards", index, "span"], value)
                        }
                      />
                      <Field
                        label="Başlık"
                        value={item.title}
                        onChange={(value) =>
                          update(["home", "services", "cards", index, "title"], value)
                        }
                      />
                      <Field
                        label="Link"
                        value={item.href}
                        onChange={(value) =>
                          update(["home", "services", "cards", index, "href"], value)
                        }
                      />
                    </div>
                    <TextAreaField
                      label="Açıklama"
                      value={item.description}
                      onChange={(value) =>
                        update(
                          ["home", "services", "cards", index, "description"],
                          value,
                        )
                      }
                    />
                    <Field
                      label="Alt Metin"
                      value={item.footerText}
                      onChange={(value) =>
                        update(["home", "services", "cards", index, "footerText"], value)
                      }
                    />
                  </SubCard>
                ))}
              </PanelCard>

              <PanelCard title="Süreç, Referans ve CTA">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Süreç Eyebrow"
                    value={data.home.process.eyebrow}
                    onChange={(value) => update(["home", "process", "eyebrow"], value)}
                  />
                  <Field
                    label="Süreç Başlığı"
                    value={data.home.process.title}
                    onChange={(value) => update(["home", "process", "title"], value)}
                  />
                </div>
                <TextAreaField
                  label="Süreç Açıklaması"
                  value={data.home.process.description}
                  onChange={(value) =>
                    update(["home", "process", "description"], value)
                  }
                />
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white/70">Süreç Adımları</h3>
                  <ArrayActions
                    onAdd={() => append(["home", "process", "steps"], createProcessStep())}
                    addLabel="Adım ekle"
                  />
                </div>
                {data.home.process.steps.map((item, index) => (
                  <SubCard
                    key={`process-step-${index}`}
                    title={`Adım ${index + 1}`}
                    onRemove={() => remove(["home", "process", "steps"], index)}
                  >
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Field
                        label="Numara"
                        value={item.num}
                        onChange={(value) =>
                          update(["home", "process", "steps", index, "num"], value)
                        }
                      />
                      <IconSelect
                        label="İkon"
                        value={item.icon}
                        onChange={(value) =>
                          update(["home", "process", "steps", index, "icon"], value)
                        }
                      />
                      <Field
                        label="Başlık"
                        value={item.title}
                        onChange={(value) =>
                          update(["home", "process", "steps", index, "title"], value)
                        }
                      />
                      <Field
                        label="Kısa Detay"
                        value={item.detail}
                        onChange={(value) =>
                          update(["home", "process", "steps", index, "detail"], value)
                        }
                      />
                    </div>
                    <TextAreaField
                      label="Açıklama"
                      value={item.description}
                      onChange={(value) =>
                        update(["home", "process", "steps", index, "description"], value)
                      }
                    />
                  </SubCard>
                ))}

                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Referans Eyebrow"
                    value={data.home.testimonials.eyebrow}
                    onChange={(value) =>
                      update(["home", "testimonials", "eyebrow"], value)
                    }
                  />
                  <Field
                    label="Referans Başlığı"
                    value={data.home.testimonials.title}
                    onChange={(value) => update(["home", "testimonials", "title"], value)}
                  />
                </div>
                <SubCard title="Öne Çıkan Referans">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field
                      label="İsim"
                      value={data.home.testimonials.featured.name}
                      onChange={(value) =>
                        update(["home", "testimonials", "featured", "name"], value)
                      }
                    />
                    <Field
                      label="Rol"
                      value={data.home.testimonials.featured.role}
                      onChange={(value) =>
                        update(["home", "testimonials", "featured", "role"], value)
                      }
                    />
                    <Field
                      label="Şirket"
                      value={data.home.testimonials.featured.company}
                      onChange={(value) =>
                        update(["home", "testimonials", "featured", "company"], value)
                      }
                    />
                    <Field
                      label="Avatar URL"
                      value={data.home.testimonials.featured.avatar}
                      onChange={(value) =>
                        update(["home", "testimonials", "featured", "avatar"], value)
                      }
                    />
                    <Field
                      label="Metrik"
                      value={data.home.testimonials.featured.metric}
                      onChange={(value) =>
                        update(["home", "testimonials", "featured", "metric"], value)
                      }
                    />
                    <Field
                      label="Metrik Alt Metin"
                      value={data.home.testimonials.featured.metricLabel}
                      onChange={(value) =>
                        update(
                          ["home", "testimonials", "featured", "metricLabel"],
                          value,
                        )
                      }
                    />
                  </div>
                  <TextAreaField
                    label="Alıntı"
                    value={data.home.testimonials.featured.quote}
                    onChange={(value) =>
                      update(["home", "testimonials", "featured", "quote"], value)
                    }
                  />
                </SubCard>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white/70">Diğer Referanslar</h3>
                  <ArrayActions
                    onAdd={() =>
                      append(["home", "testimonials", "items"], createTestimonial())
                    }
                    addLabel="Referans ekle"
                  />
                </div>
                {data.home.testimonials.items.map((item, index) => (
                  <SubCard
                    key={`testimonial-${index}`}
                    title={`Referans ${index + 1}`}
                    onRemove={() => remove(["home", "testimonials", "items"], index)}
                  >
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Field
                        label="İsim"
                        value={item.name}
                        onChange={(value) =>
                          update(["home", "testimonials", "items", index, "name"], value)
                        }
                      />
                      <Field
                        label="Rol"
                        value={item.role}
                        onChange={(value) =>
                          update(["home", "testimonials", "items", index, "role"], value)
                        }
                      />
                      <Field
                        label="Şirket"
                        value={item.company}
                        onChange={(value) =>
                          update(
                            ["home", "testimonials", "items", index, "company"],
                            value,
                          )
                        }
                      />
                      <Field
                        label="Avatar URL"
                        value={item.avatar}
                        onChange={(value) =>
                          update(["home", "testimonials", "items", index, "avatar"], value)
                        }
                      />
                    </div>
                    <TextAreaField
                      label="Alıntı"
                      value={item.quote}
                      onChange={(value) =>
                        update(["home", "testimonials", "items", index, "quote"], value)
                      }
                    />
                  </SubCard>
                ))}

                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="CTA Eyebrow"
                    value={data.home.cta.eyebrow}
                    onChange={(value) => update(["home", "cta", "eyebrow"], value)}
                  />
                  <Field
                    label="CTA Vurgu"
                    value={data.home.cta.titleHighlight}
                    onChange={(value) =>
                      update(["home", "cta", "titleHighlight"], value)
                    }
                  />
                  <Field
                    label="CTA Buton Metni"
                    value={data.home.cta.primaryCta.label}
                    onChange={(value) =>
                      update(["home", "cta", "primaryCta", "label"], value)
                    }
                  />
                  <Field
                    label="CTA Buton Linki"
                    value={data.home.cta.primaryCta.href}
                    onChange={(value) =>
                      update(["home", "cta", "primaryCta", "href"], value)
                    }
                  />
                  <Field
                    label="İkincil Buton Metni"
                    value={data.home.cta.secondaryCta.label}
                    onChange={(value) =>
                      update(["home", "cta", "secondaryCta", "label"], value)
                    }
                  />
                  <Field
                    label="İkincil Buton Linki"
                    value={data.home.cta.secondaryCta.href}
                    onChange={(value) =>
                      update(["home", "cta", "secondaryCta", "href"], value)
                    }
                  />
                </div>
                <TextAreaField
                  label="CTA Başlığı"
                  value={data.home.cta.title}
                  onChange={(value) => update(["home", "cta", "title"], value)}
                  rows={2}
                />
                <TextAreaField
                  label="CTA Açıklaması"
                  value={data.home.cta.description}
                  onChange={(value) => update(["home", "cta", "description"], value)}
                />
                <StringListEditor
                  label="Güven Çipleri"
                  values={data.home.cta.trustChips}
                  onChange={(values) => update(["home", "cta", "trustChips"], values)}
                />
              </PanelCard>
            </div>
          ) : null}

          {activeTab === "about" ? (
            <div className="space-y-6">
              <PanelCard title="Hakkımızda Sayfası">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Hero Eyebrow"
                    value={data.about.hero.eyebrow}
                    onChange={(value) => update(["about", "hero", "eyebrow"], value)}
                  />
                  <Field
                    label="Hero Vurgu"
                    value={data.about.hero.titleHighlight}
                    onChange={(value) =>
                      update(["about", "hero", "titleHighlight"], value)
                    }
                  />
                </div>
                <TextAreaField
                  label="Hero Başlığı"
                  value={data.about.hero.title}
                  onChange={(value) => update(["about", "hero", "title"], value)}
                  rows={2}
                />
                <TextAreaField
                  label="Hero Açıklaması"
                  value={data.about.hero.description}
                  onChange={(value) => update(["about", "hero", "description"], value)}
                />
                <StringListEditor
                  label="İstatistik Değerleri"
                  values={data.about.stats.map((item) => `${item.value} | ${item.label}`)}
                  onChange={(values) =>
                    update(
                      ["about", "stats"],
                      values.map((item) => {
                        const [value, label] = item.split("|").map((part) => part.trim());
                        return { value: value ?? "", label: label ?? "" };
                      }),
                    )
                  }
                  addLabel="İstatistik ekle"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <IconSelect
                    label="Misyon İkonu"
                    value={data.about.mission.icon}
                    onChange={(value) => update(["about", "mission", "icon"], value)}
                  />
                  <Field
                    label="Misyon Başlığı"
                    value={data.about.mission.title}
                    onChange={(value) => update(["about", "mission", "title"], value)}
                  />
                  <IconSelect
                    label="Vizyon İkonu"
                    value={data.about.vision.icon}
                    onChange={(value) => update(["about", "vision", "icon"], value)}
                  />
                  <Field
                    label="Vizyon Başlığı"
                    value={data.about.vision.title}
                    onChange={(value) => update(["about", "vision", "title"], value)}
                  />
                </div>
                <TextAreaField
                  label="Misyon Metni"
                  value={data.about.mission.body}
                  onChange={(value) => update(["about", "mission", "body"], value)}
                />
                <TextAreaField
                  label="Vizyon Metni"
                  value={data.about.vision.body}
                  onChange={(value) => update(["about", "vision", "body"], value)}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Değerler Eyebrow"
                    value={data.about.values.eyebrow}
                    onChange={(value) => update(["about", "values", "eyebrow"], value)}
                  />
                  <Field
                    label="Değerler Vurgu"
                    value={data.about.values.titleHighlight}
                    onChange={(value) =>
                      update(["about", "values", "titleHighlight"], value)
                    }
                  />
                  <Field
                    label="Ekip Eyebrow"
                    value={data.about.team.eyebrow}
                    onChange={(value) => update(["about", "team", "eyebrow"], value)}
                  />
                  <Field
                    label="Ekip Vurgu"
                    value={data.about.team.titleHighlight}
                    onChange={(value) =>
                      update(["about", "team", "titleHighlight"], value)
                    }
                  />
                </div>
                <TextAreaField
                  label="Değerler Başlığı"
                  value={data.about.values.title}
                  onChange={(value) => update(["about", "values", "title"], value)}
                  rows={2}
                />
                <TextAreaField
                  label="Ekip Başlığı"
                  value={data.about.team.title}
                  onChange={(value) => update(["about", "team", "title"], value)}
                  rows={2}
                />
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white/70">Değer Kartları</h3>
                  <ArrayActions
                    onAdd={() => append(["about", "values", "items"], createAboutValue())}
                    addLabel="Değer ekle"
                  />
                </div>
                {data.about.values.items.map((item, index) => (
                  <SubCard
                    key={`about-value-${index}`}
                    title={`Değer ${index + 1}`}
                    onRemove={() => remove(["about", "values", "items"], index)}
                  >
                    <div className="grid gap-4 md:grid-cols-3">
                      <IconSelect
                        label="İkon"
                        value={item.icon}
                        onChange={(value) =>
                          update(["about", "values", "items", index, "icon"], value)
                        }
                      />
                      <Field
                        label="Başlık"
                        value={item.title}
                        onChange={(value) =>
                          update(["about", "values", "items", index, "title"], value)
                        }
                      />
                      <TextAreaField
                        label="Açıklama"
                        value={item.description}
                        onChange={(value) =>
                          update(
                            ["about", "values", "items", index, "description"],
                            value,
                          )
                        }
                        rows={3}
                      />
                    </div>
                  </SubCard>
                ))}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white/70">Ekip Üyeleri</h3>
                  <ArrayActions
                    onAdd={() => append(["about", "team", "items"], createTeamMember())}
                    addLabel="Üye ekle"
                  />
                </div>
                {data.about.team.items.map((item, index) => (
                  <SubCard
                    key={`team-member-${index}`}
                    title={`Üye ${index + 1}`}
                    onRemove={() => remove(["about", "team", "items"], index)}
                  >
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Field
                        label="İsim"
                        value={item.name}
                        onChange={(value) =>
                          update(["about", "team", "items", index, "name"], value)
                        }
                      />
                      <Field
                        label="Rol"
                        value={item.role}
                        onChange={(value) =>
                          update(["about", "team", "items", index, "role"], value)
                        }
                      />
                      <Field
                        label="Avatar URL"
                        value={item.avatar}
                        onChange={(value) =>
                          update(["about", "team", "items", index, "avatar"], value)
                        }
                      />
                    </div>
                    <TextAreaField
                      label="Açıklama"
                      value={item.description}
                      onChange={(value) =>
                        update(["about", "team", "items", index, "description"], value)
                      }
                    />
                  </SubCard>
                ))}
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="CTA Başlığı"
                    value={data.about.cta.title}
                    onChange={(value) => update(["about", "cta", "title"], value)}
                  />
                  <Field
                    label="CTA Buton Metni"
                    value={data.about.cta.button.label}
                    onChange={(value) =>
                      update(["about", "cta", "button", "label"], value)
                    }
                  />
                  <Field
                    label="CTA Buton Linki"
                    value={data.about.cta.button.href}
                    onChange={(value) =>
                      update(["about", "cta", "button", "href"], value)
                    }
                  />
                </div>
                <TextAreaField
                  label="CTA Açıklaması"
                  value={data.about.cta.description}
                  onChange={(value) => update(["about", "cta", "description"], value)}
                />
              </PanelCard>
            </div>
          ) : null}

          {activeTab === "contact" ? (
            <div className="space-y-6">
              <PanelCard title="İletişim Sayfası">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Eyebrow"
                    value={data.contact.hero.eyebrow}
                    onChange={(value) => update(["contact", "hero", "eyebrow"], value)}
                  />
                  <Field
                    label="Vurgu"
                    value={data.contact.hero.titleHighlight}
                    onChange={(value) =>
                      update(["contact", "hero", "titleHighlight"], value)
                    }
                  />
                  <Field
                    label="Sol Başlık"
                    value={data.contact.infoTitle}
                    onChange={(value) => update(["contact", "infoTitle"], value)}
                  />
                  <Field
                    label="Form Başlığı"
                    value={data.contact.form.title}
                    onChange={(value) => update(["contact", "form", "title"], value)}
                  />
                </div>
                <TextAreaField
                  label="Hero Başlığı"
                  value={data.contact.hero.title}
                  onChange={(value) => update(["contact", "hero", "title"], value)}
                  rows={2}
                />
                <TextAreaField
                  label="Hero Açıklaması"
                  value={data.contact.hero.description}
                  onChange={(value) => update(["contact", "hero", "description"], value)}
                />
                <TextAreaField
                  label="Sol Açıklama"
                  value={data.contact.infoDescription}
                  onChange={(value) => update(["contact", "infoDescription"], value)}
                />
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-white/70">İletişim Öğeleri</h3>
                    <ArrayActions
                      onAdd={() => append(["contact", "contactItems"], createContactItem())}
                      addLabel="İletişim öğesi ekle"
                    />
                  </div>
                  {data.contact.contactItems.map((item, index) => (
                    <SubCard
                      key={`contact-item-${index}`}
                      title={`Öğe ${index + 1}`}
                      onRemove={() => remove(["contact", "contactItems"], index)}
                    >
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <Field
                          label="Başlık"
                          value={item.label}
                          onChange={(value) =>
                            update(["contact", "contactItems", index, "label"], value)
                          }
                        />
                        <Field
                          label="Değer"
                          value={item.value}
                          onChange={(value) =>
                            update(["contact", "contactItems", index, "value"], value)
                          }
                        />
                        <Field
                          label="Link"
                          value={item.href}
                          onChange={(value) =>
                            update(["contact", "contactItems", index, "href"], value)
                          }
                        />
                        <IconSelect
                          label="İkon"
                          value={item.icon}
                          onChange={(value) =>
                            update(["contact", "contactItems", index, "icon"], value)
                          }
                        />
                      </div>
                    </SubCard>
                  ))}
                </div>
                <Field
                  label="Taahhüt Başlığı"
                  value={data.contact.trustNote.eyebrow}
                  onChange={(value) =>
                    update(["contact", "trustNote", "eyebrow"], value)
                  }
                />
                <TextAreaField
                  label="Taahhüt Metni"
                  value={data.contact.trustNote.body}
                  onChange={(value) => update(["contact", "trustNote", "body"], value)}
                />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <Field
                    label="Başarı Başlığı"
                    value={data.contact.form.successTitle}
                    onChange={(value) =>
                      update(["contact", "form", "successTitle"], value)
                    }
                  />
                  <Field
                    label="Gönder Butonu"
                    value={data.contact.form.submitLabel}
                    onChange={(value) =>
                      update(["contact", "form", "submitLabel"], value)
                    }
                  />
                  <Field
                    label="Loading Metni"
                    value={data.contact.form.loadingLabel}
                    onChange={(value) =>
                      update(["contact", "form", "loadingLabel"], value)
                    }
                  />
                </div>
                <TextAreaField
                  label="Başarı Açıklaması"
                  value={data.contact.form.successDescription}
                  onChange={(value) =>
                    update(["contact", "form", "successDescription"], value)
                  }
                />
                <StringListEditor
                  label="Hizmet Seçenekleri"
                  values={data.contact.form.serviceOptions}
                  onChange={(values) =>
                    update(["contact", "form", "serviceOptions"], values)
                  }
                />
              </PanelCard>
            </div>
          ) : null}

          {activeTab === "services" ? (
            <div className="space-y-6">
              <PanelCard title="Hizmetler İndeks Sayfası">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Eyebrow"
                    value={data.servicesIndex.hero.eyebrow}
                    onChange={(value) =>
                      update(["servicesIndex", "hero", "eyebrow"], value)
                    }
                  />
                  <Field
                    label="Vurgu"
                    value={data.servicesIndex.hero.titleHighlight}
                    onChange={(value) =>
                      update(["servicesIndex", "hero", "titleHighlight"], value)
                    }
                  />
                </div>
                <TextAreaField
                  label="Başlık"
                  value={data.servicesIndex.hero.title}
                  onChange={(value) =>
                    update(["servicesIndex", "hero", "title"], value)
                  }
                  rows={2}
                />
                <TextAreaField
                  label="Açıklama"
                  value={data.servicesIndex.hero.description}
                  onChange={(value) =>
                    update(["servicesIndex", "hero", "description"], value)
                  }
                />
                <StringListEditor
                  label="Keyword Cluster"
                  values={data.servicesIndex.hero.keywordCluster}
                  onChange={(values) =>
                    update(["servicesIndex", "hero", "keywordCluster"], values)
                  }
                />
              </PanelCard>

              <PanelCard title="Landing Page Editörü">
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedService?.slug ?? ""}
                    onChange={(event) =>
                      setSelectedServiceIndex(
                        data.serviceLandingPages.findIndex(
                          (item) => item.slug === event.target.value,
                        ),
                      )
                    }
                    className="min-w-[260px] rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40 focus:bg-white/5"
                  >
                    {data.serviceLandingPages.map((item) => (
                      <option key={item.slug} value={item.slug} className="bg-black">
                        {item.title || item.slug}
                      </option>
                    ))}
                  </select>
                  <ArrayActions
                    onAdd={() => {
                      const next = createServiceLandingPage();
                      setData((current) => ({
                        ...current,
                        serviceLandingPages: [...current.serviceLandingPages, next],
                      }));
                      setSelectedServiceIndex(data.serviceLandingPages.length);
                    }}
                    addLabel="Yeni hizmet sayfası"
                  />
                  {selectedService ? (
                    <RemoveButton
                      onClick={() => {
                        const nextIndex = Math.max(0, selectedServiceIndex - 1);
                        setData((current) => ({
                          ...current,
                          serviceLandingPages: current.serviceLandingPages.filter(
                            (_, index) => index !== selectedServiceIndex,
                          ),
                        }));
                        setSelectedServiceIndex(nextIndex);
                      }}
                    />
                  ) : null}
                </div>

                {selectedService ? (
                  <div className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Field
                        label="Slug"
                        value={selectedService.slug}
                        onChange={(value) =>
                          update(
                            ["serviceLandingPages", selectedServiceIndex, "slug"],
                            value,
                          )
                        }
                      />
                      <Field
                        label="Nav Label"
                        value={selectedService.navLabel}
                        onChange={(value) =>
                          update(
                            ["serviceLandingPages", selectedServiceIndex, "navLabel"],
                            value,
                          )
                        }
                      />
                      <Field
                        label="Eyebrow"
                        value={selectedService.eyebrow}
                        onChange={(value) =>
                          update(
                            ["serviceLandingPages", selectedServiceIndex, "eyebrow"],
                            value,
                          )
                        }
                      />
                      <Field
                        label="Başlık"
                        value={selectedService.title}
                        onChange={(value) =>
                          update(
                            ["serviceLandingPages", selectedServiceIndex, "title"],
                            value,
                          )
                        }
                      />
                      <Field
                        label="Meta Title"
                        value={selectedService.metaTitle}
                        onChange={(value) =>
                          update(
                            ["serviceLandingPages", selectedServiceIndex, "metaTitle"],
                            value,
                          )
                        }
                      />
                      <Field
                        label="Primary Keyword"
                        value={selectedService.primaryKeyword}
                        onChange={(value) =>
                          update(
                            ["serviceLandingPages", selectedServiceIndex, "primaryKeyword"],
                            value,
                          )
                        }
                      />
                    </div>
                    <TextAreaField
                      label="Meta Description"
                      value={selectedService.metaDescription}
                      onChange={(value) =>
                        update(
                          ["serviceLandingPages", selectedServiceIndex, "metaDescription"],
                          value,
                        )
                      }
                    />
                    <TextAreaField
                      label="Hero Başlığı"
                      value={selectedService.heroTitle}
                      onChange={(value) =>
                        update(
                          ["serviceLandingPages", selectedServiceIndex, "heroTitle"],
                          value,
                        )
                      }
                    />
                    <TextAreaField
                      label="Hero Açıklaması"
                      value={selectedService.heroDescription}
                      onChange={(value) =>
                        update(
                          ["serviceLandingPages", selectedServiceIndex, "heroDescription"],
                          value,
                        )
                      }
                    />
                    <StringListEditor
                      label="Secondary Keywords"
                      values={selectedService.secondaryKeywords}
                      onChange={(values) =>
                        update(
                          ["serviceLandingPages", selectedServiceIndex, "secondaryKeywords"],
                          values,
                        )
                      }
                    />
                    <StringListEditor
                      label="Local Focus"
                      values={selectedService.localFocus}
                      onChange={(values) =>
                        update(
                          ["serviceLandingPages", selectedServiceIndex, "localFocus"],
                          values,
                        )
                      }
                    />
                    <StringListEditor
                      label="Benefits"
                      values={selectedService.benefits}
                      onChange={(values) =>
                        update(
                          ["serviceLandingPages", selectedServiceIndex, "benefits"],
                          values,
                        )
                      }
                    />
                    <StringListEditor
                      label="Deliverables"
                      values={selectedService.deliverables}
                      onChange={(values) =>
                        update(
                          ["serviceLandingPages", selectedServiceIndex, "deliverables"],
                          values,
                        )
                      }
                    />
                    <StringListEditor
                      label="İlgili Blog Slug'ları"
                      values={selectedService.relatedPosts}
                      onChange={(values) =>
                        update(
                          ["serviceLandingPages", selectedServiceIndex, "relatedPosts"],
                          values,
                        )
                      }
                      addLabel="Blog slug ekle"
                    />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-sm font-semibold text-white/70">Süreç Adımları</h3>
                        <ArrayActions
                          onAdd={() =>
                            append(
                              ["serviceLandingPages", selectedServiceIndex, "process"],
                              { title: "", description: "" },
                            )
                          }
                          addLabel="Adım ekle"
                        />
                      </div>
                      {selectedService.process.map((item, index) => (
                        <SubCard
                          key={`service-process-${index}`}
                          title={`Adım ${index + 1}`}
                          onRemove={() =>
                            remove(
                              ["serviceLandingPages", selectedServiceIndex, "process"],
                              index,
                            )
                          }
                        >
                          <div className="grid gap-4 md:grid-cols-2">
                            <Field
                              label="Başlık"
                              value={item.title}
                              onChange={(value) =>
                                update(
                                  [
                                    "serviceLandingPages",
                                    selectedServiceIndex,
                                    "process",
                                    index,
                                    "title",
                                  ],
                                  value,
                                )
                              }
                            />
                          </div>
                          <TextAreaField
                            label="Açıklama"
                            value={item.description}
                            onChange={(value) =>
                              update(
                                [
                                  "serviceLandingPages",
                                  selectedServiceIndex,
                                  "process",
                                  index,
                                  "description",
                                ],
                                value,
                              )
                            }
                          />
                        </SubCard>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-sm font-semibold text-white/70">SSS</h3>
                        <ArrayActions
                          onAdd={() =>
                            append(["serviceLandingPages", selectedServiceIndex, "faq"], {
                              question: "",
                              answer: "",
                            })
                          }
                          addLabel="SSS ekle"
                        />
                      </div>
                      {selectedService.faq.map((item, index) => (
                        <SubCard
                          key={`service-faq-${index}`}
                          title={`Soru ${index + 1}`}
                          onRemove={() =>
                            remove(
                              ["serviceLandingPages", selectedServiceIndex, "faq"],
                              index,
                            )
                          }
                        >
                          <Field
                            label="Soru"
                            value={item.question}
                            onChange={(value) =>
                              update(
                                [
                                  "serviceLandingPages",
                                  selectedServiceIndex,
                                  "faq",
                                  index,
                                  "question",
                                ],
                                value,
                              )
                            }
                          />
                          <TextAreaField
                            label="Cevap"
                            value={item.answer}
                            onChange={(value) =>
                              update(
                                [
                                  "serviceLandingPages",
                                  selectedServiceIndex,
                                  "faq",
                                  index,
                                  "answer",
                                ],
                                value,
                              )
                            }
                          />
                        </SubCard>
                      ))}
                    </div>
                  </div>
                ) : null}
              </PanelCard>
            </div>
          ) : null}

          {activeTab === "blog" ? (
            <div className="space-y-6">
              <PanelCard title="Blog Liste Sayfası">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Eyebrow"
                    value={data.blogIndex.hero.eyebrow}
                    onChange={(value) => update(["blogIndex", "hero", "eyebrow"], value)}
                  />
                  <Field
                    label="Vurgu"
                    value={data.blogIndex.hero.titleHighlight}
                    onChange={(value) =>
                      update(["blogIndex", "hero", "titleHighlight"], value)
                    }
                  />
                  <Field
                    label="Öne Çıkan Rozeti"
                    value={data.blogIndex.featuredLabel}
                    onChange={(value) => update(["blogIndex", "featuredLabel"], value)}
                  />
                </div>
                <TextAreaField
                  label="Başlık"
                  value={data.blogIndex.hero.title}
                  onChange={(value) => update(["blogIndex", "hero", "title"], value)}
                  rows={2}
                />
                <TextAreaField
                  label="Açıklama"
                  value={data.blogIndex.hero.description}
                  onChange={(value) =>
                    update(["blogIndex", "hero", "description"], value)
                  }
                />
                <StringListEditor
                  label="Topic Cluster"
                  values={data.blogIndex.hero.topicClusters}
                  onChange={(values) =>
                    update(["blogIndex", "hero", "topicClusters"], values)
                  }
                />
              </PanelCard>

              <PanelCard title="Blog Yazı Editörü">
                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedPost?.slug ?? ""}
                    onChange={(event) =>
                      setSelectedPostIndex(
                        data.blogPosts.findIndex(
                          (item) => item.slug === event.target.value,
                        ),
                      )
                    }
                    className="min-w-[260px] rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-primary/40 focus:bg-white/5"
                  >
                    {data.blogPosts.map((item) => (
                      <option key={item.slug} value={item.slug} className="bg-black">
                        {item.title || item.slug}
                      </option>
                    ))}
                  </select>
                  <ArrayActions
                    onAdd={() => {
                      const next = createBlogPost();
                      setData((current) => ({
                        ...current,
                        blogPosts: [...current.blogPosts, next],
                      }));
                      setSelectedPostIndex(data.blogPosts.length);
                    }}
                    addLabel="Yeni yazı"
                  />
                  {selectedPost ? (
                    <RemoveButton
                      onClick={() => {
                        const nextIndex = Math.max(0, selectedPostIndex - 1);
                        setData((current) => ({
                          ...current,
                          blogPosts: current.blogPosts.filter(
                            (_, index) => index !== selectedPostIndex,
                          ),
                        }));
                        setSelectedPostIndex(nextIndex);
                      }}
                    />
                  ) : null}
                </div>

                {selectedPost ? (
                  <div className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Field
                        label="Slug"
                        value={selectedPost.slug}
                        onChange={(value) =>
                          update(["blogPosts", selectedPostIndex, "slug"], value)
                        }
                      />
                      <Field
                        label="Başlık"
                        value={selectedPost.title}
                        onChange={(value) =>
                          update(["blogPosts", selectedPostIndex, "title"], value)
                        }
                      />
                      <Field
                        label="Kategori"
                        value={selectedPost.category}
                        onChange={(value) =>
                          update(["blogPosts", selectedPostIndex, "category"], value)
                        }
                      />
                      <Field
                        label="Okuma Süresi"
                        value={selectedPost.readTime}
                        onChange={(value) =>
                          update(["blogPosts", selectedPostIndex, "readTime"], value)
                        }
                      />
                      <Field
                        label="Görsel URL"
                        value={selectedPost.coverImage}
                        onChange={(value) =>
                          update(["blogPosts", selectedPostIndex, "coverImage"], value)
                        }
                      />
                      <Field
                        label="Yazar"
                        value={selectedPost.authorName}
                        onChange={(value) =>
                          update(["blogPosts", selectedPostIndex, "authorName"], value)
                        }
                      />
                      <Field
                        label="Yayın Tarihi"
                        value={selectedPost.publishedAt}
                        onChange={(value) =>
                          update(["blogPosts", selectedPostIndex, "publishedAt"], value)
                        }
                      />
                      <Field
                        label="Güncelleme Tarihi"
                        value={selectedPost.updatedAt}
                        onChange={(value) =>
                          update(["blogPosts", selectedPostIndex, "updatedAt"], value)
                        }
                      />
                      <Field
                        label="Görünen Tarih"
                        value={selectedPost.date}
                        onChange={(value) =>
                          update(["blogPosts", selectedPostIndex, "date"], value)
                        }
                      />
                      <Field
                        label="İlgili Hizmet Slug"
                        value={selectedPost.relatedServiceSlug}
                        onChange={(value) =>
                          update(
                            ["blogPosts", selectedPostIndex, "relatedServiceSlug"],
                            value,
                          )
                        }
                      />
                      <Field
                        label="Meta Title"
                        value={selectedPost.metaTitle}
                        onChange={(value) =>
                          update(["blogPosts", selectedPostIndex, "metaTitle"], value)
                        }
                      />
                      <Field
                        label="Primary Keyword"
                        value={selectedPost.primaryKeyword}
                        onChange={(value) =>
                          update(
                            ["blogPosts", selectedPostIndex, "primaryKeyword"],
                            value,
                          )
                        }
                      />
                    </div>
                    <TextAreaField
                      label="Meta Description"
                      value={selectedPost.metaDescription}
                      onChange={(value) =>
                        update(
                          ["blogPosts", selectedPostIndex, "metaDescription"],
                          value,
                        )
                      }
                    />
                    <TextAreaField
                      label="Özet"
                      value={selectedPost.excerpt}
                      onChange={(value) =>
                        update(["blogPosts", selectedPostIndex, "excerpt"], value)
                      }
                    />
                    <TextAreaField
                      label="Giriş"
                      value={selectedPost.intro}
                      onChange={(value) =>
                        update(["blogPosts", selectedPostIndex, "intro"], value)
                      }
                    />
                    <StringListEditor
                      label="Secondary Keywords"
                      values={selectedPost.secondaryKeywords}
                      onChange={(values) =>
                        update(
                          ["blogPosts", selectedPostIndex, "secondaryKeywords"],
                          values,
                        )
                      }
                    />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-sm font-semibold text-white/70">İçerik Bölümleri</h3>
                        <ArrayActions
                          onAdd={() =>
                            append(["blogPosts", selectedPostIndex, "sections"], {
                              heading: "",
                              body: "",
                            })
                          }
                          addLabel="Bölüm ekle"
                        />
                      </div>
                      {selectedPost.sections.map((section, index) => (
                        <SubCard
                          key={`blog-section-${index}`}
                          title={`Bölüm ${index + 1}`}
                          onRemove={() =>
                            remove(["blogPosts", selectedPostIndex, "sections"], index)
                          }
                        >
                          <Field
                            label="Başlık"
                            value={section.heading}
                            onChange={(value) =>
                              update(
                                ["blogPosts", selectedPostIndex, "sections", index, "heading"],
                                value,
                              )
                            }
                          />
                          <TextAreaField
                            label="Metin"
                            value={section.body}
                            onChange={(value) =>
                              update(
                                ["blogPosts", selectedPostIndex, "sections", index, "body"],
                                value,
                              )
                            }
                            rows={6}
                          />
                        </SubCard>
                      ))}
                    </div>
                  </div>
                ) : null}
              </PanelCard>
            </div>
          ) : null}

          {activeTab === "media" ? (
            <div className="space-y-6">
              <PanelCard
                title="Görsel Yükleme"
                description="Bir görsel yüklediğinizde URL otomatik kopyalanır. Bu URL'yi blog görseli, avatar veya herhangi bir içerik alanında kullanabilirsiniz."
              >
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed border-primary/30 bg-primary/6 px-6 py-16 text-center transition hover:border-primary/50 hover:bg-primary/10">
                  <ImagePlus size={30} className="text-primary" />
                  <span className="mt-4 text-base font-semibold">
                    {uploading ? "Yükleniyor..." : "Görsel seç ve yükle"}
                  </span>
                  <span className="mt-2 text-sm text-white/45">
                    JPG, PNG, WebP, SVG, AVIF veya GIF. Maksimum 8MB.
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        void handleUpload(file);
                      }
                    }}
                  />
                </label>

                <div className="space-y-4">
                  {uploadedImages.map((url) => (
                    <SubCard key={url} title={url}>
                      <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <img
                          src={url}
                          alt={url}
                          className="h-28 w-40 rounded-2xl border border-white/10 object-cover"
                        />
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              if (navigator.clipboard?.writeText) {
                                void navigator.clipboard.writeText(url);
                              }
                              setSaveMessage("Görsel URL'si kopyalandı.");
                            }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-primary/30 hover:text-primary"
                          >
                            <Copy size={14} />
                            URL Kopyala
                          </button>
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-primary/30 hover:text-primary"
                          >
                            <ExternalLink size={14} />
                            Aç
                          </a>
                        </div>
                      </div>
                    </SubCard>
                  ))}
                </div>
              </PanelCard>
            </div>
          ) : null}

          {activeTab === "json" ? (
            <div className="space-y-6">
              <PanelCard
                title="Ham JSON Editörü"
                description="İleri düzey tüm alanları doğrudan JSON olarak düzenlemek için kullanın. Önce 'Mevcut veriyi yenile' ile çalışma verisini alabilir, sonra 'JSON'u uygula' ile panel state'ine işleyebilirsiniz."
              >
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setJsonDraft(JSON.stringify(data, null, 2))}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-primary/30 hover:text-primary"
                  >
                    <Copy size={14} />
                    Mevcut veriyi yenile
                  </button>
                  <button
                    type="button"
                    onClick={applyJsonDraft}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/50 hover:bg-primary/15"
                  >
                    <Code2 size={14} />
                    JSON&apos;u uygula
                  </button>
                </div>

                <textarea
                  value={jsonDraft}
                  onChange={(event) => setJsonDraft(event.target.value)}
                  rows={32}
                  className="w-full rounded-[1.5rem] border border-white/10 bg-black/40 p-4 font-mono text-xs text-white outline-none transition focus:border-primary/40"
                />
              </PanelCard>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
