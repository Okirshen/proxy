import { Application, Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { Airtable } from 'https://deno.land/x/airtable@v1.1.1/mod.ts';
import ShortUniqueId from 'https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts';
type Fields = {
  url: string;
  id: string;
};

const app = new Application();
const router = new Router();

const airtable = new Airtable({
  apiKey: Deno.env.get('key'),
  baseId: Deno.env.get('base'),
  tableName: 'urls',
});

router.get('/:id', async ctx => {
  const { records } = await airtable.select<Fields>();
  ctx.response.redirect(
    records.filter(record => record.fields.id == ctx.params.id)[0].fields.url
  );
});

router.post('/', async ctx => {
  if (
    ctx.request.headers.get('authorization')?.slice(7) == Deno.env.get('token')
  ) {
    const { url } = await ctx.request.body().value;
    const id = new ShortUniqueId();
    const record = await airtable.create<Fields>({
      url,
      id: id(),
    });
    ctx.response.status = 200;
    ctx.response.body = record;
  }
  ctx.response.status = 401;
});

app.use(router.routes());

await app.listen({ port: 8000 });
