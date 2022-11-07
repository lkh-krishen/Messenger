import React, { useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios";
import baseUrl from "../config/baseUrl";

function Worker() {
  const [isWorker, setIsWorker] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    setIsWorker(true);
    getMessages();
  }
  );

  const getMessages = async () => {
    const response = await axios.get(baseUrl + "/messages/");
    setMessages(response.data.messages);
  }

  const isMessageSavedByUser = (message) => {
    let messageSavedByUser = false;
    message.savedBy.forEach((savedByUser) => {
      if (savedByUser) {
        messageSavedByUser = true;
      }
    });
    return messageSavedByUser;
  };

  return isWorker ? (
    <>
      <div
        style={{
          paddingLeft: "10px",
          paddingTop: "10px",
          fontSize: "1.5rem",
        }}
      >
        Welcome Worker
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          marginLeft: "5%",
          marginRight: "5%"
        }}
      >
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
  );
}

export default Worker;
