import Fastify from 'fastify';
import mercurius from 'mercurius';
import '../../../database/mongodb/models/index'
const fastify = Fastify();

const schema = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: async () => {
      return 'Hello, world!';
    },
  },
};

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true, 
});

// Démarrer le serveur
fastify.listen({port:4000, host:'0.0.0.0'}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
