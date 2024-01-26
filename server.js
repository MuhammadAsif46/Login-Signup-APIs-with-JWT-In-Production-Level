const Fastify = require("fastify");
const fastify = Fastify();
const userRoutes = require("./users/userRoutes");


fastify.register(userRoutes, { prefix : "/api"});


fastify.listen({ port: 5001}, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});


