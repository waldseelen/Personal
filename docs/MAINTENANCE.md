# 🔧 Maintenance Guide

Bu doküman, Portfolio projesinin düzenli bakım görevlerini ve en iyi uygulamalarını açıklar.

## 📅 Düzenli Bakım Takvimi

### Günlük
- [ ] Error loglarını kontrol et
- [ ] Pending yorumları moderasyondan geçir
- [ ] Yeni iletişim mesajlarını kontrol et

### Haftalık
- [ ] Lighthouse performans raporunu gözden geçir
- [ ] Analytics verilerini analiz et
- [ ] Spam filtresini kontrol et

### Aylık
- [ ] Bağımlılıkları güncelle
- [ ] Güvenlik açıklarını tara
- [ ] Backup'ları doğrula
- [ ] SSL sertifikasını kontrol et

### Çeyreklik
- [ ] Major framework güncellemelerini değerlendir
- [ ] Performans optimizasyonu yap
- [ ] SEO analizini gözden geçir
- [ ] Erişilebilirlik testini tekrarla

---

## 🔄 Bağımlılık Güncellemeleri

### Güvenli Güncelleme Prosedürü

1. **Güncel durumu kontrol et:**
```bash
npm outdated
```

2. **Güvenlik açıklarını tara:**
```bash
npm audit
```

3. **Minor/patch güncellemelerini yap:**
```bash
npm update
```

4. **Major güncellemeler için:**
```bash
# Önce test ortamında dene
npm install package@latest

# Testleri çalıştır
npm run test
npm run type-check
npm run build
```

5. **Değişiklikleri commit et:**
```bash
git add package.json package-lock.json
git commit -m "chore: update dependencies"
```

### Kritik Paketler

| Paket | Önem | Notlar |
|-------|------|--------|
| next | Kritik | Breaking changes dikkatli kontrol |
| react | Kritik | Next.js uyumluluğunu doğrula |
| sanity | Yüksek | Studio uyumluluğunu test et |
| typescript | Orta | Tip hatalarını kontrol et |

---

## 🔒 Güvenlik

### Güvenlik Kontrol Listesi

- [ ] API key'lerin rotate edilmesi (3 ayda bir)
- [ ] Admin şifrelerinin güncellenmesi
- [ ] Rate limiting'in çalıştığının doğrulanması
- [ ] Honeypot spam korumasının aktif olduğu
- [ ] HTTPS'in zorunlu olduğu
- [ ] CSP header'larının doğru yapılandırıldığı

### Güvenlik Taraması

```bash
# npm audit
npm audit --audit-level=high

# Snyk (opsiyonel)
npx snyk test

# Lighthouse güvenlik kontrolü
npm run lighthouse
```

### API Key Rotasyonu

1. Yeni key oluştur (Sanity/Resend/etc.)
2. Environment variables'ı güncelle
3. Deploy et
4. Eski key'i devre dışı bırak

---

## 💾 Backup Stratejisi

### Sanity CMS Backup

Sanity otomatik backup sağlar, ancak manuel backup için:

```bash
# Dataset'i export et
sanity dataset export production backup.tar.gz

# Restore
sanity dataset import backup.tar.gz production --replace
```

### Kod Backup

- GitHub repository'si ana backup
- Vercel otomatik deployment geçmişi
- Tag/release'ler için milestone backup

### Environment Variables Backup

```bash
# .env.local'ı güvenli yere kaydet (şifreli)
# Password manager veya HashiCorp Vault kullan
```

---

## 📊 Performans İzleme

### Lighthouse CI

Her push'ta otomatik çalışır:
```bash
npm run lighthouse
```

Hedefler:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### Vercel Analytics

Dashboard'dan izle:
- Core Web Vitals (LCP, FID, CLS)
- Sayfa yüklenme süreleri
- Hata oranları

### Custom Monitoring

```javascript
// Web Vitals izleme (layout.tsx'te zaten aktif)
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
```

---

## 🐛 Hata Çözümleme

### Yaygın Hatalar ve Çözümleri

#### Build Hataları

```bash
# Cache temizle ve yeniden build
npm run clean
npm install
npm run build
```

#### Type Hataları

```bash
# Tüm tip hatalarını göster
npm run type-check

# TypeScript cache temizle
rm -rf node_modules/.cache/typescript
```

#### Sanity Bağlantı Hataları

1. Environment variables kontrol et
2. CORS ayarlarını doğrula (sanity.io/manage)
3. API token'ın geçerli olduğunu kontrol et

#### PWA Sorunları

```bash
# Service worker'ı yeniden oluştur
rm -rf .next
rm public/sw.js
npm run build
```

### Hata Logları

```bash
# Vercel loglarını görüntüle
npx vercel logs

# Local development logları
npm run dev 2>&1 | tee dev.log
```

---

## 🔄 Deployment

### Production Deployment

```bash
# Vercel CLI ile
npx vercel --prod

# Git ile (otomatik)
git push origin main
```

### Rollback

```bash
# Vercel dashboard'dan veya
npx vercel rollback <deployment-url>
```

### Environment Sync

```bash
# Vercel env'lerini çek
npx vercel env pull

# Env'leri push et
npx vercel env add
```

---

## 📈 SEO Bakımı

### Düzenli Kontroller

1. **Google Search Console:**
   - Indexleme durumu
   - Crawl hataları
   - Core Web Vitals

2. **Sitemap:**
   - /sitemap.xml otomatik güncellenir
   - Google'a submit edildiğini doğrula

3. **Robots.txt:**
   - /robots.txt'i kontrol et
   - Gerekli sayfaların engelllenmediğinden emin ol

### Meta Tag Kontrolü

```bash
# Her sayfanın meta taglerini kontrol et
curl -s https://your-domain.com | grep -E '<(title|meta)'
```

---

## 🌐 CDN ve Cache

### Vercel Edge Cache

```typescript
// Revalidation zamanlarını ayarla
export const revalidate = 3600; // 1 saat

// On-demand revalidation
await revalidatePath('/blog');
await revalidateTag('blog');
```

### Cache Temizleme

```bash
# Tüm cache'i temizle
curl -X POST https://your-domain.com/api/revalidate \
  -H "Authorization: Bearer TOKEN" \
  -d '{"type": "all"}'
```

---

## 📝 Kontrol Listesi Template

### Pre-deployment Checklist

- [ ] Tüm testler geçiyor (`npm run test`)
- [ ] Type check başarılı (`npm run type-check`)
- [ ] Lint hataları yok (`npm run lint`)
- [ ] Build başarılı (`npm run build`)
- [ ] Lighthouse skorları >90
- [ ] Environment variables güncel
- [ ] Breaking changes dokümante edildi

### Post-deployment Checklist

- [ ] Ana sayfalar erişilebilir
- [ ] API endpoint'ler çalışıyor
- [ ] İletişim formu çalışıyor
- [ ] Analytics aktif
- [ ] Error monitoring aktif
- [ ] SSL sertifikası geçerli

---

## 📞 Destek

### Acil Durumlar

1. Vercel Status: https://www.vercel-status.com/
2. Sanity Status: https://status.sanity.io/
3. GitHub Status: https://www.githubstatus.com/

### Kaynaklar

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
