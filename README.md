# 📊 Hashtag Sentiment Insight Page — URI

## 🚀 Overview

This project fulfills the task of building a dynamic hashtag sentiment insights page using **Next.js, TypeScript, React**, **Material UI**, **@mui/x-charts**, and **React Query** with a dynamic route `/insights/[hashtag]`. 

### Features Implemented

- ✅ Dynamic route `/insights/[hashtag]`
- ✅ Mock API endpoint at `/api/trends/[hashtag]`
- ✅ Sentiment trend line with `@mui/x-charts/LineChart`
- ✅ Trend direction indicator (📈 or 📉)
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Light and Dark mode support
- ✅ Dropdown to switch hashtags
- ✅ Loading and error states
- ✅ React performance optimizations:
  - `React.memo`
  - `useMemo`
  - `useCallback`
- ✅ Lazy-loaded chart with `next/dynamic`

## Screenshots

### Desktop Views
| Dark Mode | Light Mode |
|-----------|------------|
| ![Desktop Dark Mode](./public/desktop-dark.png) | ![Desktop Light Mode](./public/desktop-light.png) |

### Tablet Views
| Dark Mode | Light Mode |
|-----------|------------|
| ![Tablet Dark Mode](./public/tab-dark.png) | ![Tablet Light Mode](./public/tab-light.png) |

### Mobile Views
| Dark Mode | Light Mode |
|-----------|------------|
| ![Mobile Dark Mode](./public/mobile-dark.png) | ![Mobile Light Mode](./public/mobile-light.png) |

## Technical Implementation

### Key Components

1. **Hashtag Switcher**
   - Dropdown with popular hashtags
   - Client-side navigation between trends
   - Persists in all viewports

2. **Enhanced Sentiment Chart**
   - Min/Max sentiment markers (dotted lines)
   - Custom tooltips with date/sentiment values
   - Responsive sizing

3. **View Mode Toggle**
   - System-preference detection
   - Manual light/dark mode switch
   - Theme-appropriate chart colors

4. **Responsive Layout**
   - Mobile: Stacked elements, larger touch targets
   - Tablet: Adjusted spacing, medium-sized charts
   - Desktop: Side-by-side components, detailed views

## How to Run

```bash
git clone [repository-url]
npm install
npm run dev
```

## Live Demo

Deployed on Vercel:  
[Creative URI hashtag sentiment ](https://uricreative.vercel.app/insights/uri)

## Time Spent

Total: ~3 hours (including bonus features)

- 45 mins: Base functionality
- 1 hour: Bonus features implementation
- 45 mins: Responsive design & testing
- 30 mins: Documentation & deployment
