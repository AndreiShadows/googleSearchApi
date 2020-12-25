//----------Header--------------------
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const helpers = require('./helpers/helpers');
const Job = require('./models/Job');
//----------Header--------------------

const readDir = async (dir) => {
    let filePath, data;

    fs.readdir(dir, async (err, files) => {
        let fullData = [];

        //Map through each individual folder in the dir directory
        files.map((file) => {
            //If the file contains 'saas-', rename it with a propper name (exlude "saas-" to be more specific)
            if(file.includes('saas-')) file = helpers.removeSaas(file, dir);

            //Get the data from file and delete all props except the title
            data = require(`${dir}/${file}`);
            data = data.map(row => row.title);
            

            //Check if the record contains the company name from the file name
            data = data.filter(row => helpers.containsCompanyName(file, row))

            //Construct a new object based on the copmany's name and the data proccesed above
            let dataFromFile = {
                company: helpers.removeFileExtension(file),
                data: data,
            }

            //Push it in the array constructed above, witch later will be saved in a .json file
            fullData.push(dataFromFile);
        })

        //Make the result JSON and insert in the data.json file, witch respresents the final data .
        fullData = JSON.stringify(fullData);
        fs.writeFile('data.json', fullData, (err) => {console.log('Succes !')});
    })
    return true;
}

readDir('./data');
