# Google OAuth Token Fetcher

Minimal Next.js App Router application that authenticates a user with Google
OAuth 2.0 and downloads the token response as a JSON file.

**No database. No token storage. No Google API calls.**
The only output is `google-tokens.json` saved to your computer.

## Setup

### 1. Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or select an existing one)
3. Navigate to **APIs & Services → OAuth consent screen**
4. Choose **External** (or Internal if you use Google Workspace)
5. Fill in the required fields (app name, support email, etc.)
6. Add the scope(s) you need (e.g., `https://www.googleapis.com/auth/youtube.readonly`)
7. Add your email as a test user
8. Navigate to **APIs & Services → Credentials**
9. Click **Create Credentials → OAuth 2.0 Client ID**
10. Application type: **Web application**
11. Add **Authorized JavaScript origins**: `http://localhost:3000`
12. Add **Authorized redirect URIs**: `http://localhost:3000/api/callback`
13. Click **Create** and copy the **Client ID** and **Client Secret**

### 2. Environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your Client ID and Client Secret.

### 3. Install and run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), click **Connect Google
Account**, sign in, and the tokens will download automatically.

## Note on Babel

This project includes a `.babelrc` that forces Next.js to use Babel instead of
SWC, because the SWC native binary crashes with a bus error on older CPUs
(e.g. Intel Skylake). It only affects the local build — Vercel's build servers
can handle SWC fine. Do not delete `.babelrc` or the `@babel/runtime`
dependency unless you know your CPU is compatible.

## Deploy to Vercel

```bash
# Deploy (even without env vars — the app won't crash on startup)
vercel

# Vercel prints a URL like https://project-xxx.vercel.app
# Copy it, then add it to Google Cloud Console:
#   - Authorized JavaScript origins: https://project-xxx.vercel.app
#   - Authorized redirect URIs:   https://project-xxx.vercel.app/api/callback

# Set environment variables
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET

# IMPORTANT: pin the callback URL. Vercel's auto-set VERCEL_URL changes with
# every deployment, which would break OAuth (redirect_uri_mismatch).
vercel env add REDIRECT_URI   # value: https://your-app.vercel.app/api/callback

# Redeploy to production
vercel --prod
```

The redirect URI is auto-detected from Vercel's `VERCEL_URL` environment
variable when `REDIRECT_URI` is not set, but this only works for the first
deployment — always set `REDIRECT_URI` explicitly on Vercel to keep the URL
stable across deployments. For local development, it defaults to
`http://localhost:3000/api/callback`.

## Configuration

| Variable | Required | Default | Description |
|---|---|---|---|
| `GOOGLE_CLIENT_ID` | Yes | – | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | – | Google OAuth client secret |
| `OAUTH_SCOPES` | No | YouTube Data readonly | Comma- or space-separated scopes |
| `REDIRECT_URI` | No | Auto-detected | Override the OAuth callback URL |

## Output

The downloaded `google-tokens.json` contains the full OAuth token response:

```json
{
  "access_token": "ya29...",
  "refresh_token": "1//...",
  "scope": "https://www.googleapis.com/auth/youtube.readonly",
  "token_type": "Bearer",
  "expiry_date": 1700000000000
}
```

## fetch-youtube.js (YouTube Data CLI)

A standalone script for fetching video info without OAuth (uses an API key).

**The API key lives only in `.env.local`** (gitignored, never committed). Load
it into the environment before running the script:

```bash
# in the project root — the script reads .env.local itself
node fetch-youtube.js <video-url-or-id>
node fetch-youtube.js --search "query" [--max 10]
node fetch-youtube.js --shorts "@handle" [--max 30]
```

If you get "Set the YOUTUBE_API_KEY environment variable first", recreate
`.env.local` with `YOUTUBE_API_KEY=<your key>` (copy `.env.example` for the
other fields).
