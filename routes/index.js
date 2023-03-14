var express = require("express");
var router = express.Router();

const auth_controller = require("../controllers/auth");
const user_controller = require("../controllers/user");
const post_controller = require("../controllers/post");
const chat_controller = require("../controllers/chat");
const fb_controller = require("../controllers/facebook");

// ---> Authorization Routes

// Sign up
router.post("/sign-up", auth_controller.sign_up_post);

// Sign in
router.post("/sign-in", auth_controller.sign_in_post);

// Sign out
router.get("/sign-out", auth_controller.sign_out_get);

// ---> User Routes

// User Get
router.get("/user/:id", user_controller.user_get);

// User get friends
router.get("/user/:id/friends", user_controller.user_friends_get);

// User get friends
router.get(
  "/user/:id/friend-requests",
  user_controller.user_friend_requests_get
);

// User Search
router.get("/search", user_controller.user_find);

// GET user details
router.get("/user/:id/details", user_controller.user_details_get);

// User friend request
router.put("/user/:id/friend-request", user_controller.user_friend_request);

// User friend request resolve
router.put(
  "/user/:id/friend-request/resolve",
  user_controller.user_friend_request_resolve
);

// User update profile picture url
router.put("/user/:id/img_url/update", user_controller.user_img_update);

// ---> Post Routes

// GET posts
router.get("/user/:id/posts", post_controller.posts_get);

// GET timeline posts
router.get("/user/:id/timeline-posts", post_controller.timeline_posts_get);

// GET post
router.get("/post/:id", post_controller.post_get);

// POST post
router.post("/post/create", post_controller.post_create);

// PUT post
router.put("/post/:id/update", post_controller.post_update);

// PUT Like post
router.put("/post/:id/like", post_controller.post_like);

// PUT remove like from post
router.put("/post/:id/like-remove", post_controller.post_like_remove);

// DELETE post
router.delete("/post/:id/delete", post_controller.post_delete);

// GET post comments
router.get("/post/:id/comments", post_controller.post_comments_get);

// POST comment
router.post("/post/:id/comment/create", post_controller.post_comment_create);

// Delete comment
router.delete("/comment/:id/delete", post_controller.post_comment_delete);

// ---> Chat routes

// GET find chat
router.get("/chat/find", chat_controller.chat_find);

// GET chat
router.get("/chat/:id", chat_controller.chat_get);

// GET users chats
router.get("/user/:id/chats", chat_controller.user_chats_get);

// POST chat
router.post("/chat/create", chat_controller.chat_create);

// POST message
router.post("/chat/:id/message", chat_controller.message_post);

// PUT message mark as read
router.put("/chat/:id/message/:msg_id/read", chat_controller.message_mark_read);

// PUT message mark all as read
router.put("/chat/:id/read-all", chat_controller.message_mark_read_all);

// POST Facebook Login
router.post("/login/facebook", fb_controller.fb_auth);

module.exports = router;
