//----------Header--------------------
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const helpers = require('./helpers/helpers');
const Job = require('./models/Job');
//----------Header--------------------

//Mongoose connct
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, () => {console.log('Conected to DB!')})

const insertNameAndPosition = async () => {
    const fullFileData = require('./data.json');
    let insertionData = [];

    //Go going through every company's data
    fullFileData.map(companyData => {

        //Go through every Rocketreach profile
        companyData.data.map(individualData => {    

            //Get the name, position and company and push it in the global array
            insertionData.push(helpers.getJobDataFromString(individualData, companyData.company));
        })
    })

    let result = await Job.insertMany(insertionData);
    if(!Array.isArray(result)) console.log("Error, the data folder is empty or an unknown error occured!");
    else console.log("Succesfully inserted in the database!")
}

insertNameAndPosition();