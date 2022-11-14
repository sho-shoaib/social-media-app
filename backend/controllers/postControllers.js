const Post = require("../models/postModel.js");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/AppError.js");

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const data = await Post.find();

  res.status(200).json({
    data,
  });
});

exports.getPostById = catchAsync(async (req, res, next) => {
  const foundPost = await Post.findById(req.params.id);

  if (!foundPost) {
    next(new AppError(`No post found for ${req.params.id}`, 404));
    return;
  }

  res.status(200).json({
    status: "success",
    data: foundPost,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(200).json({
    status: "success",
    newPost,
  });
});

exports.deletePostById = catchAsync(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});
