# My Future Found

A modern web application built with Next.js, Supabase, and deployed on Netlify.

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Supabase
- **Styling**: Tailwind CSS
- **Deployment**: Netlify

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase URL and anonymous key

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The app is configured for automatic deployment to Netlify. Simply push to your main branch and Netlify will build and deploy automatically.

## Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the API settings
3. Add them to your `.env.local` file

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```