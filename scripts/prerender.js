import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Routes to prerender (English)
const routes = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/contact',
  '/terms',
  '/privacy',
  '/accessibility',
];

// ✅ פונקציה ליצירת Schema.org JSON-LD
function generateSchema(route, lang) {
  const baseUrl = 'https://sackermanufactures.com';
  
  // Schema בסיסי לארגון
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sacker Manufactures',
    alternateName: 'Sacker Manufacturing',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    description: lang === 'he' 
      ? 'ייצור בגדים פרימיום עם למעלה מ-30 שנות ניסיון. שותף אמין למותגי אופנה מובילים ברחבי העולם.'
      : 'Premium clothing manufacturing with over 30 years of experience. Trusted partner for leading fashion brands worldwide.',
    foundingDate: '1994',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+972-50-219-7105',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Hebrew'],
    },
  };

  let schema = organizationSchema;

  // Schema ספציפי לפי דף
  switch (route) {
    case '/':
      schema = {
        ...organizationSchema,
        '@type': ['Organization', 'Manufacturer'],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '500',
        },
      };
      break;

    case '/about':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: lang === 'he' ? 'אודות Sacker Manufactures' : 'About Sacker Manufactures',
        description: lang === 'he' 
          ? '30+ שנות מצוינות בייצור בגדים'
          : '30+ years of excellence in clothing manufacturing',
        url: `${baseUrl}${lang === 'he' ? '/he' : ''}${route}`,
        mainEntity: organizationSchema,
      };
      break;

    case '/contact':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: lang === 'he' ? 'צור קשר - Sacker Manufactures' : 'Contact Sacker Manufactures',
        url: `${baseUrl}${lang === 'he' ? '/he' : ''}${route}`,
        mainEntity: organizationSchema,
      };
      break;

    case '/services':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: lang === 'he' ? 'שירותי הייצור שלנו' : 'Our Manufacturing Services',
        description: lang === 'he' 
          ? 'מערך מלא של שירותי ייצור אופנה'
          : 'Full suite of clothing manufacturing services',
        url: `${baseUrl}${lang === 'he' ? '/he' : ''}${route}`,
        itemListElement: [
          {
            '@type': 'Service',
            name: lang === 'he' ? 'הכנת גזרות ודגם ראשוני' : 'Pattern Making & Sampling',
            description: lang === 'he' 
              ? 'הפיכת העיצוב שלך למציאות ברמת דיוק גבוהה'
              : 'Turn your designs into reality with precision',
            provider: organizationSchema,
          },
          {
            '@type': 'Service',
            name: lang === 'he' ? 'ייצור בכמויות קטנות וגדולות' : 'Small & Large Production Runs',
            description: lang === 'he' 
              ? 'פתרונות גמישים לכל שלב בצמיחת המותג שלך'
              : 'Flexible solutions for every stage of your brand\'s growth',
            provider: organizationSchema,
          },
          {
            '@type': 'Service',
            name: lang === 'he' ? 'בקרת איכות פרימיום' : 'Premium Quality Control',
            description: lang === 'he' 
              ? 'כל פריט עומד בסטנדרטים בינלאומיים'
              : 'Every garment meets international standards',
            provider: organizationSchema,
          },
          {
            '@type': 'Service',
            name: lang === 'he' ? 'גימור בגדים' : 'Garment Refinish',
            description: lang === 'he' 
              ? 'שירותי תיוג, גיהוץ ואריזה מחדש'
              : 'Labeling, ironing, and repacking services',
            provider: organizationSchema,
          },
        ],
      };
      break;

    case '/portfolio':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: lang === 'he' ? 'הפורטפוליו שלנו' : 'Our Portfolio',
        description: lang === 'he' 
          ? 'הצצה לעבודה שלנו - מפריטי יוקרה ועד אופנה יומיומית'
          : 'A glimpse of our work - from luxury garments to everyday apparel',
        url: `${baseUrl}${lang === 'he' ? '/he' : ''}${route}`,
        mainEntity: organizationSchema,
      };
      break;

    case '/terms':
    case '/privacy':
    case '/accessibility':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: route.replace('/', ''),
        url: `${baseUrl}${lang === 'he' ? '/he' : ''}${route}`,
      };
      break;
  }

  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

