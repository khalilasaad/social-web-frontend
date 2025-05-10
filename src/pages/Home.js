import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setlikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/account/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          setPosts(res.data.data.posts);
          setlikedPosts(
            res.data.data.likedPosts.map((e) => {
              return e.PostId;
            })
          );
        });
    }
  }, []);

  const likePost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        {
          PostId: postId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setPosts(
            posts.map((post) => {
              if (post.id === postId) {
                if (res.data.liked) {
                  return { ...post, Likes: [...post.Likes, 0] };
                } else {
                  const temp = post.Likes;
                  temp.pop();
                  return { ...post, Likes: temp };
                }
              } else {
                return post;
              }
            })
          );
          if (likedPosts.includes(postId)) {
            setlikedPosts(
              likedPosts.filter((id) => {
                return id !== postId;
              })
            );
          } else {
            setlikedPosts([...likedPosts, postId]);
          }
        }
      });
  };

  return (
    <div className="flex flex-col ">
      <div className="  border-t border-gray-100">
        {posts.map((value, key) => {
          return (
            <PostCard
              key={key}
              post={value}
              liked={likedPosts.includes(value.id)}
              likePost={likePost}
            />
          );
        })}
        {authState.logged && (
          <Link to="/createpost">
            <div className=" fixed bottom-6 right-6 bg-blue-600 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xl sm:text-3xl shadow-lg hover:bg-blue-700 transition">
              +
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
