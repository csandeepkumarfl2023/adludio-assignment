const config = {
    "testMatch": ["**/*.test.tsx"],
    "testEnvironment": "jsdom",
    "moduleNameMapper": {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-svg-transformer",
        "\\.(png|svg|pdf|jpg|jpeg)$": "<rootDir>/__mocks__/fileMock.js"
      },
      "setupFilesAfterEnv": [
        "<rootDir>/src/setuptests.ts"
      ],
      "reporters": [
        "default",
        [
          "./node_modules/jest-html-reporters",
          {
            "publicPath": "./public/tests",
            "filename": "report.html",
            "pageTitle": "ADFOODIO Testcases Report",
            "reportSummary": true,
            "append": false
          }
        ]
      ]
};

module.exports = config;
