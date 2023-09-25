import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import { getSheetsData } from "./lib/sheets.js";

const schema = {
  type: "object",
  required: ["SHEET_ID", "GOOGLE_APPLICATION_CREDENTIALS", "PORT"],
  properties: {
    SHEET_ID: {
      type: "string",
    },
    GOOGLE_APPLICATION_CREDENTIALS: {
      type: "string",
    },
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

const options = {
  schema: schema,
  dotenv: true,
};

const fastify = Fastify({ logger: true });

fastify.get("/", async (request, reply) => {
  const data = await getSheetsData();
  reply.send({ hello: "world", sheetsData: data });
});

(async () => {
  await fastify.register(fastifyEnv, options);
  // @ts-ignore
  fastify.listen({ port: process.env.PORT }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
  });
})();
