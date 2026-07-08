Markdown
# SauceDemo QA Automation Assessment

This repository contains automated tests for [SauceDemo](https://www.saucedemo.com) utilizing Playwright and TypeScript.

## Prerequisites
- Node.js (v18 or higher)

## Installation & Setup

```Bash
npm install && npx playwright install
```

## Run tests

```bash
npm test
```

## Run in headed mode

```bash
npm run test -- --headed
```

## Generate HTML report

```bash
npx playwright show-report

## Update package.json so that we can use a simple cleaner and more standard npm command

## Update page locator in LoginPage.ts to use back data-test to standardized the locator name