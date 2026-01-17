# Frontend Architecture

## Overview

The VotePeace Frontend uses a **Feature-First / Page-Based Architecture** built on top of the **React Router v7** framework conventions. We prioritize modularity, separating UI components from business logic and state management.

## High-Level Diagram

```mermaid
graph TD
    User[User Interface] -->|Interaction| Component[UI Components (MUI)]
    Component -->|Dispatch Action| Redux[Redux Store]
    Component -->|Local State| ReactHook[React State/Hooks]
    
    Redux -->|Async Thunk| API[API Service (Axios)]
    API -->|HTTP Request| Backend[VotePeace Backend]
    
    Backend -->|JSON Response| API
    API -->|Fulfilled Action| Redux
    Redux -->|State Update| Component
```

## Directory Structure

```
VotePeace-Frontend/
├── app/
│   ├── component/      # Reusable UI components (Buttons, Cards, Inputs)
│   ├── page/           # Page-level components (Dashboards, Landing)
│   ├── routes/         # React Router v7 Route definitions
│   ├── stores/         # Redux slices and store configuration
│   ├── DTO/            # TypeScript Data Transfer Objects (Interfaces)
│   ├── schemas/        # Zod validation schemas
│   ├── libs/           # Utility functions and axios config
│   ├── root.tsx        # Application root layout
│   └── routes.ts       # Route configuration map
├── public/             # Static assets
└── vite.config.ts      # Vite build configuration
```

## Key Architectural Decisions

### 1. React Router v7
We utilize the latest React Router (formerly Remix features) for data loading and routing. Routes are defined in `app/routes` and configured in `routes.ts`.

### 2. State Management (Redux Toolkit)
Global state (User session, Theme preferences) is managed by Redux.
-   **Slices**: Partitioned state logic located in `app/stores`.
-   **Thunks**: Async logic for API calls handled via `createAsyncThunk`.

### 3. Styling Strategy (MUI + Tailwind)
We use a hybrid approach:
-   **Material UI (MUI)**: For complex interactive components (Tables, Modals, Grids).
-   **Tailwind CSS**: For layout primitives, spacing, and rapid styling overrides.
-   **Theming**: Global theme defined in `app/config/theme.ts` (if available) or customized via MUI `ThemeProvider`.

### 4. Form Management
Forms are controlled using **React Hook Form** paired with **Zod** for schema-based validation. This ensures type safety and centralized validation logic (located in `app/schemas`).

## Data Flow

1.  **Page Load**: `React Router` loader (or `useEffect`) triggers data fetch.
2.  **API Call**: `libs/axios` instance sends request with Interceptors (attaching Auth headers).
3.  **State Update**: Redux store updates with fresh data.
4.  **UI Render**: Components subscribe to store selectors and render data.
