import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

import AuthContext from "../store/authContext";

const Profile = () => {
  const { userId, token } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  const API_URL = "http://localhost:4000";

  const getUserPosts = useCallback(() => {
    axios
      .get(`${API_URL}/userposts/${userId}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  const updatePost = (id, status) => {
    axios
      .put(
        `${API_URL}/posts/${id}`,
        { status: !status },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        getUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`${API_URL}/posts/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(() => {
        getUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedPosts = posts.map((post) => {
    return (
      <div key={post.id} className="post-card">
        <h2>{post.title}</h2>
        <h4>{post.user.username}</h4>
        <p>{post.content}</p>
        {userId === post.userId && (
          <div>
            <button
              className="form-btn"
              onClick={() => updatePost(post.id, post.privateStatus)}
            >
              {post.privateStatus ? "make public" : "make private"}
            </button>
            <button
              className="form-btn"
              style={{ marginLeft: 10 }}
              onClick={() => deletePost(post.id)}
            >
              delete post
            </button>
          </div>
        )}
      </div>
    );
  });

  return mappedPosts.length >= 1 ? (
    <main>{mappedPosts}</main>
  ) : (
    <main>
      <h1>You haven't posted yet!</h1>
    </main>
  );
};

export default Profile;
