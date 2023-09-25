import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { getOneComment } from "../redux/slices/commentsSlice";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [item, setItem] = React.useState();
  const [count, setCount] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(true);
  const { comments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
        console.error(err);
      });
    dispatch(getOneComment(id));
    setCount(comments);
  }, [dispatch]);
  console.log(item);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl ? `${process.env.REACT_APP_API_URL || "http://localhost:4444/"}${data.imageUrl}` : ""
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>

      <CommentsBlock items={comments ? comments : []} isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
