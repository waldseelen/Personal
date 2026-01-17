// Site configuration constants
export const siteConfig = {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'Buğra Akın',
    description: 'Yapay Zeka, Siber Güvenlik ve Modern Web Teknolojileri üzerine çalışan Elektrik-Elektronik Mühendisliği öğrencisi.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bugraakin.com',
    author: {
        name: 'Muhammed Buğra Akın',
        email: 'bugraakin01@gmail.com',
        twitter: '@bugraakin',
        title: 'AI & Cybersecurity Researcher',
        location: 'Gaziantep, Türkiye',
    },
    links: {
        github: 'https://github.com/waldseelen',
        linkedin: 'https://linkedin.com/in/bugraakin',
        twitter: 'https://twitter.com/bugraakin',
    },
} as const;

// Navigation items
export const navItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projeler', href: '/projects' },
    { label: 'Hakkımda', href: '/about' },
    { label: 'İletişim', href: '/contact' },
] as const;

// ISR revalidation times (in seconds)
export const revalidateTimes = {
    short: 60 * 60, // 1 hour
    medium: 6 * 60 * 60, // 6 hours
    long: 24 * 60 * 60, // 24 hours
} as const;

// Cache tags for on-demand revalidation
export const cacheTags = {
    blog: 'blog',
    blogPost: (slug: string) => `blog-post-${slug}`,
    projects: 'projects',
    project: (slug: string) => `project-${slug}`,
    pages: 'pages',
    page: (slug: string) => `page-${slug}`,
} as const;
