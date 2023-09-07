import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/slices/commentsSlice";

export const Index = () => {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const { id } = useParams();

  const addCommentHandler = async () => {
    try {
      if (!value) {
        return;
      }
      const data = { id, value };
      // axios.post(`/posts/${id}`, { value });
      dispatch(addComment(data));
      setValue("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(value);
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            multiline
            fullWidth
          />
          <Button onClick={addCommentHandler} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
