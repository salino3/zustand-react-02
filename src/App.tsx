import { useEffect } from "react";
// import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";
import { CounterState, useCounterStore } from "./store";
import { Buttons } from "./components";
import "./App.css";

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

  const { getPosts } = useCounterStore();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="rootApp">
      <h1>
        {title}: {count}
      </h1>
      <Buttons />
      <hr />
      <div className="container">{JSON.stringify(posts)}</div>
    </div>
  );
}

export default App;
