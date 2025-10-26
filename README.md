# TicketFlow - Vue.js Implementation

A stunning, modern ticket management web application built with Vue 3, featuring premium UI design, smooth animations, and comprehensive functionality.

## Features

### **Modern UI Design**
- **Glassmorphism Effects**: Beautiful frosted glass design with backdrop blur
- **Gradient Backgrounds**: Stunning purple-to-blue gradient themes
- **Smooth Animations**: Fade-in, slide-in, and floating animations
- **Inter Typography**: Modern, professional font family
- **Responsive Design**: Mobile-first approach with max-width 1440px container

### **Authentication System**
- **Secure Login/Signup**: Form validation and error handling
- **Protected Routes**: Authentication-based route protection
- **Session Management**: Persistent login state with Pinia store

### **Dashboard & Analytics**
- **Statistics Overview**: Real-time ticket metrics and insights
- **Quick Actions**: Fast access to common operations
- **Modern Cards**: Glassmorphism design with hover effects

### **Ticket Management**
- **Full CRUD Operations**: Create, Read, Update, Delete tickets
- **Priority Levels**: Low, Medium, High priority system
- **Status Tracking**: Open, In Progress, Closed status management
- **Search & Filter**: Advanced filtering capabilities

### **Premium Features**
- **Micro-interactions**: Button hover effects and shimmer animations
- **Form Validation**: Real-time validation with clear error messages
- **Loading States**: Elegant loading indicators and transitions
- **Accessibility**: WCAG compliant design and keyboard navigation

## Tech Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe JavaScript development
- **Vue Router** - Client-side routing and navigation
- **Pinia** - Modern state management for Vue
- **Custom CSS** - Hand-crafted modern design system
- **Heroicons v2** - Beautiful SVG icon library
- **Vite** - Fast build tool and development server
- **Heroicons** - Beautiful SVG icons
- **Custom CSS** - Utility-first styling approach

## Demo Credentials

For testing the application, use these demo credentials:
- **Email**: demo@example.com
- **Password**: password123

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
