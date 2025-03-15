import React from "react";
import { useCounterStore } from "../../store";
import "./buttons.styles.css";

export const Buttons: React.FC = () => {
  const { increment, getPosts, clearStore, multiply } = useCounterStore();
  console.log("Buttons");
  return (
    <div className="containerButtons">
      <button
        className="btn1"
        onClick={() => {
          increment(10);
        }}
      >
        Increment by 10
      </button>
      <button
        className="btn2"
        onClick={() => {
          clearStore();
        }}
      >
        Clear Data
      </button>

      <button
        className="btn3"
        onClick={() => {
          multiply(2);
        }}
      >
        Multuply by 2
      </button>
      <button
        className="btn4"
        onClick={() => {
          getPosts();
        }}
      >
        Call Posts
      </button>
    </div>
  );
};
