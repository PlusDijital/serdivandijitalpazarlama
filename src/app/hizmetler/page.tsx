import { Code2, LineChart, Megaphone, CheckCircle2, Navigation } from "lucide-react";

export const metadata = {
  title: 'Hizmetlerimiz',
  description: 'Sakarya SEO, web tasarım, sosyal medya yönetimi ve 2026 trendleriyle performans odaklı e-ticaret danışmanlığı.',
};

export default function HizmetlerPage() {
  const services = [
    {
      id: "seo",
      icon: LineChart,
      title: "2026 SEO Optimizasyonu",
      desc: "Google algoritmalarına uygun, yerel (Sakarya, Serdivan vs.) ve ulusal aramalarda sizi üst sıraya taşıyacak güncel stratejiler.",
      features: ["Anahtar Kelime Analizi", "Teknik SEO ve Hız Optimizasyonu", "Backlink ve İçerik Stratejisi"],
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400"
    },
    {
      id: "web-tasarim",
      icon: Code2,
      title: "Modern Web Tasarım",
      desc: "Next.js tabanlı, mobil uyumlu, hızlı yüklenen ve ziyaretçileri müşteriye dönüştüren premium web siteleri kuruyoruz.",
      features: ["Özel UI/UX Tasarım", "Hızlı Yükleme (Lighthouse %99+)", "Mobil Uyumlu (Responsive) Mimari"],
      color: "from-indigo-500/20 to-blue-500/20",
      iconColor: "text-indigo-400"
    },
    {
      id: "sosyal-medya",
      icon: Megaphone,
      title: "Veri Odaklı Sosyal Medya",
      desc: "Instagram ve Facebook için özel görsel tasarımı, reels kurgusu, etkileşim arttıran metinler ve sonuç odaklı reklam yönetimi.",
      features: ["Aylık İçerik Takvimi", "Topluluk ve Etkileşim Yönetimi", "Performans ve ROI Raporlaması"],
      color: "from-fuchsia-500/20 to-pink-500/20",
      iconColor: "text-fuchsia-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-white pt-32 pb-16 px-6 relative">
       {/* Background */}
       <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Size Nasıl Yardımcı Olabiliriz?</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">Hedef kitlenize ulaşmak ve işinizi büyütmek için ihtiyaç duyduğunuz tüm dijital pazarlama çözümleri.</p>
        </div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className={`grid md:grid-cols-2 gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
               <div className={`order-2 ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br border border-white/10 flex items-center justify-center mb-6" style={{ backgroundImage: `var(--${service.color})` }}>
                   <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                 <p className="text-gray-400 text-lg leading-relaxed mb-8">{service.desc}</p>
                 
                 <ul className="space-y-4">
                   {service.features.map((feature, i) => (
                     <li key={i} className="flex items-center gap-3 text-gray-300">
                       <CheckCircle2 className={`w-6 h-6 ${service.iconColor}`} />
                       {feature}
                     </li>
                   ))}
                 </ul>
                 
                 <div className="mt-10">
                   <a href="/iletisim" className="inline-flex items-center gap-2 text-white font-medium hover:text-indigo-400 transition-colors group">
                     Bu Hizmet İçin Teklif Al
                     <Navigation className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </a>
                 </div>
              </div>
              
              <div className={`order-1 ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'} aspect-square md:aspect-[4/5] rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden`}>
                 <div className={`absolute inset-0 bg-gradient-to-tr ${service.color} opacity-40 mix-blend-overlay`} />
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                 {/* Decorative elements representing the service */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center">
                    <service.icon className={`w-12 h-12 text-white/50`} />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
