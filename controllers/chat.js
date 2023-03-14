const Chat = require("../models/Chat");
const Message = require("../models/Message");
var ObjectId = require("mongodb").ObjectId;

exports.chat_find = function (req, res, next) {
  Chat.findOne({ users: { $all: req.query.users } }).exec(function (err, chat) {
    if (err) {
      return next(err);
    }
    if (chat) res.send(chat);
    else if (!chat) {
      const chat = new Chat({
        users: req.query.users,
      });
      chat.save((err) => {
        if (err) return next(err);
        res.send(chat);
      });
    }
  });
};

exports.chat_get = function (req, res, next) {
  Chat.findById(req.params.id).exec(function (err, chat) {
    if (err) {
      return next(err);
    }
    res.send(chat);
  });
};

exports.user_chats_get = function (req, res, next) {
  Chat.find({ users: { $in: req.params.id } }, { _id: 1 }).exec(function (
    err,
    chats
  ) {
    if (err) {
      return next(err);
    }
    res.send(chats);
  });
};

exports.chat_create = function (req, res, next) {
  Chat.findOne({ users: req.query.users }).exec(function (err, chat) {
    if (err) {
      return next(err);
    }
    if (chat) res.send(chat);
    else {
      const chat = new Chat({
        users: req.query.users,
      });
      chat.save((err) => {
        if (err) return next(err);
        res.send(chat);
      });
    }
  });
};

exports.message_post = function (req, res, next) {
  const message = new Message({
    author: req.query.author,
    text: req.body.text,
    date: new Date(),
    read_by: [req.query.author],
  });
  Chat.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { messages: message } }
  ).exec(function (err) {
    if (err) {
      return next(err);
    }

    res.send(message);
  });
};

exports.message_mark_read = function (req, res, next) {
  Chat.findOneAndUpdate(
    {
      _id: req.params.id,
      "messages._id": new ObjectId(req.params.msg_id),
      "messages.message.read_by": { $ne: req.query.user_id },
    },
    { $push: { "messages.$[].read_by": req.query.user_id } }
  ).exec(function (err, chat) {
    if (err) {
      return next(err);
    }
    res.send(chat);
  });
};

exports.message_mark_read_all = function (req, res, next) {
  Chat.findOneAndUpdate(
    {
      _id: req.params.id,
      "messages.message.read_by": { $ne: req.query.user_id },
    },{$push: { "messages.$[].read_by": req.query.user_id}}
  ).exec(function (err, chat) {
    if (err) {
      return next(err);
    }
    res.send(chat);
  });
};
