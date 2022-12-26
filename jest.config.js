module.exports = {
    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // Indicates which provider should be used to instrument code for coverage
    // coverageProvider: "babel",

    // A set of global variables that need to be available in all test environments
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            isolatedModules: true
        }
    },

    // An array of file extensions your modules use
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],

    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        'ngx-mask': '<rootDir>/node_modules/ngx-mask/fesm2015/ngx-mask.mjs'
    },

    // A preset that is used as a base for Jest's configuration
    preset: 'jest-preset-angular',

    // A path to a custom resolver
    resolver: '<rootDir>/jest-custom-resolver.js',

    // A list of paths to directories that Jest should use to search for files in
    roots: ['<rootDir>/src'],

    // Allows you to use a custom runner instead of Jest's default test runner
    // runner: "jest-runner",

    // The paths to modules that run some code to configure or set up the testing environment before each test
    // setupFiles: [],

    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/*.spec.ts'],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    // testPathIgnorePatterns: [
    //   "\\\\node_modules\\\\"
    // ],

    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular'
    },

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)']
};
