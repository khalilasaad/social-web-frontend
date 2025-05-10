import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const Profile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios.get(
        `http://localhost:3001/auth/getProfile/${id}`
      );
      setUser(user.data.userDetails);

      const posts = await axios.get(`http://localhost:3001/posts/byUser/${id}`);
      setPosts(posts.data);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center ">
          <ScaleLoader color="#d1d5db" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="p-6 border-b flex items-center">
            <div className="bg-gray-200 w-12 h-12 mr-2 rounded-full font-bold text-2xl flex items-center justify-center">
              {user.username[0].toUpperCase()}
            </div>
            <p className="font-bold text-2xl">{user.username}</p>
          </div>
          {posts.map((post, key) => {
            return (
              <div
                key={key}
                className="py-2 px-3  bg-white  border-b border-gray-100"
              >
                {/* <Link to={`post/${post.id}`}> */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex">
                    <div className="bg-gray-200 py-1 px-2 mr-2 rounded-full text-xs">
                      {post.username[0]}
                    </div>
                    <div>{post.username}</div>
                  </div>
                  <div className="text-gray-400 text-xs ">
                    {post.createdAt.slice(0, 10)}
                  </div>
                </div>
                <div className="text-lg font-bold my-2 leading-tight">
                  {post.title}
                </div>
                <div className="text-sm leading-tight line-clamp-3">
                  {post.postText}
                </div>
                {/* </Link> */}
                {/* <div className="flex gap-x-2 items-center">
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
                </div> */}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Profile;
