import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { db } from "../firebase-config";
import { useState, useEffect } from "react";

const Home = () => {
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

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader"></div>{" "}
            <div className="title">
              <h1>{post.title}</h1>
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
