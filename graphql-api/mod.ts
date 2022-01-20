import { Server } from 'https://deno.land/std@0.107.0/http/server.ts';
import { GraphQLHTTP  } from 'https://deno.land/x/gql@1.1.0/mod.ts';
import { makeExecutableSchema } from 'https://deno.land/x/graphql_tools@0.0.2/mod.ts';
import { typeDefs } from './types.ts';

/*
TODO: Make use of this fake database
import { db } from '../fake-database/main.ts';
console.log(db.Students);
*/

const resolvers = { Query: { hello: () => `Hello World!` } };

const server = new Server({
  handler: async (req: Request) => {
    const { pathname } = new URL(req.url);

    return pathname === '/graphql'
      ? await GraphQLHTTP<Request>({
          schema: makeExecutableSchema({ resolvers, typeDefs }),
          graphiql: true
        })(req)
      : new Response('Not Found', { status: 404 });
  },
  addr: ':3000'
});

server.listenAndServe();