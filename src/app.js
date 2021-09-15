const express = require("express");
const app = express();
const discountRoute = require("./v1/Routes/discountRoutes");
const customerRoute = require("./v1/Routes/cusomterRoutes");
const invoiceRoute = require("./v1/Routes/invoiceRoute");
app.use(express.json());

app.use("/api/v1", customerRoute);
app.use("/api/v1", discountRoute);
app.use("/api/v1", invoiceRoute);

module.exports = app;
