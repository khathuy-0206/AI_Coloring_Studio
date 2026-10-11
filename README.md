# 🎨 AI COLORING STUDIO

> **Cute, Soft, Pastel & Cozy AI Line-Art Coloring Studio**  
> An intuitive web application designed for coloring enthusiasts, artists, and educators to color line-art with AI, explore color palettes, and enjoy mindful coloring retreats.

---

## ✨ Features (Tính Năng Chính)

### 1. 🖌️ AI Coloring Studio (Core Engine)
- **Image Upload:** Supports PNG, JPG/JPEG, and SVG formats up to 10MB (drag-and-drop enabled).
- **Sample Line-Art Quick Pickers:** Pre-loaded line-arts (*Teacup Kitten*, *Sakura Bloom*, *Fairytale Mushroom*) for instant 1-click testing.
- **Line-Art Preservation:** Strict prompt architecture via `ColoringPromptBuilder` ensuring original contours, silhouettes, composition, and character details remain 100% intact.
- **Configurable Aesthetics:**
  - **Styles:** Cute, Kawaii, Pastel, Cozy, Anime, Watercolor, Vintage, Fantasy, Custom.
  - **Palettes:** Standard colors + 8 signature pastel palettes (*Lavender Dream*, *Strawberry Milk*, *Ocean Breeze*, *Sakura Garden*, *Cozy Autumn*, *Midnight Magic*, *Mint Lemonade*, *Peach Sorbet*).
  - **Atmosphere:** Mood (*Peaceful*, *Dreamy*, *Cozy*, etc.) and Lighting (*Daylight*, *Soft light*, *Golden hour*, *Warm indoor*, *Moonlight*).
  - **Color Harmony Modes:** AI harmony, strict palette, dominant accent, artistic contrast.
  - **Custom Instructions:** Natural language guidance (e.g., *"Brown hair, lilac dress, keep background light"*).
- **Interactive Before/After Slider:** Smooth drag comparison between original line-art and AI colored artwork.
- **Download & Generate Again:** High-resolution download and one-click regeneration without losing parameters.

### 2. 🌈 Creative Discovery & Community-Ready Hub
- **Daily Color Mood:** Fresh color concept of the day with quote and palette swatch copy.
- **Color Palette Library:** Browse palettes with instant HEX copy and direct "Use in Studio" button.
- **Coloring Inspiration Gallery:** Thematic concepts with pre-tuned styles ready to launch in Studio.
- **Weekly Coloring Challenges:** Creative constraints, deadlines, and participant tracking.
- **Freebies Corner:** Free SVG line-art downloads and direct Studio openers.
- **Learn to Color:** Guides on color theory, chromatic shading, and lighting mood.
- **Color Style Quiz:** Interactive 3-question quiz matching your personality to an aesthetic palette.
- **Cozy Corner & Audio:** Pure Web Audio API ambient sound mixer (Rain, Ocean, Fireplace, Stream) and focus timer (15/25/30 mins).
- **My Coloring Journal:** Personal gallery of completed creations with local storage persistence.

---

## 🛠️ Tech Stack (Công Nghệ)

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom pastel palette & soft shadows)
- **Database ORM:** Prisma ORM
- **Database:** SQLite (local development zero-config) / PostgreSQL (production cloud ready)
- **Icons:** Lucide React
- **Audio:** Web Audio API (Offline pink/brown noise synthesized ambience)
- **AI Integration:** Abstracted `AIImageService` with:
  - `MockAIImageService`: Zero-cost pastel watercolor renderer for local testing and verification.
  - `OpenAIImageService`: Image editing and generation integration via OpenAI API.

---

## 🚀 Getting Started (Hướng Dẫn Cài Đặt)

### 1. Prerequisites
- Node.js 18+ (tested on Node.js 24)
- npm or pnpm

### 2. Clone and Install
```bash
git clone <repository-url>
cd AI_Coloring_Studio
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (or copy from `.env.example`):

```env
# AI Provider: 'mock' (default zero-cost) or 'openai'
AI_PROVIDER=mock
AI_API_KEY=
AI_MODEL=dall-e-2

# Upload limit (MB)
MAX_UPLOAD_MB=10

# Database URL (SQLite for local dev, PostgreSQL for production)
DATABASE_URL="file:./dev.db"
```

> **Note on Mock Mode vs Real AI:**  
> When `AI_PROVIDER=mock` (or when no API key is specified), the application runs in **Mock Mode**, generating a beautiful pastel color wash that preserves your line art so you can test the entire workflow (upload -> configuration -> slider -> download -> journal) without API costs.

### 4. Initialize Database
Initialize the Prisma database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start coloring!

---

## 🏗️ Architecture Overview

```text
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── color/route.ts      # AI colorization API & DB persistence
│   │   │   └── projects/route.ts   # Project & generation history API
│   │   ├── studio/page.tsx         # Main AI Coloring Studio workspace
│   │   ├── inspiration/page.tsx    # Curated coloring inspirations
│   │   ├── palettes/page.tsx       # Color palette library
│   │   ├── challenges/page.tsx     # Weekly coloring challenges
│   │   ├── freebies/page.tsx       # Free line-art resources
│   │   ├── learn/page.tsx          # Color theory articles
│   │   ├── quiz/page.tsx           # Style & mood recommendation quiz
│   │   ├── cozy-corner/page.tsx    # Ambient sound generator & timer
│   │   ├── journal/page.tsx        # Saved creations journal
│   │   ├── globals.css             # Pastel styles & scrollbars
│   │   └── layout.tsx              # Root layout & navigation
│   ├── components/
│   │   ├── Navbar.tsx              # Responsive navbar & sound toggle
│   │   ├── Footer.tsx              # Cozy footer
│   │   └── studio/
│   │       ├── BeforeAfterSlider.tsx   # Interactive split-view slider
│   │       ├── ConfigurationPanel.tsx  # Style, palette, mood, lighting
│   │       └── ImageUploader.tsx       # Drag-and-drop & sample pickers
│   ├── data/
│   │   └── creative-content.ts     # Palettes, concepts, challenges, quiz data
│   ├── lib/
│   │   ├── ai/
│   │   │   └── ai-service.ts       # AI service abstraction (Mock & OpenAI)
│   │   ├── prompt-builder.ts       # Isolated ColoringPromptBuilder
│   │   ├── audio-synth.ts          # Pure Web Audio ambient synth
│   │   └── prisma.ts               # Prisma singleton client
│   └── types/
│       └── index.ts                # TypeScript domain models
└── prisma/
    └── schema.prisma               # Prisma relational schema
```

---

## 📄 License

MIT © 2026 AI Coloring Studio.
