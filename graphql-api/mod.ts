import { listenAndServe } from 'https://deno.land/std@0.107.0/http/server.ts';
import { GraphQLHTTP  } from 'https://deno.land/x/gql@1.1.0/mod.ts';
import { makeExecutableSchema } from 'https://deno.land/x/graphql_tools@0.0.2/mod.ts';
import { typeDefs } from './types.ts';
import { resolvers } from './resolvers.ts';

listenAndServe(':3000', async (req: Request) => {
  if(req.method === 'OPTIONS') {
    return new Response('', { status: 204, headers:
      {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Access-Control-Allow-Methods': 'POST, GET'
      }
    });
  }

  const { pathname } = new URL(req.url);
  if (pathname.startsWith('/client')) {
    return handleStaticRequest(req);
  }

  return pathname === '/graphql'
    ? await GraphQLHTTP<Request>({
        schema: makeExecutableSchema({ resolvers, typeDefs }),
        graphiql: true,
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        },
      })(req)
    : new Response('Not Found', { status: 404 });
});


async function handleStaticRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  // Check if the request is for style.css.
  if (pathname.startsWith("/client")) {
    // Read the style.css file from the file system.
    const file = await Deno.readFile(`../demo-client/${pathname.slice('/client'.length)}`);
    // Respond to the request with the style.css file.
    return new Response(file);
  }
  return new Response('', { status: 404 });
}