// פונקציה שמייצרת Meta Tags דינאמיים לפי route ושפה
function generateMetaTags(route, lang) {
  const siteUrl = 'https://sackermanufactures.com';
  let title, description, image;
  const langPrefix = lang === 'he' ? '/he' : '';
  const altLangPrefix = lang === 'he' ? '' : '/he';

  if (lang === 'he') {
    // תוכן בעברית
    switch (route) {
      case '/':
        title = 'Sacker Manufactures - ייצור אופנה פרימיום מאז 1994';
        description = 'למעלה מ-30 שנות מומחיות מוכחת בייצור בגדים. אנו מספקים ייצור באיכות גבוהה ובזמן למותגי אופנה מובילים ברחבי העולם. הכנת גזרות, דגימות, ייצור ובקרת איכות.';
        image = `${siteUrl}/og-home.jpg`;
        break;
      case '/about':
        title = 'אודות - 30+ שנות מצוינות | Sacker Manufactures';
        description = 'למעלה משלושה עשורים, Sacker Manufactures היא השותפה האמינה של מותגי אופנה מובילים. למד על הצוות, הניסיון והערכים שמייחדים אותנו.';
        image = `${siteUrl}/og-about.jpg`;
        break;
      case '/services':
        title = 'השירותים שלנו - פתרונות ייצור מלאים | Sacker';
        description = 'הכנת גזרות ודגימות, ייצור בכמויות קטנות וגדולות, בקרת איכות פרימיום ושירותי גימור בגדים. פתרונות גמישים למותגי אופנה בכל הגדלים.';
        image = `${siteUrl}/og-services.jpg`;
        break;
      case '/portfolio':
        title = 'הפורטפוליו שלנו - הצצה לעבודה שלנו | Sacker Manufactures';
        description = 'מפריטי יוקרה ועד אופנה יומיומית. ראו איך עזרנו ל-500+ מותגים להשיג איכות ברמה עולמית. 100M+ פריטים יוצרו עם מחויבות ל-100% איכות.';
        image = `${siteUrl}/og-portfolio.jpg`;
        break;
      case '/contact':
        title = 'צור קשר - התחל את מסע הייצור שלך | Sacker';
        description = 'מוכן להעלות את המותג שלך? צור קשר עם Sacker Manufactures היום. טלפון: 050-2197105 | קו ישיר למנכ"ל לשיתופי פעולה פרימיום. זמינים א\'-ה\': 9:00 - 18:00.';
        image = `${siteUrl}/og-contact.jpg`;
        break;
      case '/terms':
        title = 'תקנון האתר - Sacker Manufactures';
        description = 'תנאים והגבלות לשימוש באתר Sacker Manufactures. אנא קרא בעיון לפני השימוש בשירותים שלנו.';
        image = `${siteUrl}/logo.png`;
        break;
      case '/privacy':
        title = 'מדיניות פרטיות - Sacker Manufactures';
        description = 'כיצד Sacker Manufactures אוספת, משתמשת ומגינה על המידע האישי שלך. הפרטיות שלך חשובה לנו.';
        image = `${siteUrl}/logo.png`;
        break;
      case '/accessibility':
        title = 'הצהרת נגישות - Sacker Manufactures';
        description = 'המחויבות שלנו להנגשת אתר Sacker Manufactures לכל המשתמשים. למד על תכונות הנגישות שלנו.';
        image = `${siteUrl}/logo.png`;
        break;
      default:
        title = `Sacker Manufactures - ${route.replace(/\//g, ' ').trim()}`;
        description = `מידע על ${route.replace(/\//g, ' ').trim()} ב-Sacker Manufactures.`;
        image = `${siteUrl}/logo.png`;
    }
  } else {
    // תוכן באנגלית
    switch (route) {
      case '/':
        title = 'Sacker Manufactures - Premium Clothing Manufacturing Since 1994';
        description = 'Over 30 years of proven expertise in clothing manufacturing. We deliver high-quality, on-time production for leading fashion brands worldwide. Pattern making, sampling, production & quality control.';
        image = `${siteUrl}/og-home.jpg`;
        break;
      case '/about':
        title = 'About Us - 30+ Years of Excellence | Sacker Manufactures';
        description = 'For over three decades, Sacker Manufactures has been the trusted partner of leading fashion brands. Learn about our team, experience, and values that set us apart.';
        image = `${siteUrl}/og-about.jpg`;
        break;
      case '/services':
        title = 'Our Services - Full Suite Manufacturing Solutions | Sacker';
        description = 'Pattern Making & Sampling, Small & Large Production Runs, Premium Quality Control, and Garment Refinish services. Flexible solutions for fashion brands of all sizes.';
        image = `${siteUrl}/og-services.jpg`;
        break;
      case '/portfolio':
        title = 'Our Portfolio - A Glimpse of Our Work | Sacker Manufactures';
        description = 'From luxury garments to everyday apparel. See how we\'ve helped 500+ brands achieve world-class quality. 100M+ garments produced with 100% quality commitment.';
        image = `${siteUrl}/og-portfolio.jpg`;
        break;
      case '/contact':
        title = 'Contact Us - Start Your Production Journey | Sacker';
        description = 'Ready to elevate your brand? Contact Sacker Manufactures today. Phone: 050-2197105 | Direct line to CEO for premium collaborations. Available Sun-Thu: 9AM - 6PM.';
        image = `${siteUrl}/og-contact.jpg`;
        break;
      case '/terms':
        title = 'Terms & Conditions - Sacker Manufactures';
        description = 'Terms and conditions for using the Sacker Manufactures website. Please read carefully before using our services.';
        image = `${siteUrl}/logo.png`;
        break;
      case '/privacy':
        title = 'Privacy Policy - Sacker Manufactures';
        description = 'How Sacker Manufactures collects, uses, and protects your personal information. Your privacy matters to us.';
        image = `${siteUrl}/logo.png`;
        break;
      case '/accessibility':
        title = 'Accessibility Statement - Sacker Manufactures';
        description = 'Our commitment to making the Sacker Manufactures website accessible to all users. Learn about our accessibility features.';
        image = `${siteUrl}/logo.png`;
        break;
      default:
        title = `Sacker Manufactures - ${route.replace(/\//g, ' ').trim()}`;
        description = `Information about ${route.replace(/\//g, ' ').trim()} at Sacker Manufactures.`;
        image = `${siteUrl}/logo.png`;
    }
  }

  const url = `${siteUrl}${langPrefix}${route}`;
  const altUrl = `${siteUrl}${altLangPrefix}${route}`;
  const htmlLang = lang === 'he' ? 'he' : 'en';
  const htmlDir = lang === 'he' ? 'rtl' : 'ltr';

  return {
    metaTags: `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">
    <link rel="alternate" hreflang="${lang === 'he' ? 'en' : 'he'}" href="${altUrl}">
    <link rel="alternate" hreflang="x-default" href="${siteUrl}${route}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Sacker Manufactures">
    <meta name="keywords" content="clothing manufacturing, garment production, fashion manufacturing, pattern making, sampling, quality control, Israel manufacturing, ייצור בגדים, ייצור אופנה, הכנת גזרות">

    <!-- OpenGraph -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Sacker Manufactures">
    <meta property="og:locale" content="${lang === 'he' ? 'he_IL' : 'en_US'}">
    <meta property="og:locale:alternate" content="${lang === 'he' ? 'en_US' : 'he_IL'}">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    
    ${generateSchema(route, lang)}
  `,
    htmlLang,
    htmlDir
  };
}

