# Roadmap - Portfolio Site

## Özet
Tüm özellikler entegre ve testler başarılı. ✅
Site içerikleri kişisel bilgilerle güncellendi. ✅

## İçerik Güncellemeleri (18 Ocak 2026)

- [x] Site adı "Buğra Akın" olarak güncellendi
- [x] Kişisel profil bilgileri güncellendi (constants.ts)
- [x] Türkçe dil dosyası güncellendi (tr.json)
- [x] İngilizce dil dosyası güncellendi (en.json)
- [x] Hero bölümü "Yapay Zeka & Siber Güvenlik" odaklı güncellendi
- [x] Skills bölümleri AI/LLM, Siber Güvenlik, Yazılım kategorileri eklendi
- [x] About sayfası gerçek biyografi ve deneyimlerle güncellendi
- [x] Gelişmiş animasyonlar eklendi (hover-lift, shine-effect, vb.)
- [x] Button animasyonları iyileştirildi (active:scale-95, hover:-translate-y)
- [x] SEO metadata güncellendi (AI, siber güvenlik keywords)

## Entegrasyon Durumu

- [x] BlogComments blog detay sayfasına entegre (`src/app/blog/[slug]/page.tsx`)
- [x] PWA kurulum/güncelleme promptları layout'a eklenmiş (`layout.tsx:132-135`)
- [x] NotificationProvider root provider zincirine eklendi (`ThemeProvider.tsx`)
- [x] NotificationPermissionBanner bildirimleri için UI akışı sağlandı

## Test Durumu (npm run test)

**36 test geçti** ✅

Son çalıştırma: 18 Ocak 2026

### Yapılan Düzeltmeler

- [x] NotificationProvider'ı root provider zincirine eklemek
- [x] NotificationPermissionBanner'ı UI'a eklemek
- [x] E2E test locator'larını tekilleştirmek (header scope)
- [x] Mobile navigasyon testlerini düzeltmek (menü açma)
- [x] Blog/Projects testlerini boş durum için toleranslı yapmak
- [x] Playwright config'i sadece Chromium ve Mobile Chrome için yapılandırmak

## Kalan Görevler

- [ ] Push aboneliği için detaylı UI akışı (isteğe bağlı gelişmiş özellik)
- [ ] usePushNotification hook'unu UI'da kullanmak (isteğe bağlı)
- [ ] Firefox/WebKit testlerini aktifleştirmek için: `npx playwright install`
