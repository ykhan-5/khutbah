import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase-config";
import { useState, useEffect } from "react";
import { auth } from "../firebase-config";

const Home = (isAuth) => {
  const [postLists, setPostLists] = useState([]); //holds posts
  const postCollectionRef = collection(db, "Khutbahs");

  useEffect(() => {
    //to retrieve info when home is rendered
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  });

  const deletePost = async (id) => {
    const postDoc = doc(db, "Khutbahs", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              {" "}
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id == auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>@ {post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