// Start a simple HTTP server to serve the built files
function startServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const urlPath = req.url.split('?')[0];
      let filePath = join(distDir, urlPath === '/' ? 'index.html' : urlPath);
      if (!existsSync(filePath) || (!filePath.includes('.') && !urlPath.endsWith('/'))) {
        filePath = join(distDir, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const contentType = {
          'html': 'text/html; charset=utf-8',
          'js': 'application/javascript',
          'css': 'text/css',
          'json': 'application/json',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'svg': 'image/svg+xml',
          'webp': 'image/webp',
          'ico': 'image/x-icon',
          'woff': 'font/woff',
          'woff2': 'font/woff2',
          'ttf': 'font/ttf',
        }[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } catch (err) {
        if (!urlPath.includes('.')) {
          try {
            const indexContent = readFileSync(join(distDir, 'index.html'));
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(indexContent);
          } catch {
            res.writeHead(404);
            res.end('Not found');
          }
        } else {
          res.writeHead(404);
          res.end('Not found');
        }
      }
    });

    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('Starting prerender process...');
  if (!existsSync(distDir)) {
    console.log('Building the app first...');
    execSync('npm run build', { stdio: 'inherit', cwd: rootDir });
  }

  const port = 5000;
  const server = await startServer(port);
  const baseUrl = `http://localhost:${port}`;

  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // תהליך לשתי השפות
    const languages = ['en', 'he'];

    for (const lang of languages) {
      console.log(`\n=== Processing ${lang.toUpperCase()} pages ===`);
      
      for (const route of routes) {
        try {
          // בניית ה-URL הנכון
          const urlPath = lang === 'he' ? `/he${route === '/' ? '' : route}` : route;
          console.log(`Prerendering: ${urlPath}`);
          
          await page.goto(`${baseUrl}${urlPath}`, {
            waitUntil: 'networkidle0',
            timeout: 30000,
          });

          await new Promise(resolve => setTimeout(resolve, 1000));

          let html = await page.content();

          // קבלת המטא טאגים והשפה
          const { metaTags, htmlLang, htmlDir } = generateMetaTags(route, lang);

          // ✅ תיקון lang ו-dir ב-HTML tag
          html = html.replace(/<html[^>]*>/i, `<html lang="${htmlLang}" dir="${htmlDir}">`);

          // ✅ הסרת כל המטא טאגים הקיימים
          html = html.replace(/<title>.*?<\/title>/gis, '');
          html = html.replace(/<meta\s+name="description"[^>]*>/gi, '');
          html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
          html = html.replace(/<link\s+rel="alternate"[^>]*>/gi, '');
          html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '');
          html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');
          html = html.replace(/<meta\s+name="robots"[^>]*>/gi, '');
          html = html.replace(/<meta\s+name="author"[^>]*>/gi, '');
          html = html.replace(/<meta\s+name="keywords"[^>]*>/gi, '');
          html = html.replace(/<script\s+type="application\/ld\+json"[^>]*>.*?<\/script>/gis, '');
          
          // ניקוי הערות
          html = html.replace(/<!--\s*OpenGraph\s*-->/gi, '');
          html = html.replace(/<!--\s*Twitter Card\s*-->/gi, '');
          html = html.replace(/(<head[^>]*>[\s\S]*?)(\n\s*\n){3,}/gi, '$1\n\n');

          // ✅ הוספת Meta Tags + Schema חדשים
          html = html.replace(/<head>/, `<head>\n${metaTags}`);

          // קביעת נתיב הקובץ
          let filePath;
          if (lang === 'he') {
            if (route === '/') {
              const heDir = join(distDir, 'he');
              mkdirSync(heDir, { recursive: true });
              filePath = join(heDir, 'index.html');
            } else {
              const routePath = route.endsWith('/') ? route.slice(0, -1) : route;
              const dir = join(distDir, 'he', routePath);
              mkdirSync(dir, { recursive: true });
              filePath = join(dir, 'index.html');
            }
          } else {
            if (route === '/') {
              filePath = join(distDir, 'index.html');
            } else {
              const routePath = route.endsWith('/') ? route.slice(0, -1) : route;
              const dir = join(distDir, routePath);
              mkdirSync(dir, { recursive: true });
              filePath = join(dir, 'index.html');
            }
          }

          writeFileSync(filePath, html);
          console.log(`✓ Saved: ${filePath}`);
        } catch (error) {
          console.error(`✗ Error prerendering ${route} (${lang}):`, error.message);
        }
      }
    }

    await browser.close();
    console.log('\n✓ Prerendering complete for both languages!');
  } catch (error) {
    console.error('Prerender error:', error);
    process.exit(1);
  } finally {
    server.close();
  }
}

prerender();