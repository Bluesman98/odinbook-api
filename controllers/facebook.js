const User = require("../models/User");

exports.fb_auth = function (req, res, next) {
  User.findOne({ facebook_id: req.body.id }).exec(function (err, user) {
    if (err) {
      res.send(err);
    }
    if (user === null) {
      const user = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        img_url: req.body.img_url,
        facebook_id: req.body.id,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        }
        res.send(user);
      });
    } else {
      res.send(user);
    }
  });
};
