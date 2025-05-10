import React from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostCard = ({ post, liked, likePost }) => {
  return (
    <div className="py-2 px-3  bg-white  border-b border-gray-100 hover:bg-gray-100 cursor-pointer">
      <Link to={`post/${post.id}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex">
            <Link to={`/account/profile/${post.UserId}`}>
              <div className="bg-gray-200 py-1 px-2 mr-2 rounded-full text-xs">
                {post.username[0]}
              </div>
            </Link>
            <div>{post.username}</div>
          </div>
          <div className="text-gray-400 text-xs ">
            {post.createdAt.slice(0, 10)}
          </div>
        </div>
        <div className="text-lg font-bold my-2 leading-tight">{post.title}</div>
        <div className="text-sm leading-tight line-clamp-3">
          {post.postText}
        </div>
      </Link>
      <div className="flex gap-x-2 items-center">
        <div
          onClick={() => {
            likePost(post.id);
          }}
        >
          {liked ? (
            <FaThumbsUp size={16} color="blue" />
          ) : (
            <FaRegThumbsUp size={16} />
          )}
        </div>
        <div>{post.Likes.length}</div>
      </div>
    </div>
  );
};

export default PostCard;
