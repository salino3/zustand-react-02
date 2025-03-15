import { useEffect } from "react";
// import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";
import { CounterState, useCounterStore } from "./store";

function App() {
  //* Old code zustand
  // const { count, title } = useCounterStore(
  //   (state: CounterState) => ({ count: state.count, title: state.title }),
  //   shallow
  // );

  // const count = useCounterStore((state) => state?.count);
  // const title = useCounterStore((state) => state?.title);
  const { count, title, posts } = useCounterStore(
    useShallow((state: CounterState) => ({
      count: state.count,
      title: state.title,
      posts: state.posts,
    }))
  );

  const { increment, getPosts, clearStore, multiply } = useCounterStore();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="rootApp">
      <h1>
        {title}: {count}
      </h1>
      <button
        onClick={() => {
          increment(10);
        }}
      >
        Increment by 10
      </button>
      <button
        onClick={() => {
          clearStore();
        }}
      >
        Clear
      </button>

      <button
        onClick={() => {
          multiply(2);
        }}
      >
        Multuply by 2
      </button>
      <hr />
      <div className="container">{JSON.stringify(posts)}</div>
    </div>
  );
}

export default App;
