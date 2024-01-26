
const userController = require("./userController");


const userRoutes = (fastify, options, done)=>{
    fastify.post("/signup", userController.signupUser)
    fastify.post("/login", userController.loginUser)
    done();
}

module.exports = userRoutes;