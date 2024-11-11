import Fastify from 'fastify';
import mercurius from 'mercurius';

// Créer un serveur Fastify
const fastify = Fastify();

// Définir un schéma GraphQL
const schema = `
  type Query {
    hello: String
  }
`;

// Définir les résolveurs pour le schéma
const resolvers = {
  Query: {
    hello: async () => {
      return 'Hello, world!';
    },
  },
};

// Ajouter le plugin Mercurius à Fastify
fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true, // Activer l'interface GraphiQL
});

// Démarrer le serveur
fastify.listen({port:4000, host:'0.0.0.0'}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
