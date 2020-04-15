const dataLayerServicesModule = require('./dataLayerServicesModule');
const MIN_STR_LENGTH = 3;

const serverServicesModule = {
    getResults : function (str,cb){
        if(str <= MIN_STR_LENGTH){
            cb(new TypeError("Invalid argument: String length should be at least 3 characters"));
        }else{
            dataLayerServicesModule.getData(str,cb);
        }
    }
}

module.exports = serverServicesModule;