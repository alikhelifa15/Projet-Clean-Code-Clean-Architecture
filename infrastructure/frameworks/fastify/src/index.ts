import Fastify from "fastify";
import mercurius from "mercurius";
import { schema } from "../../../../interface/graphql/schema";
import { resolvers } from "../../../../interface/graphql/resolvers";
import "../../../database/mongodb/models/index";
import { validateApiKey } from "../../../security/apiKey";
import fastifyCors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCors, { 
  origin: ['http://localhost:3001'],
  methods: ['GET', 'POST', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'X-Api-Key'], 
  credentials: true,
  preflight: true,  
  preflightContinue: true 
});


fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
  context: async (request) => {
    try {
      const apiKey = request.headers["x-api-key"];

      if (!apiKey) {
        throw new Error("Missing API key");
      }

      const isValid = await validateApiKey(apiKey as string);
      if (!isValid) {
        throw new Error("Invalid API key");
      }

      return {};
    } catch (error) {
      throw error;
    }
  },
  errorHandler: (error, request, reply) => {
    const errorResponse = {
      errors: [{
        message: error.message,
        status: 500
      }]
    };

    switch (error.message) {
      case "Missing API key":
        reply.status(401).send({
          ...errorResponse,
          errors: [{ message: "Unauthorized: Missing API key", status: 401 }]
        });
        break;
      case "Invalid API key":
        reply.status(401).send({
          ...errorResponse,
          errors: [{ message: "Unauthorized: Invalid API key", status: 401 }]
        });
        break;
      default:
        reply.status(500).send({
          ...errorResponse,
          errors: [{ message: "Internal server error", status: 500 }]
        });
    }
  },
});

fastify.get('/health', async (request, reply) => {
  reply.send({ status: 'ok' });
});

const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: "0.0.0.0" });
    console.log("Server running at http://localhost:4000/graphiql");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  try {
    await fastify.close();
    process.exit(0);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

start();