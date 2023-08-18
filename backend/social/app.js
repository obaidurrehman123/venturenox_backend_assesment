const express = require("express");
// const { initConsumer } = require('./utilities/consumer');
const { initProducer } = require("./utilities/producer");
// const { connectConsumer } = require('./utilities/consumer');
// const { connectProducer, connectAdmin } = require('./utilities/producer');
// const KeyMaster = require('./utilities/KeyMaster');
// const databaseConfig = require('./database/DatabaseConfig');
const tenantRoutes = require("./routes/tenant_routes/tenantRoutes");
const userRoutes = require("./routes/user_routes/userRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(databaseConfig.initializeDB());
app.use("/api/v1/tenant", tenantRoutes);
app.use("/api/v1/user", userRoutes);

app.use("/", async (req, res) => {
  res
    .status(200)
    .json({ message: `App is running on port. ${process.env.PORT || 4000}` });
});

app.listen(process.env.PORT || 4000, async () => {
  console.log("App started at port", process.env.PORT || 4000);
  await initProducer();
});