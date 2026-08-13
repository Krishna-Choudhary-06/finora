# Finora Design System

## Overview
This document outlines the frontend design system and architectural patterns for Finora, directly translated from the approved Finora Stitch project design tokens.

## Design Tokens

### Colors
- **background**: `#F8FAFC` (neutral off-white to reduce eye strain)
- **foreground**: `#0B1C30`
- **surface**: `#FFFFFF` (Cards and main content surfaces)
- **surface-muted**: `#F1F5F9`
- **border**: `#E2E8F0`
- **primary**: `#1E293B`
- **primary-hover**: `#0F172A`
- **accent**: `#059669` (Emerald accent for positive growth)
- **success**: `#059669`
- **warning**: `#F59E0B`
- **error**: `#BA1A1A`
- **info**: `#3B82F6`

### Typography
- **Primary Font**: Inter (used for all primary interface elements)
- **Secondary/Data Font**: JetBrains Mono (used for financial figures, account numbers, and tabular data)

Hierarchy:
- `display`: 48px, 700 weight
- `h1`: 32px, 600 weight
- `h2`: 24px, 600 weight
- `body`: 16px, 400 weight
- `label`: 12px, 600 weight, 0.05em spacing
- `metric/monospace`: 32px/14px, 500 weight, JetBrains Mono

### Spacing & Radius
Spacing scale: `xs` (8px), `sm` (16px), `md` (24px), `lg` (40px), `xl` (64px).
Radius: `small` (6px), `medium` (8px), `large` (12px), `pill` (9999px).

## Component Architecture
Components are structured into domains:
1. `ui/`: Generic primitive components (Button, Input, Card) built with accessibility and semantic HTML.
2. `layout/`: AppShell, Sidebar, Header.
3. `finance/`: Finora-specific presentational components (StatCard, TransactionRow).

## Responsive Strategy
- Desktop: Uses a 12-column grid with a fixed sidebar (AppShell layout).
- Mobile: Sidebar is hidden, utilizing a header with a hamburger menu for navigation. Padding is reduced from 24px/48px to 16px to maximize data visibility.

## Accessibility Strategy
- Components use semantic HTML elements (`<button>`, `<header>`, `<nav>`).
- Forms support keyboard navigation.
- Color contrast meets WCAG standards, utilizing icon and visual layout combinations rather than relying solely on color (e.g., trend indicators have '+' symbols and position placement).

## Stitch-to-Code Decisions
- Interpreted "surface-bright" and "surface-dim" into a consolidated CSS variables strategy mapping `surface` to pure white for cards and `background` to the neutral off-white.
- JetBrains Mono was scoped specifically for `font-mono` and `StatCard`/`TransactionRow` values, ensuring financial data aligns perfectly.
