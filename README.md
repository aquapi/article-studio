# Article Studio

A place for creative articles.

Articles are written using [Github Markdown](https://gist.github.com/VEnis/7465176#file-gistfile1-md)

## Routes
Each file in `src/routes` exports an object with:
```typescript
type Router = {
    path: string,
    method: string,
    handler(req: Request, res: Response): void | Promise<void>,
}
```

These exports object are imported using `importAll` utility function then passed to the app.

## Loaders
`src/loaders` includes the express server, passport strategies, Next.js server, Socket.io server, and the HTTP server.

## Models
`src/models` includes the database models.

## Utilities
`src/utils` includes the utility functions.
- `converter.mjs` exports the Showdown.js Markdown converter.
- `filter.mjs` exports a function to filter articles.
- `importAll.mjs` exports a function to import all files in a directory.
- `sort.mjs` exports a function to sort articles by properties (Quick sort).