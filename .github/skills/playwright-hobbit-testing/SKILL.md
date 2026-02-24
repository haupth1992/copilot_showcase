---
name: playwright-hobbit-testing
description: End-to-end testing for the Hobbit Life Dashboard using Playwright. Test complete user journeys through fellowship management, pipeweed tracking, meal planning, and travel features. LOTR-themed test scenarios with browser automation, screenshots, and network monitoring.
argument-hint: "feature to test and browser"
---

# Playwright Hobbit Testing

This skill enables comprehensive end-to-end testing of the Hobbit Life Dashboard Vue.js application using Playwright, with LOTR-themed test scenarios and best practices for browser automation.

## When to Use This Skill

Use this skill when you need to:
- Test complete user workflows in the Hobbit Life Dashboard
- Verify navigation between different features (Fellowship, Pipeweed, Travel, etc.)
- Test real browser behavior and interactions
- Capture screenshots for visual regression testing
- Monitor network requests and API calls
- Debug issues in real browser environments
- Test responsive design across different viewports
- Validate accessibility features

## Prerequisites

- Playwright 1.58+ installed (see `playwright.config.ts`)
- Local development server running on `http://localhost:5173`
- Vue.js app built and ready to test
- TypeScript 5.9+ for test files
- Basic understanding of async/await and Promises

## Core Capabilities

### 1. Browser Automation
- Navigate between pages in the Hobbit Dashboard
- Click buttons, links, and interactive elements
- Fill forms for meal planning, pipeweed orders, travel routes
- Handle Vue Router navigation and transitions

### 2. Assertions & Verification
- Verify page titles and headings
- Check element visibility and text content
- Validate routing and URL changes
- Test reactive data updates
- Verify LOTR-themed content appears correctly

### 3. Visual Testing
- Capture screenshots of dashboard features
- Compare visual snapshots for regressions
- Test responsive layouts (mobile, tablet, desktop)
- Verify image loading and display

### 4. Debugging & Inspection
- View browser console logs
- Monitor network requests
- Intercept and mock API responses
- Record traces for failed tests
- Use headed mode to watch tests execute

## Usage Examples

### Example 1: Navigate the Shire Dashboard
```typescript
import { test, expect } from '@playwright/test'

test('hobbit can navigate to fellowship page', async ({ page }) => {
  // Start at the Shire (home page)
  await page.goto('/')
  
  // Verify we're in the Shire
  await expect(page).toHaveTitle(/Hobbit Life Dashboard/)
  
  // Navigate to Fellowship management
  await page.click('a:has-text("Fellowship")')
  
  // Verify we reached our destination
  await expect(page).toHaveURL(/\/fellowship/)
  await expect(page.locator('h1')).toContainText('Fellowship')
})
```

### Example 2: Plan Second Breakfast 🍳
```typescript
import { test, expect } from '@playwright/test'

test('hobbit can add second breakfast to meal tracker', async ({ page }) => {
  await page.goto('/meals')
  
  // Find the meal tracker component
  const mealTracker = page.locator('[data-testid="meal-tracker"]')
  
  // Check off "Second Breakfast" if not already eaten
  const secondBreakfast = mealTracker.locator('text=Second Breakfast')
  await secondBreakfast.click()
  
  // Verify the meal is marked as completed
  await expect(secondBreakfast).toHaveClass(/completed/)
  
  // Take a screenshot for the fellowship records
  await page.screenshot({ path: 'second-breakfast-logged.png' })
})
```

### Example 3: Order Pipeweed from Dealer Finder 🌿
```typescript
import { test, expect } from '@playwright/test'

test('hobbit can find nearest pipeweed dealer', async ({ page }) => {
  await page.goto('/pipeweed')
  
  // Enter location in the Shire
  await page.fill('input[name="location"]', 'Hobbiton')
  
  // Search for dealers
  await page.click('button:has-text("Find Dealers")')
  
  // Wait for results to load
  await page.waitForSelector('.dealer-card')
  
  // Verify we found some dealers
  const dealers = page.locator('.dealer-card')
  await expect(dealers).toHaveCount(3) // At least 3 dealers
  
  // Check first dealer has correct info
  const firstDealer = dealers.first()
  await expect(firstDealer).toContainText('Longbottom Leaf')
})
```

### Example 4: Plan Journey to Mordor 🗺️
```typescript
import { test, expect } from '@playwright/test'

test('fellowship can plan travel route', async ({ page }) => {
  await page.goto('/travel')
  
  // Fill in the travel planning form
  await page.fill('input[name="start"]', 'Rivendell')
  await page.fill('input[name="destination"]', 'Mordor')
  await page.selectOption('select[name="speed"]', 'walking')
  
  // Calculate the journey
  await page.click('button:has-text("Plan Journey")')
  
  // Wait for route to be calculated
  await page.waitForSelector('.journey-details')
  
  // Verify journey details
  const journeyInfo = page.locator('.journey-details')
  await expect(journeyInfo).toContainText('Distance')
  await expect(journeyInfo).toContainText('Estimated time')
  
  // Check for hazard warnings
  await expect(page.locator('.warning')).toContainText('Orcs')
})
```

