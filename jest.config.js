export default {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    resolver: 'jest-ts-webcompat-resolver',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ]
};
