const express = require("express");

const Company = require("../models/company");

const router = express.Router();


// ADD COMPANY
 
router.post("/", async (req, res) => {

  try {

    const {
      name,
      description,
      website,
      location,
      email,
      contact,
      mobile
    } = req.body;


    // CHECK REQUIRED INPUT

    if (!name) {

      return res.status(400).json({
        status: "Error",
        message: "Company name is required"
      });

    }


    // FIND LAST COMPANY ID

    const lastCompany = await Company
      .findOne()
      .sort({ companyId: -1 });


    // CREATE NEW COMPANY ID
    
            const companyId =
            "COMP" +
            Date.now() +
            Math.floor(Math.random() * 1000);


    // CREATE COMPANY

    const company = new Company({

      companyId: companyId,

      name: name.trim(),

      description: description || "",

      website: website || "",

      location: location || "",

      email: email || "",

      contact: contact || "",

      mobile: mobile || ""

    });


    // SAVE COMPANY

    await company.save();


    console.log("================================");
    console.log("COMPANY ADDED");
    console.log("Company ID:", companyId);
    console.log("Company:", company.name);
    console.log("================================");


    // SUCCESS

    return res.status(201).json({

      status: "Success",

      message: "Company added successfully",

      company: {

        companyId: company.companyId,

        name: company.name,

        description: company.description,

        website: company.website,

        location: company.location,

        email: company.email,

        contact: company.contact,

        mobile: company.mobile

      }

    });


  } catch (error) {

    console.error(
      "ADD COMPANY ERROR:",
      error
    );


    return res.status(500).json({

      status: "Error",

      message: "Server error while adding company"

    });

  }

});


// GET ALL COMPANIES
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    return res.status(200).json(companies);
  } catch (error) {
    console.error("GET COMPANIES ERROR:", error);
    return res.status(500).json({
      message: "Unable to fetch companies",
      error: error.message
    });
  }
});

module.exports = router;