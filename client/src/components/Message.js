import React, { useEffect, useState } from "react";
import styles from "../styles/Message.module.css";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import axios from "axios";
import baseUrl from "../config/baseUrl";

function Message({ message, isSaved, msgId }) {
  const [messageSaved, setMessageSaved] = useState(false);

  useEffect(() => {
    setMessageSaved(isSaved);
  }, [isSaved]);

  const saveMessage = async () => {
    if (!messageSaved) {
      axios
        .patch(baseUrl + `/messages/save/${msgId}`)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .patch(baseUrl + `/messages/unsave/${msgId}`)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={styles.messageDiv}>
      <div className={styles.messageDivIconRow}>
        <button
          className={styles.messageDivIconBtn}
          onClick={async (e) => {
            e.preventDefault();
            await saveMessage();
            setMessageSaved(!messageSaved);
          }}
        >
          {messageSaved ? <BsFillBookmarkFill /> : <BsBookmark />}
        </button>
      </div>
      <div className={styles.messageDivMessageRow}>{message}</div>
    </div>
  );
}

export default Message;
