module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(scss)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  modulePathIgnorePatterns: ["__utils"],
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "test-results/junit", outputName: "results.xml" },
    ],
  ],
};
