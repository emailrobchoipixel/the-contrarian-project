import type { Context } from "https://edge.netlify.com";

const articleMetadata: Record<string, { title: string; description: string; image: string }> = {
  'dei-article': {
    title: 'DEI Persists Because No One Pays for It Failing — Only for Questioning It',
    description: 'Diversity, Equity, and Inclusion (DEI) programs persist not because they deliver measurable results, but because the incentive structure surrounding them ensures that no one with decision-making power bears the cost of their failure.',
    image: 'https://images.unsplash.com/photo-1598962689458-f705dc20e578?w=1200&q=80'
  },
  'inequality-article': {
    title: 'Op-ed: What "Inequality" Really Means in America—and What Leaders Must Change',
    description: '"Inequality" has become the default explanation for nearly every difference in outcome in the United States. Yet many of the disparities now described as inequality are not produced by markets at all.',
    image: 'https://images.unsplash.com/photo-1761001315871-b1f7650a6303?w=1200&q=80'
  },
  'public-admin-accountability': {
    title: 'Process Without Outcomes: Why Public Administration Protects Programs That Cannot Prove They Work',
    description: 'From DEI initiatives to charter schools, government systems excel at producing activity while remaining weak at owning consequences when those systems fail.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80'
  },
  'trump-governance': {
    title: 'Power, Order, and Numbers: Three Areas Where Trump Governs Effectively',
    description: 'Much of the public debate about Donald Trump never reaches the level where government authority actually operates. A more useful approach is to look at where federal power is exercised directly.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80'
  }
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if this is a social media crawler
  const isCrawler = /facebookexternalhit|facebot|twitterbot|LinkedInBot|WhatsApp|TelegramBot|Slackbot|Discordbot|ia_archiver/i.test(userAgent);
  
  // Check if this is an article page
  const articleMatch = url.pathname.match(/\/article\/([^\/]+)/);
  
  if (isCrawler && articleMatch) {
    const articleId = articleMatch[1];
    const meta = articleMetadata[articleId];
    
    if (meta) {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title} | The Contrarian Project</title>
  <meta name="description" content="${meta.description}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url.href}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${meta.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="The Contrarian Project">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${url.href}">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${meta.image}">
  
  <meta http-equiv="refresh" content="0; url=${url.href}">
</head>
<body>
  <h1>${meta.title}</h1>
  <p>${meta.description}</p>
</body>
</html>`;
      
      return new Response(html, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
        },
      });
    }
  }
  
  // For regular users, continue to the normal site
  return context.next();
};

export const config = { path: "/*" };
