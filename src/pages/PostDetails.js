import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaPencilAlt,
  FaRegTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../helpers/AuthContext";

const PostDetails = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [like, setLike] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setPost(res.data.post);
        setLike(res.data.liked);
        setLoading(false);
      });
    axios.get(`http://localhost:3001/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          comment: commentInput,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          console.log("success");
          const newComment = commentInput;
          setComments([
            ...comments,
            {
              comment: newComment,
              username: authState.username,
              id: res.data.data.id,
            },
          ]);
          setCommentInput("");
        }
      });
  };

  const deletePost = () => {
    axios.delete(`http://localhost:3001/posts/${id}`).then((res) => {
      if (res.data.success) {
        toast.success("Post deleted");
        navigate("/");
      }
    });
  };

  const deleteComment = async (id) => {
    const res = await axios.delete(`http://localhost:3001/comments/${id}`);
    if (res.data.success) {
      toast.success("Comment deleted");
      setComments(
        comments.filter((comment) => {
          return comment.id !== id;
        })
      );
    }
  };

  const likePost = () => {
    axios
      .post(
        "http://localhost:3001/likes",
        {
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setLike(res.data.liked);
        }
      });
  };

  return loading ? (
    <div>loading......</div>
  ) : (
    <div>
      <div className="p-3 border-b border-gray-[300]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-200 py-2 px-4 mr-4 rounded-full text-lg">
              {post.username[0]}
            </div>
            <div className="text-xl">{post.username}</div>
          </div>
          <div className="text-gray-400 text-md ">
            {post.createdAt.slice(0, 10)}
          </div>
        </div>
        <div className="text-3xl font-bold my-2 leading-tight">
          {post.title}
        </div>
        <div className=" text-lg">{post.postText}</div>
        <div className="flex justify-between mt-2">
          <div onClick={likePost} className="flex gap-x-2 items-center">
            {like ? (
              <FaThumbsUp className="cursor-pointer" size={24} color="blue" />
            ) : (
              <FaRegThumbsUp className="cursor-pointer" size={24} />
            )}
            <div>{post.Likes.length}</div>
          </div>
          {authState.username == post.username && (
            <div className="flex gap-x-1 cursor-pointer">
              {/* <FaPencilAlt size={20} />
              <p className="text-sm pr-2 border-r-2 border-gray-400">Edit</p> */}
              <FaRegTrashAlt color="red" size={20} onClick={deletePost} />
              <p className="text-red-400 text-sm ">Delete</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex pt-2 px-2">
        <input
          type="text"
          placeholder="Enter comment"
          value={commentInput}
          className="border p-2 flex-1"
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
        ></input>
        <button
          className="bg-blue-700 hover:bg-blue-600 text-white px-2 ml-1"
          onClick={addComment}
        >
          Add Comment
        </button>
      </div>
      {comments.length > 0 &&
        comments.map((comment, key) => (
          <div>
            <div key={key} className="p-2 border border-gray-200 rounded m-2">
              <div className="flex items-center mb-2">
                <div className="bg-gray-200 py-1 px-2 mr-1 rounded-full text-xs">
                  {comment.username[0]}
                </div>
                <div className="text-md">{comment.username}</div>
              </div>
              <div className="flex justify-between">
                {comment.comment}
                {authState.username == comment.username &&
                  comment.id != null && (
                    <FaRegTrashAlt
                      className="cursor-pointer"
                      color="red"
                      size={20}
                      onClick={() => deleteComment(comment.id)}
                    />
                  )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostDetails;
