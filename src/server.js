const app = require("./app");
const PORT = process.env.PORT || 3001;
const { createAllTables } = require("./config/models");
const db = require("./config/db.development");

createAllTables();

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
