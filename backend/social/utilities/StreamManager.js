const tenantRepositry = require("../query_repositry/tenant_repositry/tenantRepositry");
const userRepository = require("../query_repositry/user_repositry/userRepositry");

const processMessage = async (parsedMessage) => {
  try {
    if (parsedMessage.event_name === "tenant_created") {
      await tenantRepositry.createTenantProfile(parsedMessage.properties);
    } else if (parsedMessage.event_name === "user_created") {
      await userRepository.createUserProfile(parsedMessage.properties);
    }

    console.log("Inserted message:", parsedMessage);
  } catch (error) {
    console.error("Error processing message:", error.message);
  }
};

module.exports = { processMessage };
