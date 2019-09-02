var user = require("./user");
var devices = require('./devices');


module.exports.setRoutes = function(app) {
  user.setRoutes(app);
  devices.setRoutes(app);
 
};
