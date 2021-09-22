const config = {
  verbose: true,
  "collectCoverage": true,
  "coveragePathIgnorePatterns": [
    ".model.ts"
  ],
  "testMatch": ["**/tests/**/*"],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "testEnvironment": "node",
    "testTimeout": 250000,
    "reporters": [
      "default",
      [
        "./node_modules/jest-html-reporters",
        {
          "publicPath": "./public/testreport",
          "filename": "report.html",
          "pageTitle": "ADFOODIO Testcases Report",
          "reportSummary": true,
          "append": false
        }
      ]
    ]
};

module.exports = config;
