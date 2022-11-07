import React, { useEffect, useState } from "react";
import styles from "../styles/Manager.module.css";
import Message from "./Message";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../config/firebase";
import { Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import FileList from "./FileList";

function Manager() {
  const [isManager, setIsManager] = useState(false);
  const [messages, setMessages] = useState([]);
  //const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {

    setIsManager(true);
    getMessages();

  });

  const getMessages = async () => {
    const response = await axios.get(baseUrl + "/messages/");
    setMessages(response.data.messages);
  };

  const isMessageSavedByUser = (message) => {
    let messageSavedByUser = false;
    message.savedBy.forEach((savedByUser) => {
      if (savedByUser) {
        messageSavedByUser = true;
      }
    });
    return messageSavedByUser;
  };

  const addFileInfo = async (fName, fUrl) => {
    const postData = {
      fileName: fName,
      fileUrl: fUrl,
    };
    console.log(postData);
    try {
      const res = await axios.post(baseUrl + `/file/add`, postData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fileHandler = (e) => {
    setProgress(0);
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file.length === 0) {
      alert("Please select a file !");
    } else {
      setLoading(true);
      const storageRef = ref(storage, `/files/${file.type}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(file.name + url);
            addFileInfo(file.name, url);
            alert("Uploaded");
            setLoading(false);
          });
        }
      );
    }
  };

  const sendMessage = async () => {
    const data = {
      messageContent: inputMessage,
    };
    await axios.post(baseUrl + "/managers/send", data);
    setInputMessage("");
    await getMessages();
  };

  const ButtonStyle = { margin: "10px 10px" };
  return (
    <div className={styles.container}>
      {isManager ? (
        <>
          <div
            style={{
              width: "100%",
              paddingLeft: "10px",
              paddingTop: "10px",
              fontSize: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            Welcome Manager
          </div>
          <div className={styles.uploadDiv}>
            {/* <div className={styles.fileNameRow}>
              <span className={styles.uploadDivText}>File Name</span>
              <input
                type="text"
                onChange={(e) => setFileName(e.target.value)}
                className={styles.fileNameInput}
              ></input>
            </div> */}
            <div className={styles.fileSelectRow}>
              <span className={styles.uploadDivText}>Select file</span>
              <input
                type="file"
                onChange={fileHandler}
                className={styles.fileSelectRow}
              ></input>
            </div>
            <Button
              loading={loading}
              onClick={(e) => handleUpload(e)}
              color="green"
              appearance="primary"
              style={ButtonStyle}
            >
              Upload File
            </Button>
            <FileList />
          </div>
          <div className={styles.messagesDiv}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                style={{ flex: "4" }}
                type="text"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setInputMessage(inputValue);
                }}
              />
              <button style={{ flex: "1" }} onClick={sendMessage}>
                Send
              </button>
            </div>
            {messages.map((message) => {
              const isSaved = isMessageSavedByUser(message);
              return (
                <Message
                  key={message._id}
                  style={{ width: "100% !important" }}
                  message={message.messageContent}
                  isSaved={isSaved}
                  msgId={message._id}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div>You are not authorized to view this content</div>
      )}
    </div>
  );
}

export default Manager;
