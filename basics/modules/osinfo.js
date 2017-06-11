//require the node module "os" here
//the module offers functions such as platform(), freemem(),uptime(),...
const os = require('os');

const printSystemInfo = () => {
    //let this function at least log the current platform and the currently available memory
    console.log(os.platform(), os.freemem());
};

//export the printSystemInfo-function
module.exports = {
    printSystemInfo
};