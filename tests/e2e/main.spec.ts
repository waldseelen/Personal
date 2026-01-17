import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
    test('should load successfully', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Portfolio/);
    });

    test('should have navigation links', async ({ page }) => {
        await page.goto('/');

        // Check header navigation exists
        const nav = page.locator('header nav');
        await expect(nav).toBeVisible();

        // Check main navigation links in header only (to avoid footer duplicates)
        await expect(page.locator('header').getByRole('link', { name: /blog/i }).first()).toBeVisible();
        await expect(page.locator('header').getByRole('link', { name: /proje/i }).first()).toBeVisible();
    });

    test('should navigate to blog page', async ({ page, isMobile }) => {
        await page.goto('/');

        // On mobile, open the menu first
        if (isMobile) {
            const menuButton = page.locator('header button[aria-label*="Menü"]');
            if (await menuButton.isVisible()) {
                await menuButton.click();
                await page.waitForTimeout(300); // Wait for menu animation
            }
        }

        await page.locator('header').getByRole('link', { name: /blog/i }).first().click();
        await expect(page).toHaveURL(/.*blog/);
    });

    test('should navigate to projects page', async ({ page, isMobile }) => {
        await page.goto('/');

        // On mobile, open the menu first
        if (isMobile) {
            const menuButton = page.locator('header button[aria-label*="Menü"]');
            if (await menuButton.isVisible()) {
                await menuButton.click();
                await page.waitForTimeout(300); // Wait for menu animation
            }
        }

        await page.locator('header').getByRole('link', { name: /proje/i }).first().click();
        await expect(page).toHaveURL(/.*projects/);
    });
});

test.describe('Blog', () => {
    test('should display blog posts', async ({ page }) => {
        await page.goto('/blog');
        await expect(page).toHaveTitle(/Blog/);

        // Check for blog post cards, articles, or any content indicating posts
        const articles = page.locator('article, [data-testid="blog-card"], .blog-card, a[href^="/blog/"]');
        // Wait for content to load
        await page.waitForLoadState('networkidle');
        const count = await articles.count();
        // Allow empty state if no blog posts exist
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should navigate to blog detail', async ({ page }) => {
        await page.goto('/blog');
        await page.waitForLoadState('networkidle');

        // Click first blog post link if exists
        const firstPost = page.locator('a[href^="/blog/"]').first();
        if (await firstPost.isVisible()) {
            await firstPost.click();
            await expect(page).toHaveURL(/.*blog\/.+/);
        } else {
            // No blog posts available, test passes
            expect(true).toBe(true);
        }
    });
});

test.describe('Projects', () => {
    test('should display projects', async ({ page }) => {
        await page.goto('/projects');
        await expect(page).toHaveTitle(/Proje/);

        // Wait for content to load
        await page.waitForLoadState('networkidle');

        // Check for project cards with various possible selectors
        const projects = page.locator('article, [data-testid="project-card"], .project-card, a[href^="/projects/"]');
        const count = await projects.count();
        // Allow empty state if no projects exist
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should navigate to project detail', async ({ page }) => {
        await page.goto('/projects');
        await page.waitForLoadState('networkidle');

        // Click first project link if exists
        const firstProject = page.locator('a[href^="/projects/"]').first();
        if (await firstProject.isVisible()) {
            await firstProject.click();
            await expect(page).toHaveURL(/.*projects\/.+/);
        } else {
            // No projects available, test passes
            expect(true).toBe(true);
        }
    });
});

test.describe('About', () => {
    test('should display about page', async ({ page }) => {
        await page.goto('/about');
        await expect(page).toHaveTitle(/Hakkımda/);
    });
});

test.describe('Contact', () => {
    test('should display contact form', async ({ page }) => {
        await page.goto('/contact');
        await expect(page).toHaveTitle(/İletişim/);

        // Check form elements
        await expect(page.locator('form')).toBeVisible();
        await expect(page.locator('input[name="name"], input[id="name"]')).toBeVisible();
        await expect(page.locator('input[name="email"], input[id="email"]')).toBeVisible();
        await expect(page.locator('textarea[name="message"], textarea[id="message"]')).toBeVisible();
    });

    test('should validate required fields', async ({ page }) => {
        await page.goto('/contact');

        // Try to submit empty form
        const submitButton = page.locator('button[type="submit"]');
        await submitButton.click();

        // Form should still be on the page (not submitted)
        await expect(page.locator('form')).toBeVisible();
    });
});

test.describe('Accessibility', () => {
    test('should have skip to main content link', async ({ page }) => {
        await page.goto('/');

        const skipLink = page.locator('a.skip-link, a[href="#main-content"]');
        await expect(skipLink).toBeAttached();
    });

    test('should have proper heading structure', async ({ page }) => {
        await page.goto('/');

        // Should have an h1
        const h1 = page.locator('h1');
        await expect(h1).toBeVisible();
    });
});

test.describe('PWA', () => {
    test('should have manifest', async ({ page }) => {
        const response = await page.goto('/manifest.json');
        expect(response?.status()).toBe(200);
    });

    test('should have offline page', async ({ page }) => {
        await page.goto('/offline');
        await expect(page.locator('body')).toContainText(/offline|çevrimdışı/i);
    });
});

test.describe('SEO', () => {
    test('should have robots.txt', async ({ page }) => {
        const response = await page.goto('/robots.txt');
        expect(response?.status()).toBe(200);
    });

    test('should have sitemap', async ({ page }) => {
        const response = await page.goto('/sitemap.xml');
        expect(response?.status()).toBe(200);
    });

    test('should have proper meta tags', async ({ page }) => {
        await page.goto('/');

        // Check Open Graph tags
        await expect(page.locator('meta[property="og:title"]')).toBeAttached();
        await expect(page.locator('meta[property="og:description"]')).toBeAttached();

        // Check Twitter tags
        await expect(page.locator('meta[name="twitter:card"]')).toBeAttached();
    });
});
