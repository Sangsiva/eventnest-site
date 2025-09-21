# Dev Todo - Wedding Platform Issues and Fixes

## Current Error
- **404 Page Not Found on Netlify**: The site shows Netlify's default 404 page for certain URLs (e.g., vendor profile pages). This occurs because the APIs fail to connect to the database in production, but the pages should still exist. The root cause is using SQLite locally, which doesn't work in Netlify's serverless environment (no persistent file system).

## Fixes Applied
- Fixed TypeScript error in `photographers/tamilnadu/[vendorSlug]/page.tsx`: Updated error state to `string | null` and handled unknown error type in catch block.
- Fixed API routes to search vendors by `slug` instead of `id`:
  - `api/vendor/[vendor]/route.ts`
  - `api/contact-inquiries/route.ts`
- Uncommented `packages` include in vendor API.
- Regenerated Prisma client types.

## Next Steps
1. **Set up External Database**:
   - Choose a database provider (e.g., MySQL on PlanetScale, AWS RDS, or PostgreSQL on Supabase/Neon).
   - Create a database instance.
   - Update Prisma schema:
     ```
     datasource db {
       provider = "mysql"  // or "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
   - Set `DATABASE_URL` environment variable in Netlify (build settings) to the connection string.

2. **Migrate Database**:
   - Run `npx prisma migrate deploy` in Netlify build command (after `npm run build`).
   - Seed the database with vendor data using the seed script.

3. **Redeploy on Netlify**:
   - Trigger a new build after setting up the DB and env vars.
   - Test vendor pages (e.g., /photographers/tamilnadu/some-slug) to ensure they load data instead of showing 404.

4. **Local Development**:
   - Set `DATABASE_URL` in `.env.local` to match the external DB for consistent dev/prod setup.
   - Or keep SQLite locally and switch schema for production (not recommended).

5. **Additional Checks**:
   - Ensure all vendor data has valid slugs.
   - Verify API responses in production.
   - Monitor Netlify build logs for any remaining errors.

## Notes
- The build succeeds locally, but production APIs fail without a proper DB.
- If using MySQL, ensure compatibility with Prisma.
- Test contact form submissions after DB setup.
