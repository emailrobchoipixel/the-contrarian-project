import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Article metadata for social sharing
const articleMetadata: { [key: string]: { title: string; description: string; image: string; url: string } } = {
  'dei-article': {
    title: 'DEI Persists Because No One Pays for It Failing — Only for Questioning It',
    description: 'Diversity, Equity, and Inclusion (DEI) programs persist not because they deliver measurable results, but because the incentive structure surrounding them ensures that no one with decision-making power bears the cost of their failure.',
    image: 'https://images.unsplash.com/photo-1598962689458-f705dc20e578?w=1200&q=80',
    url: 'https://www.thecontrarian.info/article/dei-article'
  },
  'inequality-article': {
    title: 'Op-ed: What "Inequality" Really Means in America—and What Leaders Must Change',
    description: '"Inequality" has become the default explanation for nearly every difference in outcome in the United States. Yet many of the disparities now described as inequality are not produced by markets at all.',
    image: 'https://images.unsplash.com/photo-1761001315871-b1f7650a6303?w=1200&q=80',
    url: 'https://www.thecontrarian.info/article/inequality-article'
  },
  'public-admin-accountability': {
    title: 'Process Without Outcomes: Why Public Administration Protects Programs That Cannot Prove They Work',
    description: 'From DEI initiatives to charter schools, government systems excel at producing activity while remaining weak at owning consequences when those systems fail.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    url: 'https://www.thecontrarian.info/article/public-admin-accountability'
  },
  'trump-governance': {
    title: 'Power, Order, and Numbers: Three Areas Where Trump Governs Effectively',
    description: 'Much of the public debate about Donald Trump never reaches the level where government authority actually operates. A more useful approach is to look at where federal power is exercised directly.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80',
    url: 'https://www.thecontrarian.info/article/trump-governance'
  }
};

// Middleware to detect social media crawlers and serve proper HTML
app.use('*', async (c, next) => {
  const userAgent = c.req.header('user-agent') || '';
  const url = new URL(c.req.url);
  
  // Check if this is a social media crawler
  const isCrawler = /facebookexternalhit|twitterbot|LinkedInBot|WhatsApp|TelegramBot|Slackbot|Discordbot|facebot|ia_archiver/i.test(userAgent);
  
  // Check if this is an article page
  const articleMatch = url.pathname.match(/\/article\/([^\/]+)/);
  
  if (isCrawler && articleMatch) {
    const articleId = articleMatch[1];
    const meta = articleMetadata[articleId];
    
    if (meta) {
      // Serve HTML with Open Graph tags for crawlers
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title} | The Contrarian Project</title>
  <meta name="description" content="${meta.description}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${meta.url}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${meta.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="The Contrarian Project">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${meta.url}">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${meta.image}">
  
  <meta http-equiv="refresh" content="0; url=${meta.url}">
</head>
<body>
  <h1>${meta.title}</h1>
  <p>${meta.description}</p>
  <p><a href="${meta.url}">Read full article</a></p>
</body>
</html>`;
      
      return c.html(html);
    }
  }
  
  // For non-crawlers or non-article pages, continue to next handler
  await next();
});

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-0c5dc391/health", (c) => {
  return c.json({ status: "ok" });
});

// Subscribe to newsletter
app.post("/make-server-0c5dc391/subscribe", async (c) => {
  try {
    const { email, preferences } = await c.req.json();
    
    if (!email || !email.includes('@')) {
      return c.json({ error: "Valid email is required" }, 400);
    }
    
    const subscriberKey = `subscriber:${email}`;
    
    // Check if already subscribed
    const existing = await kv.get(subscriberKey);
    if (existing) {
      return c.json({ 
        message: "You're already subscribed!",
        alreadySubscribed: true 
      });
    }
    
    // Save subscriber
    await kv.set(subscriberKey, {
      email,
      preferences: preferences || [],
      subscribedAt: new Date().toISOString(),
      active: true
    });
    
    // Send welcome email
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (resendApiKey) {
      try {
        const welcomeEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to The Contrarian Project</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="padding: 40px 20px 20px; text-align: center; border-bottom: 2px solid #000000;">
        <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; color: #000000;">THE CONTRARIAN PROJECT</h1>
      </td>
    </tr>
    
    <!-- Welcome Message -->
    <tr>
      <td style="padding: 40px 20px;">
        <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 700; color: #000000;">Welcome!</h2>
        <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #333333;">
          Thank you for subscribing to <strong>The Contrarian Project</strong>. You'll receive our newsletter every two weeks featuring our most-read articles on policy, culture, and economics.
        </p>
        <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #333333;">
          We publish outcome-driven analysis and commentary on policy, economics, public administration, and culture.
        </p>
        <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #333333;">
          In the meantime, explore our latest articles:
        </p>
        <a href="https://www.thecontrarian.info" 
           style="display: inline-block; padding: 12px 24px; background-color: #000000; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">
          VISIT THE CONTRARIAN PROJECT →
        </a>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="padding: 40px 20px; text-align: center; border-top: 1px solid #e0e0e0;">
        <p style="margin: 0 0 8px; font-size: 14px; color: #666666;">
          You subscribed with: ${email}
        </p>
        <p style="margin: 0; font-size: 14px; color: #666666;">
          <a href="https://www.thecontrarian.info" style="color: #000000; text-decoration: underline;">thecontrarian.info</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
        `;

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'The Contrarian Project <robertchoi@thecontrarian.info>',
            to: email,
            subject: 'Welcome to The Contrarian Project',
            html: welcomeEmailHtml
          })
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json();
          console.error('Failed to send welcome email:', errorData);
          // Don't fail the subscription if email fails
        } else {
          console.log(`Welcome email sent to ${email}`);
        }
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't fail the subscription if email fails
      }
    } else {
      console.log('RESEND_API_KEY not configured - skipping welcome email');
    }
    
    return c.json({ 
      message: "Successfully subscribed!",
      email,
      preferences 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return c.json({ error: "Failed to subscribe" }, 500);
  }
});

