import React from "react";
import { Post } from "../../store";

export const Posts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return <div className="container">{JSON.stringify(posts)}</div>;
};
