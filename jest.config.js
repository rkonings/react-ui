module.exports = {
    transform: {
      '.(ts|tsx)': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/lib/'],
    testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    moduleNameMapper: {
      "^dnd-core$": "dnd-core/dist/cjs",
      "^react-dnd$": "react-dnd/dist/cjs",
      "^react-dnd-html5-backend$": "react-dnd-html5-backend/dist/cjs",
      "^react-dnd-touch-backend$": "react-dnd-touch-backend/dist/cjs",
      "^react-dnd-test-backend$": "react-dnd-test-backend/dist/cjs",
      "^react-dnd-test-utils$": "react-dnd-test-utils/dist/cjs"
    }
};
