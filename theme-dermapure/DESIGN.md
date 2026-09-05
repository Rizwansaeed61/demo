---
name: Clinical Derm Pure
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#424750'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#727781'
  outline-variant: '#c2c6d1'
  surface-tint: '#27609d'
  primary: '#003461'
  on-primary: '#ffffff'
  primary-container: '#004b87'
  on-primary-container: '#8abcff'
  inverse-primary: '#a3c9ff'
  secondary: '#3d6a00'
  on-secondary: '#ffffff'
  secondary-container: '#aaf457'
  on-secondary-container: '#406e00'
  tertiary: '#223a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#325300'
  on-tertiary-container: '#85ce19'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#a3c9ff'
  on-primary-fixed: '#001c38'
  on-primary-fixed-variant: '#004882'
  secondary-fixed: '#acf75a'
  secondary-fixed-dim: '#91da40'
  on-secondary-fixed: '#0f2000'
  on-secondary-fixed-variant: '#2d5000'
  tertiary-fixed: '#acf847'
  tertiary-fixed-dim: '#91db2a'
  on-tertiary-fixed: '#102000'
  on-tertiary-fixed-variant: '#304f00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.04em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 15px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.06em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  container-max: 480px
---

## Brand & Style

This design system embodies dermatologist-backed, clinical skincare credibility married with modern direct-to-consumer clarity. Its primary goal is to communicate medical-grade gentleness, scientific formulation, and uncompromised efficacy. The visual language balances pharmaceutical trustworthiness with refreshing daily wellness, directly addressing common patient concerns regarding sensitive, dry, or compromised skin barriers.

The style fuses **Corporate / Modern** clinical precision with **Minimalism**. Clean, bright clinical backdrops maximize breathing space around product imagery, while deliberate pops of medical blue and vitalizing lime-green convey restorative health. Interface elements utilize soft pill-shaped containment, delicate structural hairline borders, and subtle luminous gradients to transition clinical rigor into approachable consumer luxury.

## Colors

The color palette is derived directly from clinical skincare science, anchoring emotional security in deep corporate blues while stimulating freshness through botanical lime accents.

- **Primary Clinical Blue (`#004B87`)**: Anchors primary brand markers, header branding, prominent callouts, and key structural action targets. Radiates medical authority, dermatology trust, and formulation safety.
- **Secondary Lime Leaf (`#76BC21`)**: Vitalizing, biological green accent indicating active restoration, natural botanicals, and gentle efficacy.
- **Tertiary Bright Lime (`#84CC16`)**: Used alongside the secondary lime in high-conversion gradient CTAs and stepped routine trackers.
- **Deep Slate Navy (`#0F172A`)**: Serves as the primary typography color, replacing harsh stark blacks with a rich, readable pharmaceutical slate.
- **Mint Surface Tint (`#DCFCE7`)**: Soft pastel backdrop for clinical trial percentages, dermatological skin-type pill badges, and reassurance callouts.
- **Clinical White (`#FFFFFF`)**: Grounding base canvas that gives products pure, sterile, and calming room to breathe.
- **Subtle Hairline Slate (`#E2E8F0`)**: Low-contrast border structure for unselected toggles, card edges, and gallery thumbnails.

## Typography

The design system relies on **Inter** throughout all tiers to guarantee immaculate digital legibility, clinical neutrality, and systematic precision.

- **Headlines**: Weighted at `700` with subtle negative tracking (`-0.01em` to `-0.02em`) to produce firm, authoritative product names and value propositions without appearing overly commercial.
- **Body**: Uses `400` weight with generous line heights to facilitate effortless scanning of ingredient formulations, clinical trial findings, and usage instructions.
- **Section Headers & Action Buttons**: Rendered in uppercase or deliberate tracking (`headline-sm`, `label-lg`) to distinguish functional interactions from explanatory dermatological copy.

## Layout & Spacing

The layout is optimized for high-density, mobile-first e-commerce checkout and clinical discovery. 

