# Testing Guide

## Testing Strategy

We recommend a multi-level testing strategy for the Frontend.

### 1. Type Checking (Static Analysis)
TypeScript ensures type safety across the project.
-   **Run**: `npm run typecheck`
-   **Frequency**: Run on every commit via pre-commit hooks.

### 2. Unit Testing (Recommended)
Use **Vitest** (compatible with Vite) + **React Testing Library** for testing individual components and hooks.

*Ideally, tests are located alongside the component file, e.g., `Button.test.tsx`.*

#### Example Test
```tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});
```

### 3. E2E Testing (Future)
For end-to-end user flow testing, we recommend **Playwright** or **Cypress**.
-   **Scope**: Login flow, Voting process, Campaign creation.
