const noDirectFontSizeRule = require('./no-direct-font-size.js')

/**
 * This is a custom eslint plugin containing all our custom rules.
 *
 * These rules are extensions or additions to other eslint plugins and ensure that our codebase is consistent and follows best practices.
 *
 * To use this plugin, add the following to your `.eslint.config.js` file:
 * ```js
 * module.exports = {
 *   plugins: ['custom-rules'],
 *   rules: {
 *     'custom-rules/no-direct-font-size': 'error',
 *   },
 * }
 * ```
 */
module.exports = {
    rules: {
        'no-direct-font-size': noDirectFontSizeRule,
    },
}
