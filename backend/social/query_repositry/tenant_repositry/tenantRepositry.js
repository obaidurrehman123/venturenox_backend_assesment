const knex = require("knex");

const knexConfig = require("../../knexfile");

const knexInstance = knex(knexConfig.development);

class TenantRepository {
  // creating tenant profile
  async createTenantProfile(data) {
    try {
      const result = await knexInstance("tenant_profile")
        .insert(data)
        .returning("*");
      return result;
    } catch (error) {
      console.error("Error creating tenant profile:", error);
      throw error;
    }
  }

  // getting all data
  async getAllTenantProfiles() {
    try {
      const profiles = await knexInstance("tenant_profile").select("*");
      return profiles;
    } catch (error) {
      console.error("Error getting all tenant profiles:", error);
      throw error;
    }
  }

  // getting specific record
  async getTenantProfileById(tenant_id) {
    try {
      const tenant = await knexInstance("tenant_profile")
        .where({ tenant_id })
        .first();
      return tenant;
    } catch (error) {
      console.error("Error getting tenant profile by ID:", error);
      throw error;
    }
  }

  // delete specific record
  async deleteTenantProfileById(tenant_id) {
    try {
      const deletedCount = await knexInstance("tenant_profile")
        .where({ tenant_id })
        .del();
      return deletedCount;
    } catch (error) {
      console.error("Error deleting tenant profile:", error);
      throw error;
    }
  }

  // update tenant profile
  async updateTenantProfile(tenant_id, newData) {
    try {
      const updatedTenant = await knexInstance("tenant_profile")
        .where({ tenant_id })
        .update(newData)
        .returning("*");

      return updatedTenant[0];
    } catch (error) {
      console.error("Error updating tenant profile:", error);
      throw error;
    }
  }
}

module.exports = new TenantRepository();