### Example 5: Test Fellowship Member Addition
```typescript
import { test, expect } from '@playwright/test'

test('add new member to fellowship', async ({ page }) => {
  await page.goto('/fellowship')
  
  // Click "Add Member" button
  await page.click('button:has-text("Add Member")')
  
  // Fill in member details
  await page.fill('input[name="name"]', 'Boromir')
  await page.fill('input[name="race"]', 'Human')
  await page.fill('input[name="skills"]', 'Swordsmanship, Leadership')
  
  // Save the new member
  await page.click('button[type="submit"]')
  
  // Verify member appears in the list
  await expect(page.locator('.fellowship-member')).toContainText('Boromir')
})
```

### Example 6: Responsive Testing (Mobile Hobbit View)
```typescript
import { test, expect, devices } from '@playwright/test'

test('dashboard works on mobile (for traveling hobbits)', async ({ page }) => {
  // Emulate iPhone viewport
  await page.setViewportSize(devices['iPhone 13'].viewport)
  
  await page.goto('/')
  
  // Check mobile navigation menu
  const menuButton = page.locator('button[aria-label="menu"]')
  await expect(menuButton).toBeVisible()
  
  // Open menu
  await menuButton.click()
  
  // Verify navigation links are visible
  await expect(page.locator('nav a:has-text("Fellowship")')).toBeVisible()
})
```

## Guidelines

1. **Test user journeys, not implementation** - Think like a Hobbit using the app
2. **Use meaningful selectors** - Prefer `data-testid`, `role`, or text over CSS classes
3. **Wait for elements properly** - Use `waitForSelector`, `waitForURL` explicitly
4. **Handle async operations** - Always `await` page interactions
5. **Isolate tests** - Each test should be independent and resettable
6. **Use descriptive test names** - Explain what the Hobbit is trying to do
7. **Take screenshots on failure** - Capture visual evidence of bugs
8. **Test happy paths first** - Then add edge cases and error scenarios
9. **Keep LOTR theme** - Use thematic test names and descriptions
10. **Run in multiple browsers** - Test in Chromium, Firefox, and WebKit

## Common Patterns

### Pattern: Wait for Navigation
```typescript
// Click and then assert the new URL (modern Playwright pattern)
await page.click('a[href="/fellowship"]')
await page.waitForURL(/\/fellowship/)
```

### Pattern: Check Element Exists
```typescript
const ringDetector = page.locator('[data-testid="ring-detector"]')
await expect(ringDetector).toBeVisible()
```

### Pattern: Mock API Response
```typescript
await page.route('**/api/adventures', async route => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify({ quests: [{name: 'Destroy the Ring'}] })
  })
})
```

### Pattern: Capture Console Errors
```typescript
page.on('console', msg => {
  if (msg.type() === 'error') {
    console.log('Browser error:', msg.text())
  }
})
```

### Pattern: Screenshot on Failure
```typescript
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    await page.screenshot({ 
      path: `failed-${testInfo.title}.png`,
      fullPage: true 
    })
  }
})
```

## Test File Structure

Place E2E tests in the `e2e/` directory:
```
live-demo/
├── e2e/
│   ├── fellowship.spec.ts
│   ├── pipeweed.spec.ts
│   ├── meals.spec.ts
│   ├── travel.spec.ts
│   └── ring-detector.spec.ts
├── playwright.config.ts
└── package.json
```

## Run Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run in headed mode (watch the browser)
npm run test:e2e -- --headed

# Run specific test file
npm run test:e2e fellowship.spec.ts

# Debug mode with Playwright Inspector
npm run test:e2e -- --debug

# Generate test report
npm run test:e2e -- --reporter=html
```

## Playwright MCP Integration

This repository includes Playwright MCP server for browser automation:
- Navigate pages programmatically
- Take screenshots via MCP tools
- Inspect elements and console logs
- Fill forms and click buttons
- Useful for exploratory testing

## Browser Configuration

Tests run in multiple browsers by default (see `playwright.config.ts`):
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

Configure retries, timeout, and screenshots in the config file.

## Reference Files

- [playwright.config.ts](../../../live-demo/playwright.config.ts) - Playwright configuration
- [vue.spec.ts](../../../live-demo/e2e/vue.spec.ts) - Example E2E test
- [Playwright Docs](https://playwright.dev/) - Official documentation
- [Best Practices](https://playwright.dev/docs/best-practices) - Playwright testing guide

## Hobbit Testing Checklist

Essential features to test in the Hobbit Life Dashboard:
- [ ] Home page loads with all meal times visible
- [ ] Navigation works to all major sections
- [ ] Fellowship member list displays correctly
- [ ] Pipeweed dealer finder searches and shows results
- [ ] Lembas bread calculator computes correct quantities
- [ ] Travel planner shows routes and warnings
- [ ] Ring detector responds to input (hopefully shows "No Ring Detected" 😅)
- [ ] Weapon list displays with proper categories
- [ ] First aid injury database is searchable
- [ ] Mobile responsive layout works on small screens

## Limitations

- Cannot test native mobile apps (use React Native testing instead)
- Requires running dev server (tests won't start it automatically)
- Screenshots may vary slightly between environments
- Some browser-specific features might not work in all browsers
- Performance testing requires additional tools
- Visual regression testing needs baseline images
