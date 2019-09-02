
var Devices = require("../models/DeviceModel");
const passport = require("passport");

module.exports.setRoutes = function(app) {
 
 

  //Get the Devices (Protected Routes only if the person is logged in)
  app.post('/createDevices',
   (req, res) => {
    console.log(req.body);
    const devices = new Devices({
      name: req.body.name,
      deviceOS: req.body.deviceOS,
      extrainfo: req.body.extrainfo,
      status: req.body.status,
      action: req.body.action
    });

    devices.save(function(err) {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json({ msg: "Device created Successfully" });
    });
   
  });


  //Create the devices
  app.get('/getDevices', (req,res)=>{
    Devices.find()
    .sort({ createdAt: -1 })
    .then(devices => {
      res.status(200).json(devices);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  })


  app.put("updateDevice/:id",passport.authenticate("jwt", { session: false }), () => {
    Devices.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
      err,
      task
    ) {
      if (err) return res.status(404).json(err);
      res.status(200).json({ msg: "Device udpated." });
    });
  });


  // Only the logged in User can delete the Device
  app.delete("deleteDevice/:id",passport.authenticate("jwt", { session: false }),() => {

    console.log(req.params.id);
    Devices.findByIdAndRemove(req.params.id)
    .then(device => {
        if(!device) {
            return res.status(404).send({
                message: "Device not found with id " + req.params.id
            });
        }
        res.send({message: "Device deleted successfully!"});
    }).catch(err => {
        
        return res.status(500).send({
            message: "Could not delete Device with id " + req.params.id
        });
    });
  });


};
