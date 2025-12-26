# Newsletter Setup Instructions

## Quick Setup (5 minutes total)

### Step 1: Get Your Resend API Key (2 minutes)

1. Go to [resend.com](https://resend.com)
2. Click "Start Building" (free - 3,000 emails/month, no credit card needed)
3. Verify your email
4. Once logged in, click "API Keys" in the left sidebar
5. Click "Create API Key"
6. Give it a name like "The Contrarian Newsletter"
7. **Copy the API key** (starts with `re_...`)

### Step 2: Add API Key to Supabase (30 seconds)

1. Go to your Supabase project dashboard
2. Click **"Edge Functions"** in the left sidebar
3. Click the **"Secrets"** tab
4. Click **"Add New Secret"**
5. Enter:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Paste the API key you copied (starts with `re_...`)
6. Click **"Save"**

### Step 3: Test the Newsletter (30 seconds)

1. Go to your Admin Dashboard at `/admin`
2. Click the big **"SEND NEWSLETTER NOW"** button
3. You should see "✓ Newsletter sent successfully!"
4. Check your subscriber email inbox - the newsletter should arrive instantly

---

## Optional: Automate Every 2 Weeks (2 minutes)

If you want the newsletter to send automatically without clicking the button:

1. Go to [cron-job.org](https://cron-job.org) (free)
2. Create a free account
3. Click **"Create Cronjob"**
4. Fill in:
   - **Title:** The Contrarian Newsletter
   - **Schedule:** Every 2 weeks (or "0 9 */14 * *" for every 2 weeks at 9am)
   - **URL:** `https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-0c5dc391/send-newsletter`
   - **Request Method:** POST
5. Click **"Save"**

**Done!** Your newsletter will now send automatically every 2 weeks.

---

## What the Newsletter Includes

- **Branding:** "THE CONTRARIAN" header with "OUTCOMES NOT INTENTIONS" tagline
- **Top 3 Articles:** Automatically pulls the 3 most-read articles from the past 2 weeks
- **Each Article Shows:**
  - Category badge (e.g., "POLICY", "ECONOMICS")
  - Article title
  - Excerpt
  - "READ MORE →" button linking to your website
- **Clean Design:** Professional HTML email that works on all devices

---

## Troubleshooting

**Newsletter won't send?**
- Make sure `RESEND_API_KEY` is added to Supabase Edge Functions Secrets
- Make sure you have at least 1 subscriber
- Make sure some articles have been viewed (so there's top 3 data)

**Emails not arriving?**
- Check spam folder
- Verify the subscriber email is correct
- Check Resend dashboard for delivery status

**Want to verify Resend domain?**
- By default, emails come from `newsletter@thecontrarian.info`
- To use your own domain, verify it in Resend dashboard (optional, improves deliverability)

---

## Need Help?

The system is now fully functional. Just add your Resend API key and you're ready to send newsletters!
