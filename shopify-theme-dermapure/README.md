# DermaPure Clinical OS 2.0 - Shopify Theme

A production-ready **Shopify Online Store 2.0** theme engineered for clinical, medical, and dermatology eCommerce brands.

---

## 🔬 Key Features

- **Shopify Online Store 2.0 Architecture**:
  - Full JSON templates (`index.json`, `product.json`, `collection.json`, `cart.json`, `404.json`, `page.routine-builder.json`).
  - Native Shopify Theme Editor customization support (`config/settings_schema.json`).
  - Modular sections with dynamic schema inputs.
- **Clinical Aesthetics & Precision Design**:
  - Medical typography using **Plus Jakarta Sans**.
  - High-trust clinical color palette (Clinical Navy `#002d59`, Biological Green `#2f6c00`, Light Accent `#aaf779`).
  - Clinical trust badges (Rx Formulated, 98% Clinical Efficacy, Dermatologist Tested).
- **Interactive 3-Step Routine Builder**:
  - Dynamic bundling of Cleanse + Repair + Shield with automatic 15% discount.
  - Multi-item 1-click add to cart.
- **Live Slide-Out Cart Drawer**:
  - Integrated with the **Shopify Ajax Cart API** (`/cart/add.js`, `/cart.js`, `/cart/change.js`).
  - Live **Free Clinical Shipping Meter** calculating distance to threshold ($75 default, customizable in theme settings).
  - Quantity steppers and seamless drawer animations.
- **High-Performance & Mobile Responsive**:
  - Fully responsive on all mobile, tablet, and desktop viewports.
  - Accessible and SEO-optimized markup.

---

## 📦 Theme Structure

```
shopify-theme-dermapure/
├── assets/
│   ├── theme.css
│   └── theme.js
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/
│   └── theme.liquid
├── locales/
│   └── en.default.json
├── sections/
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
│   ├── main-cart.liquid
│   ├── main-collection.liquid
│   ├── main-product.liquid
│   ├── testimonials.liquid
│   └── trust-strip.liquid
├── snippets/
│   ├── price.liquid
│   └── product-card.liquid
└── templates/
    ├── 404.json
    ├── cart.json
    ├── collection.json
    ├── index.json
    ├── page.routine-builder.json
    └── product.json
```

---

## 🚀 How to Install on Shopify

1. **Download the Theme Zip**:
   Download `dermapure_shopify_theme.zip`.
2. **Open Shopify Admin**:
   Log in to your Shopify store admin panel (`https://admin.shopify.com/store/YOUR-STORE-NAME`).
3. **Navigate to Themes**:
   Go to **Online Store** &rarr; **Themes**.
4. **Upload Zip**:
   Under **Theme library**, click **Add theme** &rarr; **Upload zip file**.
5. **Select & Upload**:
   Choose `dermapure_shopify_theme.zip` and click **Upload file**.
6. **Publish or Customize**:
   Click **Customize** to configure colors, banner images, and featured collections, or click **Publish** to make it your active live store theme!
