/**
 * Module declaration for importing PNG files in TypeScript.
 *
 * This declaration allows TypeScript to understand and handle imports of PNG files.
 * The imported content is typed as `any` to accommodate various use cases.
 */
declare module '*.png' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any
    export default content
}
