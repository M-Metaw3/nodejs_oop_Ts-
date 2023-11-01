"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_config_1 = require("./config/db.config");
db_config_1.default
    .authenticate()
    .then(function () {
    console.log("Database connection has been established successfully.");
})
    .catch(function (error) {
    console.error("Unable to connect to the database:", error);
});
console.log("metaweaa");