// Get all subscribers (for admin use)
app.get("/make-server-0c5dc391/subscribers", async (c) => {
  try {
    let subscribers;
    try {
      console.log('Fetching subscribers with prefix: "subscriber:"');
      subscribers = await kv.getByPrefix("subscriber:");
      console.log('Raw subscribers result:', subscribers);
      console.log('Subscribers array length:', subscribers?.length);
      if (subscribers && subscribers.length > 0) {
        console.log('First subscriber raw:', subscribers[0]);
      }
    } catch (kvError) {
      console.error('KV getByPrefix error:', kvError);
      return c.json({ 
        count: 0, 
        subscribers: [],
        note: "Database is initializing"
      });
    }
    
    // getByPrefix returns the values directly, not objects with .value property
    const validSubscribers = subscribers
      .filter(sub => sub && sub.email && typeof sub.email === 'string');
    
    console.log(`Returning ${validSubscribers.length} valid subscribers out of ${subscribers.length} total`);
    
    return c.json({ 
      count: validSubscribers.length,
      subscribers: validSubscribers
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return c.json({ error: "Failed to fetch subscribers" }, 500);
  }
});

// Track article view
app.post("/make-server-0c5dc391/track-view", async (c) => {
  try {
    const { articleId } = await c.req.json();
    
    if (!articleId) {
      return c.json({ error: "Article ID is required" }, 400);
    }
    
    // Get current view data with error handling
    const viewKey = `article-views:${articleId}`;
    let existing;
    
    try {
      existing = await kv.get(viewKey);
    } catch (kvError) {
      console.error(`KV get error for ${viewKey}:`, kvError);
      // If database isn't ready, just return success to avoid breaking the UI
      return c.json({ success: true, views: 1, note: "Database initializing" });
    }
    
    const now = new Date().toISOString();
    let viewData;
    
    if (existing) {
      viewData = {
        articleId,
        totalViews: existing.totalViews + 1,
        lastViewed: now,
        viewHistory: [...(existing.viewHistory || []), now].slice(-100) // Keep last 100 views
      };
    } else {
      viewData = {
        articleId,
        totalViews: 1,
        lastViewed: now,
        viewHistory: [now]
      };
    }
    
    try {
      await kv.set(viewKey, viewData);
    } catch (kvError) {
      console.error(`KV set error for ${viewKey}:`, kvError);
      // Even if save fails, return success to avoid breaking the UI
      return c.json({ success: true, views: viewData.totalViews, note: "Database initializing" });
    }
    
    return c.json({ success: true, views: viewData.totalViews });
  } catch (error) {
    console.error('View tracking error:', error);
    // Return success even on error to avoid breaking the frontend
    return c.json({ success: true, views: 1, note: "Tracking temporarily unavailable" });
  }
});

// Get top articles from last 2 weeks
app.get("/make-server-0c5dc391/top-articles", async (c) => {
  try {
    let allViews;
    try {
      allViews = await kv.getByPrefix("article-views:");
    } catch (kvError) {
      console.error('KV getByPrefix error for top articles:', kvError);
      return c.json({ 
        topArticles: [],
        note: "Database is initializing"
      });
    }
    
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    // Calculate views in last 2 weeks for each article
    // getByPrefix returns values directly, not objects with .value property
    const articleStats = allViews
      .filter(viewData => viewData && viewData.articleId) // Filter out any undefined or null items
      .map(viewData => {
        const recentViews = (viewData.viewHistory || []).filter(
          (timestamp: string) => new Date(timestamp) >= twoWeeksAgo
        ).length;
        
        return {
          articleId: viewData.articleId,
          totalViews: viewData.totalViews || 0,
          recentViews: recentViews,
          lastViewed: viewData.lastViewed || new Date().toISOString()
        };
      });
    
    // Sort by recent views and get top 3
    const topThree = articleStats
      .sort((a, b) => b.recentViews - a.recentViews)
      .slice(0, 3);
    
    return c.json({ topArticles: topThree });
  } catch (error) {
    console.error('Error fetching top articles:', error);
    return c.json({ topArticles: [], error: "Failed to fetch top articles" });
  }
});

// Update subscriber preferences
app.put("/make-server-0c5dc391/preferences", async (c) => {
  try {
    const { email, preferences } = await c.req.json();
    
    if (!email || !preferences || !Array.isArray(preferences)) {
      return c.json({ error: "Email and preferences array are required" }, 400);
    }
    
    const subscriber = await kv.get(`subscriber:${email}`);
    if (!subscriber) {
      return c.json({ error: "Subscriber not found" }, 404);
    }
    
    subscriber.preferences = preferences;
    subscriber.updatedAt = new Date().toISOString();
    
    await kv.set(`subscriber:${email}`, subscriber);
    
    return c.json({ success: true, message: "Preferences updated" });
  } catch (error) {
    console.error('Preferences update error:', error);
    return c.json({ error: "Failed to update preferences" }, 500);
  }
});

// Remove/unsubscribe a subscriber
app.delete("/make-server-0c5dc391/subscriber/:email", async (c) => {
  try {
    const email = c.req.param('email');
    
    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }
    
    const subscriberKey = `subscriber:${email}`;
    
    // Check if subscriber exists
    const existing = await kv.get(subscriberKey);
    if (!existing) {
      return c.json({ error: "Subscriber not found" }, 404);
    }
    
    // Delete the subscriber
    await kv.del(subscriberKey);
    
    console.log(`Removed subscriber: ${email}`);
    
    return c.json({ 
      success: true, 
      message: "Subscriber removed successfully" 
    });
  } catch (error) {
    console.error('Subscriber removal error:', error);
    return c.json({ error: "Failed to remove subscriber" }, 500);
  }
});

// Fetch news articles from NewsAPI
app.get("/make-server-0c5dc391/news", async (c) => {
  try {
    const apiKey = Deno.env.get('NEWS_API_KEY');
    
    if (!apiKey) {
      console.error('NEWS_API_KEY not configured');
      return c.json({ articles: [], error: "News API not configured" }, 500);
    }
    
    // Fetch news for our specific topics with more targeted queries
    // Using multiple focused searches to get better topic match
    const queries = [
      '("public policy" OR "government policy" OR "policy reform" OR "regulatory policy")',
      '("economic policy" OR "economic analysis" OR "inequality" OR "labor economics")',
      '("cultural commentary" OR "social policy" OR "education policy" OR "identity politics")'
    ];
    
    const query = queries.join(' OR ');
    
    // Only pull from major English-language news sources
    const domains = [
      'apnews.com',
      'abcnews.go.com',
      'cbsnews.com',
      'nbcnews.com',
      'npr.org',
      'pbs.org',
      'reuters.com',
      'vox.com',
      'axios.com',
      'bbc.com',
      'washingtonpost.com',
      'nytimes.com',
      'theguardian.com',
      'wsj.com',
      'politico.com',
      'theatlantic.com'
    ].join(',');
    
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&domains=${domains}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`NewsAPI error: ${response.status} ${response.statusText}`);
      const errorData = await response.json();
      console.error('NewsAPI error details:', errorData);
      return c.json({ articles: [], error: "Failed to fetch news" }, response.status);
    }
    
    const data = await response.json();
    
    // Filter and format articles
    const articles = (data.articles || [])
      .filter((article: any) => {
        if (!article.title || !article.url || !article.urlToImage) return false;
        // Additional check to ensure English content
        if (article.title.match(/[\u4e00-\u9fa5]|[\u3040-\u309f]|[\u30a0-\u30ff]/)) return false;
        return true;
      })
      .map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        source: article.source.name,
        publishedAt: article.publishedAt
      }))
      .slice(0, 6);
    
    return c.json({ articles });
  } catch (error) {
    console.error('News fetch error:', error);
    return c.json({ articles: [], error: "Failed to fetch news" }, 500);
  }
});

