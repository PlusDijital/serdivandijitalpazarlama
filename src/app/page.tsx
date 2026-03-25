"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, LineChart, Megaphone, Smartphone, CheckCircle2, PlayCircle, Mail, MapPin, Instagram, Facebook, Phone, ChevronRight } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white overflow-hidden relative selection:bg-indigo-500/30">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-fuchsia-600/40 blur-[120px] rounded-[100%]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#060608]/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 flex items-center justify-center p-[2px]">
              <div className="w-full h-full bg-[#060608] rounded-[10px] flex items-center justify-center">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-500">S</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">Serdivan Dijital</span>
          </motion.div>
          
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400"
          >
            <Link href="#hizmetler" className="hover:text-white transition-colors">Hizmetlerimiz</Link>
            <Link href="#neden-biz" className="hover:text-white transition-colors">Neden Biz?</Link>
            <Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link>
          </motion.nav>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link href="/iletisim" className="group relative rounded-full p-[1px] overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 opacity-70 group-hover:opacity-100 transition-opacity bg-[length:200%_auto] animate-gradient" />
              <div className="relative bg-[#060608] rounded-full px-6 py-2.5 transition-all group-hover:bg-opacity-0">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Bize Ulaşın
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </header>

      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              Sakarya'nın Yenilikçi Performans Ajansı
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-[80px] font-extrabold tracking-tight leading-[1.05]">
              Markanızı <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-500">
                Geleceğe Taşıyın
              </span> 
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Serdivan Dijital Pazarlama olarak, 2026 SEO trendlerine uygun web tasarımı ve veriye dayalı sosyal medya yönetimi ile Sakarya'daki işletmenizi dijitalde büyütüyoruz.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/iletisim" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group">
                Ücretsiz Danışmanlık Al
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#hizmetler" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                Hizmetlerimizi İncele
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image Mockup Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-28 relative mx-auto max-w-5xl perspective-[2000px]"
          >
            <div className="rounded-2xl border border-white/10 bg-[#121214]/60 backdrop-blur-3xl p-3 shadow-[0_0_80px_rgba(79,70,229,0.15)] transform rotate-x-12 rotate-y-[-5deg] hover:rotate-x-0 hover:rotate-y-0 transition-all duration-700 ease-out">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
              <div className="aspect-[16/9] rounded-xl bg-[#060608] border border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mixed-blend-overlay" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full" />
                <div className="relative z-10 text-center space-y-6 max-w-lg px-8">
                   <div className="flex justify-center gap-6">
                     <Code2 className="w-12 h-12 text-indigo-400" />
                     <LineChart className="w-12 h-12 text-fuchsia-400" />
                     <Megaphone className="w-12 h-12 text-blue-400" />
                   </div>
                   <h3 className="text-2xl font-semibold">Tüm Dijital İhtiyaçlarınız Tek Çatı Altında</h3>
                   <p className="text-gray-400">Performans odaklı stratejilerimizle işinizi büyütmeye hazırız. Mükemmellik her detayda yatıyor.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="hizmetler" className="py-32 relative border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Nasıl Değer Katıyoruz?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">Dijital dünyadaki varlığınızı güçlendirmek, sizi rakiplerinizden ayıracak garantili çözümler sunuyoruz.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: LineChart, 
                  title: "2026 SEO Optimizasyonu", 
                  desc: "Google algoritmalarına uygun güncel stratejilerle organik trafiğinizi ve bölgesel Sakarya aramalarındaki sıranızı garantili şekilde artırıyoruz.",
                  color: "from-green-500/20 to-emerald-500/20",
                  iconColor: "text-emerald-400"
                },
                { 
                  icon: Code2, 
                  title: "Modern Web Tasarım", 
                  desc: "Framer Motion, Next.js ve Tailwind CSS gibi modern teknolojilerle, hız skoru yüksek ve mobil uyumlu, premium hissettiren web siteleri.",
                  color: "from-indigo-500/20 to-blue-500/20",
                  iconColor: "text-indigo-400"
                },
                { 
                  icon: Smartphone, 
                  title: "Sosyal Medya Yönetimi", 
                  desc: "Instagram ve Facebook için verilere dayalı post tasarımı, reels kurgusu ve topluluk yönetimi ile kitlenizi sadık müşterilere dönüştürün.",
                  color: "from-fuchsia-500/20 to-pink-500/20",
                  iconColor: "text-fuchsia-400"
                },
              ].map((service, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  key={i} 
                  className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110">
                    <service.icon className="w-32 h-32" />
                  </div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} border border-white/10 flex items-center justify-center mb-6`}>
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="neden-biz" className="py-32 relative border-t border-white/5 bg-[#0a0a0c]">
           <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
             <motion.div 
               initial={{ opacity: 0, x: -40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="space-y-8"
             >
               <h2 className="text-4xl md:text-5xl font-bold leading-tight">Sakarya'nın <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-500">En Yenilikçi</span> Ajansı</h2>
               <p className="text-lg text-gray-400">Biz sadece bir ajans değil, işinizin dijital büyüme ortağıyız. Doğru metrikleri izliyor ve yatırım getirinizi maksimize ediyoruz.</p>
               
               <ul className="space-y-4 pt-4">
                 {[
                   "Modern Teknoloji Yığını (React, Next.js)",
                   "Lighthouse Testlerinde %99+ Performans Garantisi",
                   "Bölgesel (Sakarya, Serdivan) Analiz ve Yerel SEO Başarısı",
                   "7/24 Kesintisiz Şeffaf İletişim"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-300">
                     <CheckCircle2 className="w-6 h-6 text-indigo-500 flex-shrink-0" />
                     <span>{item}</span>
                   </li>
                 ))}
               </ul>
               
               <div className="pt-6">
                 <Link href="/iletisim" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors gap-2 border border-white/5">
                   Bizimle İletişime Geçin
                 </Link>
               </div>
             </motion.div>
             
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 blur-[100px] rounded-full" />
                <div className="relative rounded-3xl border border-white/10 bg-[#151518] p-8 shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 flex items-center justify-center shadow-lg">
                       <BarChart3 className="w-8 h-8 text-white" />
                     </div>
                     <div className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       Performans Artışı
                     </div>
                   </div>
                   
                   <div className="mt-12 space-y-6">
                     <div className="space-y-2">
                       <div className="flex justify-between text-sm text-gray-400">
                         <span>Organik Trafik Büyümesi</span>
                         <span className="text-emerald-400">+240%</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: "85%" }}
                           viewport={{ once: true }}
                           transition={{ duration: 1.5, delay: 0.5 }}
                           className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                         />
                       </div>
                     </div>
                     <div className="space-y-2">
                       <div className="flex justify-between text-sm text-gray-400">
                         <span>Sosyal Medya Etkileşimi</span>
                         <span className="text-fuchsia-400">+185%</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: "70%" }}
                           viewport={{ once: true }}
                           transition={{ duration: 1.5, delay: 0.7 }}
                           className="h-full bg-gradient-to-r from-fuchsia-400 to-pink-400"
                         />
                       </div>
                     </div>
                   </div>
                </div>
              </motion.div>
           </div>
        </section>
      </main>

      <footer className="relative z-10 bg-[#060608] border-t border-white/5">
        {/* CTA Banner */}
        <div className="bg-gradient-to-b from-indigo-500/5 to-transparent">
          <div className="mx-auto max-w-7xl px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold">Projenizi Konuşalım.</h3>
              <p className="text-gray-400 mt-4 text-lg">Hemen şimdi bize ulaşın ve markanız için ücretsiz analiz raporunuzu hazırlayalım.</p>
            </div>
            <Link href="/iletisim" className="group px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
              Ücretsiz Analiz Al
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-600 flex items-center justify-center">
                <span className="font-bold text-white text-sm">S</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Serdivan Dijital</span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6">Sakarya'nın öncü dijital pazarlama ajansı. Müşterilerinizle aranızdaki köprüyü inşa ediyoruz.</p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: MapPin, href: "#" },
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all">
                  <social.icon className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Hızlı Menü</h4>
            <ul className="space-y-4">
              {[
                { label: "Ana Sayfa", href: "/" },
                { label: "Hakkımızda", href: "/hakkimizda" },
                { label: "Hizmetlerimiz", href: "/hizmetler" },
                { label: "Blog & SEO", href: "/blog" },
                { label: "İletişim", href: "/iletisim" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-500 hover:text-indigo-400 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Hizmetlerimiz</h4>
            <ul className="space-y-4">
              <li className="text-gray-500">2026 SEO Optimizasyonu</li>
              <li className="text-gray-500">Modern Web Tasarım</li>
              <li className="text-gray-500">E-Ticaret Danışmanlığı</li>
              <li className="text-gray-500">Sosyal Medya Yönetimi</li>
              <li className="text-gray-500">Performans Pazarlaması</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-500 items-start">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Serdivan, Sakarya<br/>Türkiye</span>
              </li>
              <li className="flex gap-3 text-gray-500 items-center">
                <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                <a href="mailto:info@serdivandijital.com" className="hover:text-white transition-colors">info@serdivandijital.com</a>
              </li>
              <li className="flex gap-3 text-gray-500 items-center">
                <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                <a href="tel:+905555555555" className="hover:text-white transition-colors">+90 XXX XXX XX XX</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">© 2026 Serdivan Dijital Pazarlama. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BarChart3(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}
