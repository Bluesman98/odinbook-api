const User = require("../models/User");
const Chat = require("../models/Chat");

exports.user_get = function (req, res, next) {
  User.findOne({ _id: req.params.id }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    res.send(user);
  });
};

exports.user_friends_get = function (req, res, next) {
  User.find(
    {
      friend_list: { $in: [req.params.id] },
    },
    { _id: 1, first_name: 1, last_name: 1, img_url: 1 }
  ).exec(function (err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
};

exports.user_friend_requests_get = function (req, res, next) {
  User.findById(req.params.id).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    User.find(
      { _id: user.friend_requests },
      { _id: 1, first_name: 1, last_name: 1, img_url:1 }
    ).exec(function (err, users) {
      if (err) {
        return next(err);
      }
      res.send(users);
    });
  });
};

exports.user_find = function (req, res, next) {
  User.find({
    $or: [
      { first_name: { $regex: "^" + req.query.query, $options: "i" } },
      { last_name: { $regex: "^" + req.query.query, $options: "i" } },
    ],
  },{first_name:1,last_name:1,img_url:1}).exec(function (err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
};

exports.user_details_get = function (req, res, next) {
  User.findOne({ _id: req.params.id },{first_name:1,last_name:1,img_url:1}).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    res.send(user)
  });
}

exports.user_friend_request = function (req, res, next) {
  // if request has not already been made ...
  User.findOne({
    _id: req.params.id,
    friend_requests: { $nin: [req.query.user_id] },
    friend_list: { $nin: [req.query.user_id] },
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null)
      return res.send("Request already sent or already friends");
    else {
      User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { friend_requests: req.query.user_id } }
      ).exec(function (err) {
        if (err) {
          return next(err);
        }
        return res.send("Friend request sent");
      });
    }
  });
};

exports.user_friend_request_resolve = function (req, res, next) {
  User.findOne({
    _id: req.params.id,
    friend_requests: { $in: [req.query.user_id] },
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) return res.send("There is no pending request from user");
    else {
      if (req.query.accept === "true") {
        // Add user_1 to user_2 friend list
        User.findOneAndUpdate(
          { _id: req.params.id },
          {
            $pull: { friend_requests: req.query.user_id },
            $push: { friend_list: req.query.user_id },
          }
        ).exec(function (err) {
          if (err) {
            return next(err);
          }
        });
        // Add user_2 to user_1 friend list
        User.findOneAndUpdate(
          { _id: req.query.user_id },
          {
            $push: { friend_list: req.params.id },
          }
        ).exec(function (err) {
          if (err) {
            return next(err);
          }
          return res.send("Accept friend request");
        });

      } else if (req.query.accept === "false") {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { friend_requests: req.query.user_id } }
        ).exec(function (err) {
          if (err) {
            return next(err);
          }
          return res.send("Deny friend request");
        });
      }
    }
  });
};

exports.user_img_update = function (req, res, next) {
  User.findOneAndUpdate({ _id: req.params.id },{img_url: req.query.img_url}).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    res.send(user.img_url)
  });
}
