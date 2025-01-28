/**
 * Contains all available database tables inside the public schema.
 *
 * Should always be the preferred way to access the database since it decreases the chance of spelling errors.
 */
export enum Table {
    Roles = 'Roles',
    Users = 'Users',
    Problems = 'Problems',
}
