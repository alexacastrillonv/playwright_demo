# Playwright E-commerce Demo

This project is an end-to-end (E2E) automation suite for the LambdaTest E-commerce Playground website, using [Playwright](https://playwright.dev/) and [playwright-bdd](https://github.com/playwright-bdd/playwright-bdd) for BDD-style testing.

## Features
- Page Object Model (POM) structure for maintainable code
- BDD with Gherkin feature files
- Multi-browser support (Chromium, Firefox, WebKit)
- Parallel test execution and retries
- HTML, JUnit, and list reporting
- Linting with ESLint

## Project Structure
```
playwright_demo/
├── e2e/
│   ├── Pages/                # Page Object classes
│   └── Tests/
│       ├── features/         # Gherkin feature files
│       └── step_definitions/ # Step definitions for features
├── playwright.config.js      # Playwright and BDD config
├── eslint.config.js          # ESLint configuration
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
├── playwright-report/        # Playwright HTML reports
└── test-results/             # Test result artifacts
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (comes with Node.js)

### Installation
1. Clone this repository:
   ```sh
   git clone <your-repo-url>
   cd playwright_demo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running Tests
- Run all tests:
  ```sh
  npx playwright test
  ```
- Run tests for a specific feature:
  ```sh
  npx playwright test e2e/Tests/features/<feature-file>.feature
  ```
- View HTML report:
  ```sh
  npx playwright show-report
  ```

### Linting
- Check code style:
  ```sh
  npx eslint .
  ```

## Configuration
- Update `playwright.config.js` for custom settings (base URL, browsers, reporters, etc).
- Feature files and step definitions are mapped via `playwright-bdd` config.

## Folder Details
- `e2e/Pages/`: Page Object classes encapsulating selectors and actions for each page.
- `e2e/Tests/features/`: Gherkin `.feature` files describing test scenarios.
- `e2e/Tests/step_definitions/`: JavaScript step definitions implementing feature steps.

## Reporting
- After running tests, open the HTML report in `playwright-report/index.html` or use `npx playwright show-report`.
- JUnit XML results are saved as `result.xml` for CI integration.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm test` or `npm run test` | Generate BDD steps and run all Playwright tests. |
| `npm run lint` | Lint all JS files using ESLint. |
| `npm run lint:fix` | Lint and auto-fix issues in JS files. |
| `npm run format` | Format all files using Prettier. |
| `npm run format:check` | Check formatting with Prettier (does not modify files). |
| `npm run test:debug` | Run tests in Playwright debug mode (with inspector). |
| `npm run test:ui` | Run tests using Playwright's UI mode. |
| `npm run test:headless` | Run tests in headed mode (browser UI visible). |
| `npm run test:trace` | Run tests with trace collection enabled. |
| `npm run test:report` | Show the Playwright HTML report. |
| `npm run test:byTag` | Run tests tagged with `@smoke`. |
| `npm run test:byTag:invert` | Run all tests except those tagged with `@smoke`. |
| `npm run test:chrome` | Run tests only in Chromium. |
| `npm run test:firefox` | Run tests only in Firefox. |
| `npm run test:webkit` | Run tests only in WebKit. |
| `npm run test:all` | Run tests in all browsers (Chromium, Firefox, WebKit). |
| `npm run test:specific` | Run a specific test file (edit the script for your file). |
| `npm run test:report:open` | Open the Playwright HTML report. |
| `npm run test:allure` | Run tests and generate Allure results. |
| `npm run allure:generate` | Generate an Allure report from results. |
| `npm run allure:open` | Open the generated Allure report. |
| `npm run allure:serve` | Serve the Allure report locally. |

**Usage Example:**
```sh
npm run test:chrome
npm run lint:fix
npm run test:byTag
npm run allure:open
```

## Contributing
Pull requests are welcome! Please lint your code and add/modify tests as needed.

## License
MIT
