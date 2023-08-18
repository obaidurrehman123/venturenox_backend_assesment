const tenantRepositry = require("../../query_repositry/tenant_repositry/tenantRepositry");

// creating tenant
const createTenant = async (req, res) => {
  try {
    const {
      tenantname,
      address,
      city,
      state,
      country,
      zipcode,
      phone,
      weburl,
    } = req.body;
    switch (true) {
      case !tenantname:
        res
          .status(404)
          .send({ success: false, message: "tenant name is required" });
      case !address:
        res
          .status(404)
          .send({ success: false, message: "address name is required" });
      case !city:
        res
          .status(404)
          .send({ success: false, message: "city name is required" });
      case !state:
        res
          .status(404)
          .send({ success: false, message: "state name is required" });
      case !country:
        res
          .status(404)
          .send({ success: false, message: "country name is required" });
      case !zipcode:
        res
          .status(404)
          .send({ success: false, message: "zipcode is required" });
      case !phone:
        res.status(404).send({ success: false, message: "phone is required" });
      case !weburl:
        res.status(404).send({ success: false, message: "weburl is required" });
    }
    const data = {
      tenant_name: tenantname,
      address: address,
      city: city,
      state: state,
      country: country,
      zip_code: zipcode,
      phone: phone,
      web_url: weburl,
    };
    const tenantProfile = await tenantRepositry.createTenantProfile(data);
    res.status(200).json({
      success: true,
      message: "Tenant created successfully",
      data: tenantProfile,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in creating tenant", error });
  }
};

// getting All tenant Record
const getAllTenants = async (req, res) => {
  try {
    const getAllTenants = await tenantRepositry.getAllTenantProfiles();
    res.status(200).json({
      success: true,
      message: "fetched tenant profiles",
      data: getAllTenants,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "error in fetching tenants", error });
  }
};

// getting specific tenant
const getSingleTenant = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleTenant = await tenantRepositry.getTenantProfileById(id);
    if (!getSingleTenant) {
      return res.status(404).send({
        success: false,
        message: "no record is avaiable against this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "successfully fetched the record",
      getSingleTenant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in fetching single tenant",
      error,
    });
  }
};

// delete specific tenant
const deleteSpecificTenant = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteRecord = await tenantRepositry.deleteTenantProfileById(id);
    if (deleteRecord === 1) {
      return res.status(200).send({
        success: true,
        message: "successfully deleted the record",
      });
    }
    return res.status(404).send({
      success: false,
      message: "no record is deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in deleting tenant",
      error,
    });
  }
};

// update tenant
const updateTenat = async (req, res) => {
  try {
    const tenant_id = req.params.id;
    const {
      tenantname,
      address,
      city,
      state,
      country,
      zipcode,
      phone,
      weburl,
    } = req.body;
    switch (true) {
      case !tenantname:
        res
          .status(404)
          .send({ success: false, message: "tenant name is required" });
      case !address:
        res
          .status(404)
          .send({ success: false, message: "address name is required" });
      case !city:
        res
          .status(404)
          .send({ success: false, message: "city name is required" });
      case !state:
        res
          .status(404)
          .send({ success: false, message: "state name is required" });
      case !country:
        res
          .status(404)
          .send({ success: false, message: "country name is required" });
      case !zipcode:
        res
          .status(404)
          .send({ success: false, message: "zipcode is required" });
      case !phone:
        res.status(404).send({ success: false, message: "phone is required" });
      case !weburl:
        res.status(404).send({ success: false, message: "weburl is required" });
    }
    const updatedTenant = await tenantRepositry.updateTenantProfile(tenant_id, {
      tenant_name: tenantname,
      address: address,
      city: city,
      state: state,
      country: country,
      zip_code: zipcode,
      phone: phone,
      web_url: weburl,
    });
    if (!updatedTenant) {
      res.status(403).send({ success: false, message: "not updating record" });
    }
    return res.status(200).send({
      success: true,
      message: "updated record successfully",
      updatedTenant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in updating tenant",
      error,
    });
  }
};

module.exports = {
  createTenant,
  getAllTenants,
  getSingleTenant,
  deleteSpecificTenant,
  updateTenat,
};
