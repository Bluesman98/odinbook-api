const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

// Posts
exports.posts_get = function (req, res, next) {
    Post.find({author_id:req.params['id']})
      .sort({ date: -1 })
      .populate("date")
      .exec(function (err, list_posts) {
        if (err) {
          return next(err);
        }
        res.send(list_posts);
      });
  }

exports.timeline_posts_get  = function (req, res, next) {
  User.findOne({_id:req.params.id}).exec(function(err,user){
    if(err){
      return next(err)
    }
    if(user===null) res.send("Could not find user")
    let users = user.friend_list
    users.push(req.params.id)
    Post.find({author_id: users})
    .sort({ date: -1 })
    .populate("date")
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      res.send(list_posts);
    });
  
  })

}

exports.post_get = function (req, res, next) {
    Post.findOne({ _id: req.params.id }).exec(function (err, post) {
      if (err) {
        return next(err);
      }
      res.send(post)
    });
  }

exports.post_create = function (req, res, next) {
    const post = new Post({
      author_id: req.query.user,
      author_name: req.body.name,
      content: req.body.content,
      date: new Date(),
    })
    post.save((err) => { 
      if (err) {
        return next(err);
      }  
     res.send(post)
    });
  }

exports.post_update = function (req, res, next) {
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { content: req.query.content },
      function (err) {
        if (err) {
          res.send(err);
        } else {
          res.send("Post Update");
        }
      }
    );
  }

  exports.post_like = function (req, res, next) {
    Post.findOneAndUpdate(
      { _id: req.params.id, likes: { $nin: [req.query.user_id] }, },
      { $push: { likes: req.query.user_id } },
      function (err) {
        if (err) {
          res.send(err);
        } 
        else {
          res.send(`Post liked by user with id : ${req.query.user_id}`);
        }
      }
    );
  }

  exports.post_like_remove = function (req, res, next) {
    Post.findOneAndUpdate(
      { _id: req.params.id, likes: { $in: [req.query.user_id] }, },
      { $pull: { likes: req.query.user_id } },
      function (err) {
        if (err) {
          res.send(err);
        } 
        else {
          res.send(`like removed from post by user with id : ${req.query.user_id}`);
        }
      }
    );
  }

exports.post_delete = function (req, res, next) {
    Post.findOneAndDelete({ _id: req.params.id }, function (err) {
      if (err) {
        res.send(err);
      } else {
        //delete all comments related to the post
        Comment.deleteMany({ post_id: req.params.id }, function (err) {
          if (err) {
            res.send(err);
          } else {
            res.send("Deleted post and all related comments");
          }
        });
      }
    });
  }

// Comments
exports.post_comments_get = function (req, res, next) {
    Comment.find({ post_id: req.params.id })
      .sort({ title: 1 })
      .exec(function (err, list_comments) {
        if (err) {
          return next(err);
        }
        res.send(list_comments);
      });
  }

exports.post_comment_create = function (req, res, next) {
    const comment = new Comment({
      post_id: req.params.id,
      author_id: req.query.author_id,
      author_name: req.query.author_name,
      content: req.body.content,
      date: new Date(),
    });
    comment.save((err) => {
      if (err) {
        return next(err);
      } else res.send(comment);
    });
  }

exports.post_comment_delete = function (req, res, next) {
    Comment.findOneAndDelete({ _id: req.params.id }, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Deleted comment");
      }
    });
  }