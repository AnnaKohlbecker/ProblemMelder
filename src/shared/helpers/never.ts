/**
 * Throws an error with the provided message. This function is intended to be used
 * in exhaustive checks, particularly with switch statements involving enums, to ensure
 * all possible cases are handled and to maintain type safety and consistency.
 *
 * @param _never - A value that should never occur. This parameter is of type `never`,
 *                 which means it represents a value that should not exist.
 * @param message - The error message to be thrown if the function is called.
 *
 * @throws {Error} Throws an error with the provided message.
 */
export const never = (_never: never, message: string) => {
    throw new Error(message)
}