- **Grid & Alignment**: Structured on an 8px rhythmic grid (with 4px half-steps for micro-tags and badges). On mobile viewports, gutters hold at `1rem` (16px) with an edge margin of `1rem`. Desktop representations clamp centered within a max-width container of `480px` to mirror the streamlined app-like presentation, or expand across an 8-column layout for expanded PDP environments.
- **Vertical Flow**: Sections flow logically from product validation (pill tags, ratings, claims) to visual documentation (media gallery), efficacy stats, size selection, dynamic CTA, and multi-step routine builder bundles.
- **Component Breathing Room**: Stacked elements maintain a tight `0.75rem` to `1rem` vertical cadence to provide essential context above the mobile fold while preventing clinical clutter.

## Elevation & Depth

This design system avoids heavy shadows, favoring clean surface containment and low-contrast outlines:

- **Surface Tiers**: Base views sit on pure clinical white (`#FFFFFF`). Secondary items (e.g., trust callout bars, secondary routine step containers) sit on gentle mint (`#DCFCE7`) or pale slate tints (`#F8FAFC`).
- **Low-Contrast Outlines**: Card boundaries, unselected size cards, and media thumbnails are framed with a crisp `1px` border in `#E2E8F0`. 
- **Active State Highlights**: Selected size toggles transition their border to a 1.5px frame in `#004B87`, backed by a whisper-light tinted surface of `#F0F7FF`.
- **Soft Ambient Shadows**: Floated checkout buttons and sticky drawer bars utilize an ultra-diffuse ambient drop shadow: `0 8px 24px -4px rgba(0, 75, 135, 0.12)`.

## Shapes

The interface adopts a high-roundedness aesthetic (`roundedness: 3`, pill-shaped). This curvature conveys gentle safety, non-irritating care, and biological softness:

- **Pill Badges (`rounded-full`)**: Skin-type tags ('Dry Skin', 'Acne Prone Skin', 'Sensitive Skin') use fully circular endcaps.
- **Primary CTA Buttons**: Fully rounded pill shapes (`9999px` radius) to invite tactile engagement.
- **Routine and Option Cards**: Employ `rounded-lg` (16px to 24px) for outer module containment, maintaining friendly, smooth corners.
- **Step Badges & Mini Tags**: Utilize soft `6px` to `8px` rounded rectangles for numbered sequence tags ('Step 01', 'Step 02').

## Components

### Buttons
- **Primary CTA ('Add to Cart')**: Full-width, high-energy gradient spanning `#004B87` (deep clinical blue) on the left to `#76BC21` / `#84CC16` (fresh lime green) on the right. Styled with bold uppercase white text (`label-lg`), generous vertical padding (`0.875rem`), and pill curvature.
- **Sticky Bundle CTA ('Add Items to Bag')**: Deep solid navy/blue (`#004B87`) pill button with crisp white typography and embedded live pricing tallies.

### Skin Type & Claim Chips
- **Skin Type Badges**: Pale mint tint (`#DCFCE7`) or muted slate background, micro border, and compact text (`label-sm`) in `#0F172A` with generous horizontal pill padding (`0.75rem`).
- **Clinical Efficacy Bar**: Full-width soft lime banner (`#DCFCE7` to `#E6F8CE`) housing centered clinical perception results with green checkmark or star icons.

### Trust Badges & Clinical Icons
- Minimalist circular line-art icons (36px–44px diameter) with `1.5px` stroke weight in primary blue or deep slate.
- Symmetrically spaced with accompanying micro-labels below ('Fragrance free', 'Paraben free', 'Hypoallergenic', 'Deep cleans').

### Size Selection Cards
- Horizontal dual/triple toggle cards with `1px` border `#E2E8F0`.
- Radio button indicator on the top-left, volume title, bold price, and an optional floating pill tag indicating promotional savings (e.g., '10% Off' in solid `#004B87` badge).
- Selected state adopts an active blue border and tinted fill.

### Structured Routine Bundle Cards
- Stacked module containing individual skincare steps.
- Each item row features:
  - Product thumbnail with subtle rounded border.
  - Category and skin compatibility chips.
  - Step counter tag (`Step 01`, `Step 02`) in solid lime-green `#76BC21` with white bold text.
  - Integrated custom checkbox for optional inclusion in the total cart calculation.
  - Product title and distinct price badge.