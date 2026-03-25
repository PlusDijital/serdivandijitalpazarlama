export const metadata = {
  title: 'İletişim',
  description: 'Serdivan Dijital Pazarlama ile iletişime geçin. Sakarya verimli web tasarım ve SEO hizmetleri.',
};

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white pt-32 pb-16 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Bizimle İletişime Geçin</h1>
          <p className="text-gray-400 text-lg">Projeniz için ücretsiz analiz raporunuzu hazırlamamız için aşağıdaki formu doldurun.</p>
        </div>
        
        <div className="bg-[#121214]/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Ad Soyad</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 transition-colors" placeholder="Adınız Soyadınız" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">E-posta</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 transition-colors" placeholder="ornek@sirketiniz.com" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Telefon</label>
              <input type="tel" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 transition-colors" placeholder="0555 555 55 55" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Mesajınız</label>
              <textarea className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 min-h-[150px] focus:outline-none focus:border-indigo-500/50 transition-colors" placeholder="Projenizden veya hedeflerinizden bahsedin..." required></textarea>
            </div>
            
            <button type="submit" className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-semibold hover:opacity-90 transition-opacity">
              Mesajı Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
