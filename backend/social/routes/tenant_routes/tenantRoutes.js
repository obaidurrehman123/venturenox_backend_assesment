const express = require("express");
const router = express.Router();
const {
  createTenant,
  getAllTenants,
  getSingleTenant,
  deleteSpecificTenant,
  updateTenat,
} = require("../../controllers/tenant_controllers/tenantController");

// @desc        create tenant
// route        localhost:4000/api/v1/tenant/createtenant
// method       post

router.post("/createtenant", createTenant);

// @desc        get All tenants
// route        localhost:4000/api/v1/tenant/getAllData
// method       get

router.get("/getAllData", getAllTenants);

// @desc        get Single tenants
// route        localhost:4000/api/v1/tenant/getSingleRecord/ required id
// method       get

router.get("/getSingleRecord/:id", getSingleTenant);

// @desc        delete tenants
// route        localhost:4000/api/v1/tenant/deleteTenant/ required id
// method       delete

router.delete("/deleteTenant/:id", deleteSpecificTenant);

// @desc        update tenants
// route        localhost:4000/api/v1/tenant/updateRecord/ required id
// method       patch

router.patch("/updateRecord/:id", updateTenat);

module.exports = router;
