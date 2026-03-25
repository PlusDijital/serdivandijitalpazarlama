import { MapPin, Target, Users2, Zap, Award } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const metadata = {
  title: 'Hakkımızda',
  description: 'Sakarya Serdivan Dijital Pazarlama. İşletmenizi dijitalde büyüten performans ajansıyız.',
};

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Biz Kimiz?</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">Sakarya ve Serdivan merkezli, veri odaklı kararlar alan yeni nesil bir dijital performans ajansıyız.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20" />
            <div className="text-center space-y-6 relative z-10">
              <Zap className="w-20 h-20 text-indigo-400 mx-auto" />
              <h3 className="text-2xl font-bold">2026 Vizyonu</h3>
              <p className="text-gray-400">Yapay zeka ve otomasyonları dijital pazarlama stratejilerimize entegre ediyoruz.</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Misyonumuz, sizin büyümenizdir.</h2>
            <p className="text-gray-400 text-lg leading-relaxed">Geleneksel ajans yapılarının aksine biz, "ne kadar bütçe harcadığınız" ile değil, "ne kadar gelir elde ettiğiniz" ile ilgileniyoruz.</p>
            
            <ul className="space-y-6">
               {[
                 { icon: Target, title: "Hedef Odaklı", desc: "ROI (Yatırım Getirisi) merkezli kampanyalar." },
                 { icon: Users2, title: "Deneyimli Ekip", desc: "SEO, Web ve Sosyal Medya alanında uzmanlar." },
                 { icon: Award, title: "Garantili Sonuçlar", desc: "Verilere dayalı optimizasyon ile sürekli iyileştirme." },
               ].map((item, i) => (
                 <li key={i} className="flex gap-4 items-start">
                   <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                     <item.icon className="w-6 h-6 text-indigo-400" />
                   </div>
                   <div>
                     <h4 className="font-semibold text-lg">{item.title}</h4>
                     <p className="text-gray-400">{item.desc}</p>
                   </div>
                 </li>
               ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-[#121214]/60 border border-white/10 rounded-3xl p-12 text-center space-y-8">
          <MapPin className="w-12 h-12 text-fuchsia-400 mx-auto" />
          <h2 className="text-3xl font-bold">Sakarya'dan Hedeflerinize</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Serdivan'daki ofisimizden başta Sakarya esnafı olmak üzere Türkiye'nin dört bir yanındaki markalara hizmet veriyoruz.</p>
          <Link href="/iletisim" className="inline-block px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
            Bizimle Tanışın
          </Link>
        </div>
      </div>
    </div>
  );
}
