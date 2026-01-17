# Style Guide

This document outlines the UI/UX standards and coding conventions for the VotePeace Frontend.

## 🎨 Design System

### Colors
We use a "Dark Mode First" aesthetic with glassmorphism effects.
-   **Primary**: Cyan (`#00C8FF`) - Used for actions, highlights, and active states.
-   **Secondary**: Purple (`#9D00FF`) - Used for gradients and accents.
-   **Background**: Deep Navy (`#0F1928`) - Main app background.
-   **Surface**: Glass White (`rgba(255, 255, 255, 0.05)`) - Cards and panels.

### Typography
-   **Font Methods**: Google Fonts via `@fontsource/roboto`.
-   **Headings**: Bold, clear hierarchy. `h1` through `h4`.
-   **Body**: Readable sans-serif, high contrast for text (White/Light Gray on Dark).

## 🧩 Component Usage

### Buttons
-   **Primary**: Contained, Cyan background, Black text.
-   **Secondary**: Outlined, Cyan border, Cyan text.
-   **Icon Buttons**: Used for actions in tables/lists.

### Cards (Glassmorphism)
All cards should use the standard glass effect:
```tsx
<Card sx={{ 
    bgcolor: "rgba(255,255,255,0.05)", 
    backdropFilter: "blur(10px)", 
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 4 
}}>
    {/* Content */}
</Card>
```

## 💻 Coding Conventions

### File Naming
-   **Components**: PascalCase (e.g., `CampaignCard.tsx`).
-   **Hooks**: camelCase, prefixed with `use` (e.g., `useAuth.ts`).
-   **Utilities**: camelCase (e.g., `formatDate.ts`).

### React Best Practices
1.  **Functional Components**: Always use Functional Components with Hooks.
2.  **Strict Typing**: Define Props interfaces for all components.
3.  **Avoid Inline Styles**: Use Tailwind classes or MUI `sx` prop, avoid `style={{}}` unless dynamic.
4.  **Composition**: Break down large `Page` components into smaller sub-components using the `app/component` folder.

### Linter
Run `npm run lint` (if configured) to ensure code follows these standards.
