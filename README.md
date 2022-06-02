# egg-example

using typescript && egg

## QuickStart
```bash
$ echo "export const vpsIP = '<Your host IP>'" > local-config.ts
```
You need a `local-config.ts` file in the root directory.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 16.5+
- Typescript 4.7+

### How to export the data from egg_exam_service
pg_dump -U postgres -d egg_exam_service -f "C:\Users\yourname\Desktop\egg_exam_service.dmp"

### How to import the data to egg_exam_service
psql -U postgres -d egg_exam_service -f "C:\Users\yourname\Desktop\egg_exam_service.dmp" or use pg_restore.
