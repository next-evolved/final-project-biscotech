Nate Portfolio (Final Project)

Production: https://portfolio.rubicklabs.com

A Next.js 15 (App Router) portfolio with projects carousel, articles + comments, NextAuth (Credentials), contact form with DB + email, and a weather forecast badge via a custom hook.

Demo Login

Email: demo@example.com
Password: demo1234
(Use “Create account” to register your own.)

Tech Stack

-Next.js 15 (App Router) + React 18
-Tailwind CSS
-NextAuth v4 (Credentials)
-Prisma + PostgreSQL (Neon)
-next/image + next/font
-Nodemailer (Gmail)

Features (Rubric Map)

-Next.js Configuration: App Router, standard structure, server components.
-Tailwind Styling: Tailwind across all pages/components.
-Optimized Fonts & Images: next/font + next/image (hero, carousel).
-Linking & Navigation: Navbar + Link between Home, Projects, Articles, Sign in/Sign up.
-Authorized DB Interaction: Comments CRUD requires auth; owner-only edit/delete; contact form saves to DB.
-Streaming: app/articles/[slug]/loading.tsx loading state.
-Server Actions: Comments (create/update/delete) and contact form use server actions with error handling + redirects.
-NextAuth: Credentials provider, sign in/out, auto sign-up sign-in flow.
-Project Carousel: DB-backed carousel swaps items with links/iframes.
-Forecast Custom Hook: useForecast fetches NWS forecast; navbar badge shows current period. Optional geolocation.