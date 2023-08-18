const knex = require("knex");

const knexConfig = require("../../knexfile");

const knexInstance = knex(knexConfig.development);

class UserRepository {
  // creating user profile
  async createUserProfile(data) {
    try {
      const result = await knexInstance("user_profile")
        .insert(data)
        .returning("*");
      return result;
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }

  // check first name
  async checkFirstName(first_name) {
    try {
      const name = await knexInstance("user_profile")
        .where("first_name", first_name)
        .select();

      return name;
    } catch (error) {
      console.error("Error checking first name:", error);
      throw error;
    }
  }

  // getting all data
  async getAllUsersWithTenants() {
    try {
      const users = await knexInstance("user_profile");
      const usersWithTenants = await Promise.all(
        users.map(async (user) => {
          const tenantProfile = await knexInstance("tenant_profile")
            .where({ tenant_id: user.tenant_id })
            .first();

          user.tenant_profile = tenantProfile;
          return user;
        })
      );
      return usersWithTenants;
    } catch (error) {
      console.error("Error getting all users with tenants:", error);
      throw error;
    }
  }

  // getting specific record
  async getUserProfileWithTenant(user_id) {
    try {
      const userProfile = await knexInstance("user_profile")
        .where({ user_id })
        .first();

      if (!userProfile) {
        return null;
      }

      const tenantProfile = await knexInstance("tenant_profile")
        .where({ tenant_id: userProfile.tenant_id })
        .first();

      userProfile.tenant_profile = tenantProfile;

      return userProfile;
    } catch (error) {
      console.error("Error getting user profile with tenant:", error);
      throw error;
    }
  }

  // delete specific record
  async deleteUserProfileById(user_id) {
    try {
      const deletedCount = await knexInstance("user_profile")
        .where({ user_id })
        .del();
      return deletedCount;
    } catch (error) {
      console.error("Error deleting user profile:", error);
      throw error;
    }
  }

  // update user profile
  async updateUserProfile(user_id, newData) {
    try {
      const updatedUser = await knexInstance("user_profile")
        .where({ user_id })
        .update(newData)
        .returning("*");

      return updatedUser[0];
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  // update profile image of user
  async updateUserProfileImage(user_id, image_url) {
    try {
      const updatedUserImage = await knexInstance("user_profile")
        .where({ user_id })
        .update({ image_url })
        .returning("*");

      return updatedUserImage[0];
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
}

module.exports = new UserRepository();
