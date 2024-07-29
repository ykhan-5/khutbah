import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";

const CreateKhutbah = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollectionRef = collection(db, "Khutbahs");

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title: title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/"); //naviagte back home iafter
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  return (
    <div className="createPostPage">
      {" "}
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGp">
          <labell>Title:</labell>
          <input
            placeholder="Title.."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp"></div>
        <labell>Post:</labell>
        <textarea
          placeholder="Start Typing..."
          onChange={(event) => {
            setPostText(event.target.value);
          }}
        />
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreateKhutbah;
