/**
 * @module Routes
 * @description
 * Load all the routes for the application
 * All to be loaded here
 * Ever route module should have a initialize function where the express app instance is transferred
 */

const wallboardRoutes = require("./wallboardRoutes");

function initialize(app) {
    /**
     * Add the route files from here
     */
    wallboardRoutes.initialize(app);
}

exports.initialize = initialize

