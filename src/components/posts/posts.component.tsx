import React from "react";
import { Post } from "../../store";

export const Posts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  console.log("Posts");

  return <div className="container">{JSON.stringify(posts)}</div>;
};
