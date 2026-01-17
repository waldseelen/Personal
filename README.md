# 🚀 Portfolio - Next.js 15 + Sanity CMS

Modern, performanslı ve SEO-optimized portfolio web sitesi. Next.js 15, Sanity CMS, TypeScript ve Tailwind CSS ile geliştirilmiştir.

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Sanity](https://img.shields.io/badge/Sanity-3.99-red?logo=sanity)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Özellikler

### 🎨 Frontend
- **Next.js 15** - App Router, React Server Components, Streaming
- **TypeScript** - Tam tip güvenliği
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Akıcı animasyonlar
- **Dark/Light Mode** - Sistem tercihine uyumlu tema
- **i18n Desteği** - Türkçe ve İngilizce dil desteği
- **PWA** - Progressive Web App, offline destek
- **Push Notifications** - Bildirim sistemi

### 📝 İçerik Yönetimi
- **Sanity Studio** - Görsel içerik editörü
- **Blog Sistemi** - Markdown/Portable Text desteği
- **Proje Galerisi** - Filtreleme ve kategorilendirme
- **İletişim Formu** - Spam korumalı, e-posta bildirimi
- **Yorum Sistemi** - Moderasyonlu blog yorumları

### 🔧 Teknik
- **ISR** - Incremental Static Regeneration
- **On-demand Revalidation** - Anlık içerik güncelleme
- **API Routes** - RESTful API endpoints
- **SEO Optimized** - Meta tags, sitemap, robots.txt
- **Lighthouse 90+** - Performans, erişilebilirlik, SEO

## 🛠️ Kurulum

### Gereksinimler
- Node.js 20.x veya üzeri
- npm veya yarn
- Sanity hesabı

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/waldseelen/PORTFOLIO-SITE.git
cd PORTFOLIO-SITE
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın
`.env.local` dosyası oluşturun:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Your Portfolio

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_write_token

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your@email.com

# Authentication (NextAuth)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Push Notifications (Optional)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key

# Giscus Comments (Optional)
NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=Blog Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id

# Moderation
MODERATION_API_KEY=your_moderation_key
```

### 4. Sanity Studio'yu Yapılandırın
```bash
# Sanity CLI'yi yükleyin
npm install -g @sanity/cli

# Sanity'de dataset oluşturun
sanity init
```

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## 📁 Proje Yapısı

```
├── .github/
│   ├── instructions/     # AI kodlama yönergeleri
│   └── workflows/        # GitHub Actions CI/CD
├── public/               # Statik dosyalar
│   ├── icons/           # PWA ikonları
│   ├── manifest.json    # PWA manifest
│   └── robots.txt       # SEO robots
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API Routes
│   │   ├── blog/        # Blog sayfaları
│   │   ├── projects/    # Proje sayfaları
│   │   └── studio/      # Sanity Studio
│   ├── components/      # React bileşenleri
│   │   ├── analytics/   # Google/Vercel Analytics
│   │   ├── animations/  # Framer Motion
│   │   ├── comments/    # Yorum sistemi
│   │   ├── layout/      # Header, Footer
│   │   ├── notifications/ # Bildirimler
│   │   └── pwa/         # PWA bileşenleri
│   ├── hooks/           # Custom React hooks
│   ├── i18n/            # Çoklu dil desteği
│   ├── lib/             # Utility fonksiyonları
│   ├── providers/       # Context providers
│   ├── sanity/          # Sanity yapılandırması
│   │   └── schemas/     # İçerik şemaları
│   ├── styles/          # Global CSS
│   └── types/           # TypeScript tipleri
├── tests/
│   └── e2e/             # Playwright E2E testleri
├── lighthouserc.json    # Lighthouse CI config
├── next.config.ts       # Next.js yapılandırması
├── tailwind.config.ts   # Tailwind yapılandırması
└── tsconfig.json        # TypeScript yapılandırması
```

## 📜 Scriptler

```bash
# Geliştirme
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server

# Kod Kalitesi
npm run lint         # ESLint kontrolü
npm run lint:fix     # ESLint düzeltme
npm run type-check   # TypeScript kontrolü
npm run format       # Prettier formatla
npm run format:check # Format kontrolü

# Test
npm run test         # Playwright E2E testleri
npm run test:ui      # Playwright UI modu
npm run test:headed  # Görünür tarayıcı ile test

# Performans
npm run lighthouse   # Lighthouse CI
npm run analyze      # Bundle analizi
npm run clean        # Cache temizleme
```

## 🔌 API Endpoints

### Blog
- `GET /api/blog` - Blog yazıları listesi
- `GET /api/blog/[slug]` - Tek blog yazısı

### Projects
- `GET /api/projects` - Proje listesi
- `GET /api/projects/[slug]` - Tek proje

### Contact
- `POST /api/contact` - İletişim formu gönderimi

### Comments
- `GET /api/comments?post=slug` - Post yorumları
- `POST /api/comments` - Yorum gönderimi
- `PATCH /api/comments/moderate/[id]` - Yorum moderasyonu

### Push Notifications
- `POST /api/push/subscribe` - Push aboneliği
- `POST /api/push/unsubscribe` - Abonelik iptali
- `POST /api/push/send` - Bildirim gönderimi

### Diğer
- `GET /api/health` - Sistem durumu
- `POST /api/revalidate` - Cache yenileme
- `GET /api/search?q=query` - Site içi arama

## 🚀 Deployment

### Vercel (Önerilen)
```bash
# Vercel CLI ile deploy
npx vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Ortam Değişkenleri
Production ortamında tüm `.env.local` değişkenlerini Vercel/hosting sağlayıcınızda ayarlayın.

## 🧪 Test

```bash
# E2E testlerini çalıştır
npm run test

# Debug modunda
npm run test:headed

# UI ile
npm run test:ui
```

## 📊 Performans

Lighthouse hedefleri (tümü >90):
- ✅ Performance
- ✅ Accessibility
- ✅ Best Practices
- ✅ SEO

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Commit Mesajları (Conventional Commits)
- `feat:` Yeni özellik
- `fix:` Bug düzeltme
- `docs:` Dokümantasyon
- `style:` Kod formatı
- `refactor:` Refactoring
- `test:` Test ekleme
- `chore:` Bakım işleri

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- Website: [your-domain.com](https://your-domain.com)
- Email: your@email.com
- GitHub: [@waldseelen](https://github.com/waldseelen)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
