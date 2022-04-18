# next-images-portfolio-blog

# 🚀 Javascript full-stack 🚀

## NextJS Stack

### NextJS / React / FaunaDB / Three / Visx

https://github.com/coding-to-music/next-images-portfolio-blog

https://next-images-portfolio-blog.herokuapp.com

by Owen King https://github.com/OwnKng

https://github.com/OwnKng/ownkng.dev

Settings:

```
const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET })
```

Generate Sitemap:

```java
const fs = require("fs")

const globby = require("globby")

;(async () => {
  const pages = await globby([
    "pages/**/*{.js,.mdx}",
    "!pages/_*.js",
    "!pages/api",
  ])

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace("pages", "")
                  .replace(".js", "")
                  .replace(".mdx", "")
                const route = path === "/index" ? "" : path

                return `
                        <url>
                            <loc>${`https://ownkng.dev${route}`}</loc>
                        </url>
                    `
              })
              .join("")}
        </urlset>
    `

  fs.writeFileSync("public/sitemap.xml", sitemap)
})()
```

Build:

```java
remote: -----> Build
remote:        Running build
remote:
remote:        > next-images-portfolio-blog@0.1.0 build
remote:        > next build
remote:
remote:        info  - Skipping validation of types...
remote:        info  - Creating an optimized production build...
remote:        info  - Compiled successfully
remote:        info  - Collecting page data...
remote:        info  - Generating static pages (0/17)
remote:        info  - Generating static pages (4/17)
remote:        info  - Generating static pages (8/17)
remote:        info  - Generating static pages (12/17)
remote:        info  - Generating static pages (17/17)
remote:        info  - Finalizing page optimization...
remote:
remote:        Page                                               Size     First Load JS
remote:        ┌ ○ /                                              152 kB          911 kB
remote:        ├   /_app                                          0 B             112 kB
remote:        ├ ○ /[...tags]                                     852 B           760 kB
remote:        ├ ○ /404                                           6.29 kB         352 kB
remote:        ├ ○ /about                                         7.19 kB         352 kB
remote:        ├ λ /api/views/[...id]                             0 B             112 kB
remote:        ├ ○ /archive                                       761 B           760 kB
remote:        ├ ○ /thoughts/area-chart                           3.72 kB         215 kB
remote:        ├ ○ /thoughts/data-viz-react                       1.34 kB         216 kB
remote:        ├ ○ /thoughts/exploring-internal-migration-ggraph  239 B           163 kB
remote:        ├ ○ /thoughts/facet-line-chart                     2.21 kB         213 kB
remote:        ├ ○ /thoughts/graphix                              219 B           165 kB
remote:        ├ ○ /thoughts/linear-regression-for-eda            5.23 kB         161 kB
remote:        ├ ○ /thoughts/textmining                           222 B           170 kB
remote:        ├ ○ /thoughts/three-js-yuelongxueshan              7.07 kB         383 kB
remote:        ├ ○ /thoughts/webgl-line                           2.12 kB         369 kB
remote:        ├ ○ /thoughts/world-bank-clustering                1.89 kB         424 kB
remote:        └ ○ /thoughts/writing-a-webgl-program              238 B           368 kB
remote:        + First Load JS shared by all                      112 kB
remote:          ├ chunks/framework-5f4595e5518b5600.js           42 kB
remote:          ├ chunks/main-7c9e8fd8226b6573.js                28.2 kB
remote:          ├ chunks/pages/_app-d150a4266b537a25.js          40.7 kB
remote:          └ chunks/webpack-24780b5468e42e63.js             881 B
remote:
remote:        λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
remote:        ○  (Static)  automatically rendered as static HTML (uses no initial props)
```

and

```java
2022-04-18T02:04:09.388653+00:00 app[web.1]: 'x-txn-time': '1650247449302321',
2022-04-18T02:04:09.388653+00:00 app[web.1]: 'x-faunadb-build': '220408.175747-544a98c',
2022-04-18T02:04:09.388653+00:00 app[web.1]: 'content-length': '65',
2022-04-18T02:04:09.388654+00:00 app[web.1]: 'content-type': 'application/json;charset=utf-8',
2022-04-18T02:04:09.388654+00:00 app[web.1]: [Symbol(nodejs.http2.sensitiveHeaders)]: []
2022-04-18T02:04:09.388654+00:00 app[web.1]: },
2022-04-18T02:04:09.388654+00:00 app[web.1]: startTime: 1650247449362,
2022-04-18T02:04:09.388654+00:00 app[web.1]: endTime: 1650247449388
2022-04-18T02:04:09.388655+00:00 app[web.1]: }
2022-04-18T02:04:09.388655+00:00 app[web.1]: }
2022-04-18T02:04:10.220597+00:00 app[web.1]: ┌───────────────────────────────────────────────────────────────────────────┐
2022-04-18T02:04:10.220606+00:00 app[web.1]: │                                                                           │
2022-04-18T02:04:10.220607+00:00 app[web.1]: │   New faunadb version available 4.4.1 → 4.5.4                             │
2022-04-18T02:04:10.220607+00:00 app[web.1]: │   Changelog: https://github.com/fauna/faunadb-js/blob/main/CHANGELOG.md   │
2022-04-18T02:04:10.220607+00:00 app[web.1]: │                                                                           │
2022-04-18T02:04:10.220607+00:00 app[web.1]: └────────────────────────────��──────────────────────────────────────────────┘
2022-04-18T02:04:13.281885+00:00 heroku[router]: at=info method=GET path="/yulongxueshan.glb" host=next-images-portfolio-blog.herokuapp.com request_id=1724c365-a1c1-4688-aa71-d538e477d043 fwd="209.6.143.60" dyno=web.1 connect=0ms service=425ms status=200 bytes=2395747 protocol=https
2022-04-18T02:04:39.284090+00:00 heroku[router]: at=error code=H12 desc="Request timeout" method=GET path="/api/views/Faceting%20charts%20with%20visx%20and%20CSS%20grid" host=next-images-portfolio-blog.herokuapp.com request_id=14dd3f9d-aec4-4b2a-92fb-7e94fb1c2c5d fwd="209.6.143.60" dyno=web.1 connect=0ms service=30000ms status=503 bytes=0 protocol=https
2022-04-18T02:04:39.523398+00:00 app[web.1]: [Unauthorized: unauthorized] {
2022-04-18T02:04:39.523405+00:00 app[web.1]: description: 'Unauthorized',
2022-04-18T02:04:39.523406+00:00 app[web.1]: requestResult: RequestResult {
2022-04-18T02:04:39.523406+00:00 app[web.1]: method: 'POST',
2022-04-18T02:04:39.523407+00:00 app[web.1]: path: '',
2022-04-18T02:04:39.523407+00:00 app[web.1]: query: null,
2022-04-18T02:04:39.523409+00:00 app[web.1]: requestRaw: '{"exists":{"match":{"index":"posts_by_title"},"terms":"Faceting charts with visx and CSS grid"}}',
2022-04-18T02:04:39.523409+00:00 app[web.1]: requestContent: Expr { raw: [Object] },
2022-04-18T02:04:39.523410+00:00 app[web.1]: responseRaw: '{"errors":[{"code":"unauthorized","description":"Unauthorized"}]}',
2022-04-18T02:04:39.523410+00:00 app[web.1]: responseContent: { errors: [Array] },
2022-04-18T02:04:39.523411+00:00 app[web.1]: statusCode: 401,
2022-04-18T02:04:39.523411+00:00 app[web.1]: responseHeaders: [Object: null prototype] {
2022-04-18T02:04:39.523411+00:00 app[web.1]: ':status': 401,
2022-04-18T02:04:39.523412+00:00 app[web.1]: 'www-authenticate': 'Basic realm="Unauthorized"',
2022-04-18T02:04:39.523413+00:00 app[web.1]: 'x-txn-time': '1650247479439184',
2022-04-18T02:04:39.523413+00:00 app[web.1]: 'x-faunadb-build': '220408.175747-544a98c',
2022-04-18T02:04:39.523413+00:00 app[web.1]: 'content-length': '65',
2022-04-18T02:04:39.523413+00:00 app[web.1]: 'content-type': 'application/json;charset=utf-8',
2022-04-18T02:04:39.523414+00:00 app[web.1]: [Symbol(nodejs.http2.sensitiveHeaders)]: []
2022-04-18T02:04:39.523414+00:00 app[web.1]: },
2022-04-18T02:04:39.523414+00:00 app[web.1]: startTime: 1650247479507,
2022-04-18T02:04:39.523415+00:00 app[web.1]: endTime: 1650247479522
2022-04-18T02:04:39.523415+00:00 app[web.1]: }
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/next-images-portfolio-blog.git
git push -u origin main
```

## Heroku

```java
heroku create next-images-portfolio-blog
```

## Heroku MongoDB Environment Variables

```java
heroku config:set


heroku config:set PUBLIC_URL="https://next-images-portfolio-blog.herokuapp.com"
```
