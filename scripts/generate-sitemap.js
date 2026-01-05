// ============================================
// scripts/generate-sitemap.js
// ============================================
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// הגדרת כל הנתיבים באתר
const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/services',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/portfolio',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '/contact',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/terms',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/privacy',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/accessibility',
    changefreq: 'yearly',
    priority: 0.3,
  },
];

function generateSitemap() {
  const baseUrl = 'https://sackermanufactures.com';
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // יצירת רשימת כל ה-URLs (אנגלית + עברית)
  const allUrls = [];
  
  // הוספת דפים באנגלית
  routes.forEach(route => {
    allUrls.push({
      ...route,
      path: route.path,
      lang: 'en',
      altLang: 'he',
      altPath: `/he${route.path === '/' ? '' : route.path}`
    });
  });
  
  // הוספת דפים בעברית
  routes.forEach(route => {
    allUrls.push({
      ...route,
      path: `/he${route.path === '/' ? '' : route.path}`,
      lang: 'he',
      altLang: 'en',
      altPath: route.path
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allUrls
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="${route.altLang}" href="${baseUrl}${route.altPath}" />
  </url>`
  )
  .join('\n')}
</urlset>`;

  // שמירה ב-dist
  const sitemapPath = join(distDir, 'sitemap.xml');
  writeFileSync(sitemapPath, sitemap);
  console.log('✓ Sitemap created:', sitemapPath);

  // שמירה גם ב-public (לפיתוח)
  const publicSitemapPath = join(rootDir, 'public', 'sitemap.xml');
  writeFileSync(publicSitemapPath, sitemap);
  console.log('✓ Sitemap created:', publicSitemapPath);
}

function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_vite/

Sitemap: https://sackermanufactures.com/sitemap.xml
`;

  // שמירה ב-dist
  const robotsPath = join(distDir, 'robots.txt');
  writeFileSync(robotsPath, robotsTxt);
  console.log('✓ robots.txt created:', robotsPath);

  // שמירה גם ב-public
  const publicRobotsPath = join(rootDir, 'public', 'robots.txt');
  writeFileSync(publicRobotsPath, robotsTxt);
  console.log('✓ robots.txt created:', publicRobotsPath);
}

// הרצה
console.log('Generating sitemap and robots.txt...');
generateSitemap();
generateRobotsTxt();
console.log('✓ Done!');