// Send biweekly newsletter with top 3 articles
app.post("/make-server-0c5dc391/send-newsletter", async (c) => {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return c.json({ 
        error: "Email service not configured. Please add your Resend API key to environment variables." 
      }, 500);
    }

    // Article metadata
    const articleData: { [key: string]: { title: string; excerpt: string; category: string } } = {
      'trump-governance': {
        title: 'Power, Order, and Numbers: Three Areas Where Trump Governs Effectively',
        excerpt: 'Much of the public debate about Donald Trump never reaches the level where government authority actually operates. A more useful approach is to look at where federal power is exercised directly and whether outcomes move in measurable ways.',
        category: 'Policy'
      },
      'public-admin-accountability': {
        title: 'Process Without Outcomes: Why Public Administration Protects Programs That Cannot Prove They Work',
        excerpt: 'From DEI initiatives to charter schools, government systems excel at producing activity while remaining weak at owning consequences when those systems fail.',
        category: 'Policy'
      },
      'dei-article': {
        title: 'DEI Persists Because No One Pays for It Failing—Only for Questioning It in Public Institutions',
        excerpt: 'An examination of how institutional incentive structures ensure DEI programs continue regardless of outcomes, with consequences distributed to those who cannot refuse them.',
        category: 'Policy'
      },
      'inequality-article': {
        title: 'What "Inequality" Really Means in America Today—and What Leaders Must Change to Address It',
        excerpt: 'Many disparities now described as inequality are not produced by markets at all. They are produced by regulation and policy choices that restrict opportunity rather than expand it.',
        category: 'Economics'
      }
    };

    // Get top 3 articles from last 2 weeks
    let topArticlesData;
    try {
      const allViews = await kv.getByPrefix("article-views:");
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      
      // getByPrefix returns values directly, not objects with .value property
      const articleStats = allViews
        .filter(viewData => viewData && viewData.articleId) // Add safety filter
        .map(viewData => {
          const recentViews = (viewData.viewHistory || []).filter(
            (timestamp: string) => new Date(timestamp) >= twoWeeksAgo
          ).length;
          
          return {
            articleId: viewData.articleId,
            recentViews: recentViews
          };
        });
      
      topArticlesData = articleStats
        .sort((a, b) => b.recentViews - a.recentViews)
        .slice(0, 3)
        .filter(a => articleData[a.articleId]) // Only include articles we have data for
        .map(a => ({
          id: a.articleId,
          ...articleData[a.articleId]
        }));
    } catch (error) {
      console.error('Error fetching top articles for newsletter:', error);
      return c.json({ error: 'Failed to fetch top articles' }, 500);
    }

    if (topArticlesData.length === 0) {
      return c.json({ 
        error: 'No articles available for newsletter. Make sure articles have been viewed.' 
      }, 400);
    }

    // Get all active subscribers
    let subscribers;
    try {
      const allSubscribers = await kv.getByPrefix("subscriber:");
      // getByPrefix returns values directly, no need to map .value
      subscribers = allSubscribers
        .filter((s: any) => s && s.email); // Just check for email instead of active flag
      console.log(`Found ${subscribers.length} subscribers for newsletter`);
    } catch (error) {
      console.error('Error fetching subscribers for newsletter:', error);
      return c.json({ error: 'Failed to fetch subscribers' }, 500);
    }

    if (subscribers.length === 0) {
      return c.json({ 
        error: 'No active subscribers to send newsletter to.' 
      }, 400);
    }

    // Generate HTML email
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Contrarian Project - Top Articles</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="padding: 40px 20px 20px; text-align: center; border-bottom: 2px solid #000000;">
        <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; color: #000000;">THE CONTRARIAN PROJECT</h1>
      </td>
    </tr>
    
    <!-- Intro -->
    <tr>
      <td style="padding: 40px 20px 20px;">
        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333;">
          Here are the <strong>top 3 most-read articles</strong> from the past two weeks:
        </p>
      </td>
    </tr>
    
    <!-- Articles -->
    ${topArticlesData.map((article, index) => `
    <tr>
      <td style="padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; background-color: #ffffff;">
          <tr>
            <td style="padding: 24px;">
              <div style="display: inline-block; padding: 4px 12px; background-color: #000000; color: #ffffff; font-size: 12px; font-weight: 600; margin-bottom: 16px;">
                ${article.category.toUpperCase()}
              </div>
              <h2 style="margin: 0 0 12px; font-size: 20px; font-weight: 700; line-height: 1.3; color: #000000;">
                ${article.title}
              </h2>
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #555555;">
                ${article.excerpt}
              </p>
              <a href="https://www.thecontrarian.info/article/${article.id}" 
                 style="display: inline-block; padding: 12px 24px; background-color: #000000; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">
                READ MORE →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    `).join('')}
    
    <!-- Footer -->
    <tr>
      <td style="padding: 40px 20px; text-align: center; border-top: 1px solid #e0e0e0;">
        <p style="margin: 0 0 8px; font-size: 14px; color: #666666;">
          You're receiving this because you subscribed to The Contrarian Project.
        </p>
        <p style="margin: 0; font-size: 14px; color: #666666;">
          <a href="https://www.thecontrarian.info" style="color: #000000; text-decoration: underline;">Visit our website</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send emails via Resend using batch API (up to 100 recipients per batch)
    // This scales much better: 100 subscribers = 1 second, 1000 subscribers = 10 seconds
    const BATCH_SIZE = 100; // Resend's max batch size
    const batches = [];
    
    // Split subscribers into batches of 100
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      batches.push(subscribers.slice(i, i + BATCH_SIZE));
    }
    
    console.log(`Sending newsletter in ${batches.length} batch(es) to ${subscribers.length} subscribers`);
    
    let totalSent = 0;
    const allFailures = [];
    
    // Process each batch with rate limiting
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      
      try {
        const response = await fetch('https://api.resend.com/emails/batch', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            batch.map(subscriber => ({
              from: 'The Contrarian Project <robertchoi@thecontrarian.info>',
              to: subscriber.email,
              subject: 'The Contrarian - Top 3 Articles This Week',
              html: emailHtml
            }))
          )
        });
        
        if (response.ok) {
          const batchResult = await response.json();
          console.log(`Batch ${batchIndex + 1}/${batches.length}: Successfully sent to ${batch.length} subscribers`);
          totalSent += batch.length;
        } else {
          const errorData = await response.json();
          console.error(`Batch ${batchIndex + 1}/${batches.length} failed:`, errorData);
          
          // If batch fails, record all emails in that batch as failures
          batch.forEach(sub => {
            allFailures.push({ email: sub.email, error: errorData });
          });
        }
        
        // Wait 600ms between batches to respect rate limits
        if (batchIndex < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 600));
        }
        
      } catch (error) {
        console.error(`Error sending batch ${batchIndex + 1}/${batches.length}:`, error);
        batch.forEach(sub => {
          allFailures.push({ email: sub.email, error: error.message });
        });
      }
    }
    
    const successCount = totalSent;
    
    console.log(`Newsletter sent: ${successCount}/${subscribers.length} successful`);
    
    return c.json({ 
      success: true, 
      sent: successCount,
      total: subscribers.length,
      failures: allFailures.length > 0 ? allFailures : undefined,
      articles: topArticlesData.map(a => a.title)
    });
    
  } catch (error) {
    console.error('Newsletter send error:', error);
    return c.json({ error: `Failed to send newsletter: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);