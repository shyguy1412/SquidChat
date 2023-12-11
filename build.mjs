import { context } from 'squid-ssr';
import nodemon from 'nodemon';
import { EnvPlugin } from 'esbuild-env-plugin';

const WATCH = process.argv.includes('--watch');

const createContext = async () => await context({
  plugins: [EnvPlugin()],
  loader: {
    '.jpg': 'file'
  },
  minify: false,
  lambdaGateway: 'https://faas.nasram.net'
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