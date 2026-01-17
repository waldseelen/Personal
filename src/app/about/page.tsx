import { siteConfig } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hakkımda',
    description: 'Yapay Zeka, Siber Güvenlik ve Modern Web Teknolojileri üzerine çalışan Elektrik-Elektronik Mühendisliği öğrencisi.',
};

export default function AboutPage() {
    const skills = {
        aiLlm: ['RAG Mimarisi', 'Doküman Embedding', 'Vektör Veritabanları', 'LORA/QLORA Fine-tuning', 'Prompt Mühendisliği'],
        cybersecurity: ['Fortigate Firewall (IPS, SSL VPN)', 'Penetrasyon Testleri (Burp Suite, SQLMap)', 'SOC Operasyonları (QRadar, CrowdStrike)', 'Linux Sistem Yönetimi'],
        software: ['Python', 'JavaScript', 'HTML/CSS', 'Supabase', 'REST API', 'Next.js'],
        tools: ['Git', 'Docker', 'Pipedream', 'VS Code', 'Jupyter'],
    };

    const experiences = [
        {
            title: 'Stajyer - SOC Operasyonları',
            company: 'Siber Güvenlik Firması',
            period: '2025 - Günümüz',
            description: 'QRadar SIEM ile güvenlik olay yönetimi, CrowdStrike EDR kullanımı ve tehdit analizi.',
        },
        {
            title: 'Yapay Zeka Araştırmacısı',
            company: 'Kişisel Projeler',
            period: '2024 - Günümüz',
            description: 'RAG mimarisi, LLM fine-tuning ve üretken yapay zeka uygulamaları geliştirme.',
        },
        {
            title: 'Elektrik-Elektronik Mühendisliği',
            company: 'Üniversite Eğitimi',
            period: '2021 - Devam Ediyor',
            description: 'Mühendislik temelleri, sinyal işleme ve gömülü sistemler üzerine eğitim.',
        },
    ];

    return (
        <div className="section">
            <div className="container-custom">
                {/* Hero Section */}
                <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Image */}
                    <div className="relative">
                        <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                            {/* TODO: Gerçek resim eklenecek */}
                            <div className="flex h-full items-center justify-center text-neutral-400">
                                <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-primary-100 dark:bg-primary-900/30" />
                    </div>

                    {/* Content */}
                    <div>
                        <h1 className="heading-1">Hakkımda</h1>
                        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
                            Merhaba! Ben {siteConfig.author.name}, Elektrik-Elektronik Mühendisliği öğrencisi ve
                            Yapay Zeka & Siber Güvenlik araştırmacısıyım. Geleceğin teknolojilerini güvenle
                            inşa etmeye tutkuyla bağlıyım.
                        </p>
                        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                            Özellikle Üretken Yapay Zeka (Generative AI), RAG mimarisi, Model Fine-tuning ve
                            Siber Güvenlik operasyonları üzerine çalışıyorum. GPT, Claude, Gemini gibi LLM&apos;ler
                            ile prompt mühendisliği deneyimim bulunuyor.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
                                GitHub
                            </a>
                            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <section className="mb-16">
                    <h2 className="heading-2 mb-8">Uzmanlık Alanları</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="card">
                            <h3 className="mb-4 text-lg font-semibold text-primary-600 dark:text-primary-400">
                                Yapay Zeka & LLM
                            </h3>
                            <ul className="space-y-2">
                                {skills.aiLlm.map((skill) => (
                                    <li key={skill} className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                                        <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card">
                            <h3 className="mb-4 text-lg font-semibold text-accent-600 dark:text-accent-400">
                                Siber Güvenlik
                            </h3>
                            <ul className="space-y-2">
                                {skills.cybersecurity.map((skill) => (
                                    <li key={skill} className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                                        <svg className="h-4 w-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card">
                            <h3 className="mb-4 text-lg font-semibold text-green-600 dark:text-green-400">
                                Yazılım & Web
                            </h3>
                            <ul className="space-y-2">
                                {skills.software.map((skill) => (
                                    <li key={skill} className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                                        <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card">
                            <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                Araçlar
                            </h3>
                            <ul className="space-y-2">
                                {skills.tools.map((skill) => (
                                    <li key={skill} className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                                        <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section>
                    <h2 className="heading-2 mb-8">Deneyim</h2>
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-neutral-200 dark:before:bg-neutral-800">
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary-600" />

                                <div className="card">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                                {exp.title}
                                            </h3>
                                            <p className="text-primary-600 dark:text-primary-400">{exp.company}</p>
                                        </div>
                                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-neutral-600 dark:text-neutral-400">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
