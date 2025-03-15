import React, { memo } from "react";
import { useCounterSelector } from "../../store";

export const Title: React.FC = memo(() => {
  //   const title = useCounterStore(useShallow((state) => state.title));

  const items = useCounterSelector("title", "count", "increment");
  // This option is valid too
  //   const { title, posts, count, increment } = useTitlePostsSelector(
  //     "title",
  //     "posts",
  //     "count",
  //     "increment"
  //   );
  // Or unother option for import all state
  //   const state = useCounterSelector( );

  console.log("Items", items);

  return (
    <h1>
      {items.title} : {items?.count} -{" "}
      <button
        className="btn1"
        onClick={() => {
          items && items.increment && items.increment(10);
        }}
      >
        Increment by 10
      </button>
    </h1>
  );
});
