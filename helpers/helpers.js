const fs = require('fs');

//Check if the Rocketreach Title contains the name from the filename 
const containsCompanyName = (file, data) => {
    const companyRE = /(?<=\| )[A-Za-z0-9]{1,}/g;
    console.log(data)
    //Check if the record is from a profile, if so ignore it
    if(data.includes('Profile')) return false;
    if(!data.includes('|')) return false;
    if(data.includes('Employees')) return false;
    if(data.includes('Emails')) return false;
    if(data.includes('Format')) return false;
    if(!data.includes('email')) return false;
    
    //Remove any unicode any unicode from the string (because those characters make regex break)
    data = data.replace(/\u200e/g, '');

    if (!data.match(companyRE)) return false;

    //Check if the result from the regex is equal with the file name, with removed extension
    if (data.match(companyRE)[0].toLowerCase() == removeFileExtension(file).toLowerCase()) return true;
    else return false;
}

//Remove the file extension from file name
const removeFileExtension = (fileName) => {
    return fileName.split('.').slice(0, -1).join('.')
}

const getJobDataFromString = (string, company) => {
    let agentNameRegex = /^.+?(?='s)/g;
    let agentPositionRegex = /(?<=\| \S+ ).+(?=email|( \.\.\.))/g;

    //If the Regex returns null on the name that means the record is from a company, so skip it
    if(!string.match(agentNameRegex)) return false;

    //Return the name, position if it is known and the company name
    return {name: string.match(agentNameRegex)[0], position: (string.match(agentPositionRegex) ? string.match(agentPositionRegex)[0] : 'Not known'), company: company}
}

const removeSaas = (file, dir) => {
    fs.renameSync(dir+"/"+file, dir+"/"+file.replace('saas-', ''));
    file = file.replace('saas-', '');
    return file;
}


module.exports.removeFileExtension = removeFileExtension;
module.exports.containsCompanyName = containsCompanyName;
module.exports.getJobDataFromString = getJobDataFromString;
module.exports.removeSaas = removeSaas;