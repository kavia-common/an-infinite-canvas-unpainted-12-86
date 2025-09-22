# Blu Creative Suite – Frontend Web Application (React SPA)

A responsive, accessible React SPA implementing dashboard navigation, ideation workspace, media asset management, campaign workflows, analytics, collaboration stubs, authentication, and role-based access.

## Features
- Sidebar navigation: Home, Ideation, Media, Campaigns, Reports, Settings, Help
- Dashboard with Attributes Summary and Content Over/Under Performers
- Ideation workspace with idea cards and comments
- Media management: upload images/videos, listing, search and compatibility filters
- Campaign creation and multi-platform launch (UI workflow with backend stubs)
- Reporting dashboards with key metrics, attributes, and performers
- Authentication mock with RBAC (viewer, editor, admin)
- Blue/white theme, dark mode toggle, responsive layout, WCAG-friendly

## Getting Started
- npm start
- npm test
- npm run build

## Environment Variables
Create .env with:
- REACT_APP_API_BASE=https://your-backend.example.com

Note: Authentication and data are mocked for now. Replace stubs in src/services/api.js and integrate backend endpoints.

## Project Structure
- src/components/Layout: Sidebar, Header
- src/components/Auth: ProtectedRoute
- src/context: AuthContext, UIContext
- src/pages: Dashboard, IdeationBoard, MediaManager, Campaigns, Reports, Settings, Help, Login, NotFound
- src/services: api.js
- src/utils: mockData.js

## Accessibility
- Proper roles/labels
- Keyboard focus on interactive components
- High-contrast blue/white palette with dark mode

## RBAC
- viewer: dashboard/reports/settings/help
- editor: viewer + ideation/media/campaigns
- admin: full access
