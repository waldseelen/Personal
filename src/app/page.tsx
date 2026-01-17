import { BlogCard, BlogCardSkeleton } from '@/components/blog/BlogCard';
import { ProjectCard, ProjectCardSkeleton } from '@/components/projects/ProjectCard';
import { getFeaturedPosts, getFeaturedProjects } from '@/lib/data';
import type { BlogPost, Project } from '@/types';
import Link from 'next/link';
import { Suspense } from 'react';

// ISR: Revalidate every 6 hours (low frequency as per roadmap)
export const revalidate = 21600;

// Featured Projects Component
async function FeaturedProjects() {
    let projects: Project[] = [];

    try {
        projects = await getFeaturedProjects(3);
    } catch (error) {
        console.error('Error fetching featured projects:', error);
    }

    // Fallback demo data if no projects from Sanity
    if (!projects || projects.length === 0) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="card">
                        <div className="mb-4 aspect-video rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                            <span className="text-neutral-400">Demo Proje {i}</span>
                        </div>
                        <h3 className="heading-3">Örnek Proje {i}</h3>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            Sanity CMS&apos;den gerçek projeler yüklenecek. İçerik eklemek için Sanity Studio&apos;yu kullanın.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                                Next.js
                            </span>
                            <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700 dark:bg-accent-900 dark:text-accent-300">
                                TypeScript
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
            ))}
        </div>
    );
}

// Featured Posts Component
async function FeaturedPosts() {
    let posts: BlogPost[] = [];

    try {
        posts = await getFeaturedPosts(3);
    } catch (error) {
        console.error('Error fetching featured posts:', error);
    }

    // Fallback demo data if no posts from Sanity
    if (!posts || posts.length === 0) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <article key={i} className="card">
                        <div className="mb-4 aspect-video rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                            <span className="text-neutral-400">Demo Yazı {i}</span>
                        </div>
                        <span className="text-xs font-medium uppercase tracking-wide text-primary-600 dark:text-primary-400">
                            Kategori
                        </span>
                        <h3 className="heading-3 mt-2">Örnek Blog Yazısı {i}</h3>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            Sanity CMS&apos;den gerçek blog yazıları yüklenecek.
                        </p>
                        <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
                            <span>Yazar Adı</span>
                            <time>1 Ocak 2025</time>
                        </div>
                    </article>
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
                <BlogCard key={post._id} post={post} index={index} />
            ))}
        </div>
    );
}

// Loading Skeletons
function ProjectsSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
                <ProjectCardSkeleton key={i} />
            ))}
        </div>
    );
}

function PostsSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
                <BlogCardSkeleton key={i} />
            ))}
        </div>
    );
}

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950">
                <div className="container-custom section relative z-10">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Badge */}
                        <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
                            </span>
                            Yapay Zeka & Siber Güvenlik Araştırmacısı
                        </div>

                        {/* Heading */}
                        <h1 className="animate-fade-up heading-display text-balance mb-6">
                            Geleceğin Teknolojilerini{' '}
                            <span className="gradient-text">Güvenle</span>{' '}
                            İnşa Ediyorum
                        </h1>

                        {/* Description */}
                        <p className="animate-fade-up animate-delay-100 mx-auto mb-8 max-w-2xl text-lg text-neutral-600 md:text-xl dark:text-neutral-400">
                            Yapay zeka sistemleri, LLM mimarileri ve siber güvenlik operasyonları üzerine
                            çalışan bir Elektrik-Elektronik Mühendisliği öğrencisiyim.
                        </p>

                        {/* CTA Buttons */}
                        <div className="animate-fade-up animate-delay-200 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/projects" className="btn-primary px-8 py-3 text-base">
                                Projelerimi Gör
                            </Link>
                            <Link href="/contact" className="btn-outline px-8 py-3 text-base">
                                İletişime Geç
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary-200/30 blur-3xl dark:bg-primary-900/20" />
                    <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/20" />
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="section bg-white dark:bg-neutral-950">
                <div className="container-custom">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="heading-2">Öne Çıkan Projeler</h2>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                Yapay zeka ve güvenlik odaklı projelerim
                            </p>
                        </div>
                        <Link
                            href="/projects"
                            className="hidden items-center gap-2 text-primary-600 hover:text-primary-700 sm:inline-flex dark:text-primary-400 dark:hover:text-primary-300"
                        >
                            Tümünü Gör
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <Suspense fallback={<ProjectsSkeleton />}>
                        <FeaturedProjects />
                    </Suspense>
                </div>
            </section>

            {/* Latest Blog Posts Section */}
            <section className="section bg-neutral-50 dark:bg-neutral-900">
                <div className="container-custom">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="heading-2">Son Yazılar</h2>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                Yapay zeka, siber güvenlik ve teknoloji üzerine düşüncelerim
                            </p>
                        </div>
                        <Link
                            href="/blog"
                            className="hidden items-center gap-2 text-primary-600 hover:text-primary-700 sm:inline-flex dark:text-primary-400 dark:hover:text-primary-300"
                        >
                            Tüm Yazılar
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <Suspense fallback={<PostsSkeleton />}>
                        <FeaturedPosts />
                    </Suspense>
                </div>
            </section>

            {/* Skills Section */}
            <section className="section bg-white dark:bg-neutral-950">
                <div className="container-custom">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="heading-2">Uzmanlık Alanlarım</h2>
                        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                            Yapay Zeka, Siber Güvenlik ve Web Teknolojilerinde uzmanlaşıyorum.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* AI & LLM */}
                        <div className="rounded-2xl border border-neutral-200 p-6 transition-shadow hover:shadow-lg dark:border-neutral-800">
                            <div className="mb-4 inline-flex rounded-xl bg-primary-100 p-3 dark:bg-primary-900">
                                <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="heading-3">Yapay Zeka & LLM</h3>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                RAG mimarisi, fine-tuning, prompt mühendisliği ve vektör veritabanları.
                            </p>
                        </div>

                        {/* Cybersecurity */}
                        <div className="rounded-2xl border border-neutral-200 p-6 transition-shadow hover:shadow-lg dark:border-neutral-800">
                            <div className="mb-4 inline-flex rounded-xl bg-accent-100 p-3 dark:bg-accent-900">
                                <svg className="h-6 w-6 text-accent-600 dark:text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="heading-3">Siber Güvenlik</h3>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                SOC operasyonları, penetrasyon testleri, Fortigate ve SIEM sistemleri.
                            </p>
                        </div>

                        {/* Web Development */}
                        <div className="rounded-2xl border border-neutral-200 p-6 transition-shadow hover:shadow-lg dark:border-neutral-800">
                            <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3 dark:bg-green-900">
                                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="heading-3">Yazılım & Web</h3>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                Python, JavaScript, Next.js, Supabase ve REST API entegrasyonları.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900">
                <div className="container-custom text-center">
                    <h2 className="heading-2 text-white">Birlikte Çalışalım</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
                        Yapay zeka, siber güvenlik veya web projeleri için bana ulaşın. Fikirlerinizi hayata geçirmek için buradayım.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-medium text-primary-700 shadow-lg transition-all hover:bg-neutral-100 hover:shadow-xl"
                        >
                            İletişime Geç
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
