import React, { useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { getPopularPosts, getPosts, getTags } from "../redux/slices/posts";
import axios from "../axios";
import { getOneComment } from "../redux/slices/commentsSlice";

export const Home = () => {
  const [comment, setComment] = React.useState([]);
  const { comments, statusGet } = useSelector((state) => state.comments);
  const value = React.useRef(0);

  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.authLogin.data);

  const isPostsLoading = posts.status === "loading";
  const isPostSuccess = posts.status === "success";
  const isTagsLoading = tags.status === "loading";
  const length = comments.length;

  React.useEffect(() => {
    dispatch(getPosts());
    dispatch(getTags());
    // dispatch(getOneComment(1))
  }, []);

  const changePostHandler = (category) => {
    category === 1 ? dispatch(getPopularPosts()) : dispatch(getPosts());
    value.current = category;
  };

  console.log(posts);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value.current}
        // ref={value}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={() => changePostHandler(0)} />
        <Tab label="Популярные" onClick={() => changePostHandler(1)} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl
                    ? `${
                        process.env.REACT_APP_API_URL || "http://localhost:4444"
                      }${obj.imageUrl}`
                    : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                // commentsCount={length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={comment.map((item) => {
              return [
                {
                  user: {
                    fullName: "",
                    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                  },
                  text: item.comment,
                },
                {
                  user: {
                    fullName: "Иван Иванов",
                    avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                  },
                  text: item.comment,
                },
              ];
            })}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
