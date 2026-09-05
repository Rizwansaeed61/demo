# DermaPure Clinical OS 2.0 • Official Shopify Theme

A production-ready **Shopify Online Store 2.0 Theme** engineered for clinical, medical, and dermatology eCommerce brands. Designed for direct 1-click **Shopify GitHub Integration** or manual `.zip` upload.

---

## 🔬 Shopify Online Store 2.0 Architecture

This repository is structured directly at the root for full compatibility with **Shopify Admin &rarr; Online Store &rarr; Themes &rarr; Add Theme &rarr; Connect from GitHub**:

```
.
├── assets/                  # CSS stylesheets & Shopify Ajax Cart JS engine
│   ├── theme.css
│   └── theme.js
├── config/                  # Native Shopify Theme Customizer schemas & presets
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/                  # Master liquid layout
│   └── theme.liquid
├── locales/                 # Translation & copy strings
│   └── en.default.json
├── sections/                # 22+ modular, customizable Liquid sections
│   ├── announcement-bar.liquid
│   ├── cart-drawer.liquid
│   ├── clinical-pillars.liquid
│   ├── clinical-routine.liquid
│   ├── concern-selector.liquid
│   ├── dermaclub-banner.liquid
│   ├── featured-collection.liquid
│   ├── footer.liquid
│   ├── header.liquid
│   ├── hero-banner.liquid
│   ├── journal.liquid
│   ├── main-404.liquid
│   ├── main-article.liquid
│   ├── main-blog.liquid
│   ├── main-cart.liquid
│   ├── main-collection.liquid
│   ├── main-list-collections.liquid
│   ├── main-page.liquid
│   ├── main-product.liquid
│   ├── main-search.liquid
│   ├── testimonials.liquid
│   └── trust-strip.liquid
├── snippets/                # Reusable clinical card & price elements
│   ├── price.liquid
│   └── product-card.liquid
├── templates/               # OS 2.0 JSON templates
│   ├── 404.json
│   ├── article.json
│   ├── blog.json
│   ├── cart.json
│   ├── collection.json
│   ├── index.json
│   ├── list-collections.json
│   ├── page.json
│   ├── page.routine-builder.json
│   ├── product.json
│   └── search.json
├── static-demos/            # Static HTML prototypes & Material design tokens
│   ├── index.html           # Themes Studio Hub & Viewport Simulator
│   ├── theme-dermapure/     # Vanilla HTML/JS prototype
│   ├── theme-dermcare/      # Alternative design variant
│   └── stitch_e_commerce_store_website_design/
├── .shopifyignore           # Tells Shopify to sync ONLY theme assets
└── .gitignore
```

---

## 🌟 Key Features

1. **Native Shopify GitHub Integration**:
   - The theme root is directly in the root of branch `main` (and branch `shopify`).
   - Zero configuration needed—connects seamlessly without the "Branch isn't a valid theme" error.
2. **Shopify Ajax Cart Drawer**:
   - Integrated with official Shopify endpoints (`/cart/add.js`, `/cart.js`, `/cart/change.js`).
   - Live free shipping meter dynamically calculating distance to threshold ($75 default, configurable in Theme Settings).
3. **Interactive 3-Step Routine Bundler**:
   - Dermatologist-curated Cleanse + Repair + Protect bundle with auto 15% discount and 1-click cart addition.
4. **Theme Settings Schema (`settings_schema.json`)**:
   - Easily change brand colors (Clinical Navy, Biological Green, Accent), shipping thresholds, announcements, and social links in the visual theme customizer.
5. **Full Device Responsiveness**:
   - Mobile-first, tablet, and desktop optimized with clinical typography (Plus Jakarta Sans).

---

## 🛍️ How to Connect to Shopify

### Option A: Connect via GitHub (Recommended)
1. In your **Shopify Admin**, go to **Online Store** &rarr; **Themes**.
2. Under **Theme library**, click **Add theme** &rarr; **Connect from GitHub**.
3. Select your GitHub account and choose the repository `Rizwansaeed61/demo`.
4. Select the branch (`main` or `shopify`).
5. Click **Connect**. Shopify will instantly validate and install the theme!

### Option B: Upload Zip
1. Download `dermapure_shopify_theme.zip`.
2. In **Online Store** &rarr; **Themes**, click **Add theme** &rarr; **Upload zip file**.
3. Select `dermapure_shopify_theme.zip` and upload.
