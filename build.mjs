import { context } from 'squid-ssr';
import nodemon from 'nodemon';

const WATCH = process.argv.includes('--watch');

const createContext = async () => await context({
  plugins: [],
  loader: {
    '.jpg': 'file'
  },
  minify: false
});

let ctx = await createContext();
if (WATCH) {
  ctx.watch();
  nodemon({
    scriptPosition: 0,
    script: './build/main.mjs',
    args: []
  });
} else {
  await ctx.rebuild();
  ctx.dispose();
}