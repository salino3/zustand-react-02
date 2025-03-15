import { useEffect } from "react";
// import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";
import { CounterState, useCounterStore } from "./store";
import { Buttons, Posts, Title } from "./components";
import "./App.css";

function App() {
  //* Old code zustand
  // const { count, title } = useCounterStore(
  //   (state: CounterState) => ({ count: state.count, title: state.title }),
  //   shallow
  // );

  // const count = useCounterStore((state) => state?.count);
  // const title = useCounterStore((state) => state?.title);
  const { posts } = useCounterStore(
    useShallow((state: CounterState) => ({
      posts: state.posts,
    }))
  );

  const { getPosts } = useCounterStore();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="rootApp">
      <Title />
      <Buttons />
      <hr />
      <Posts posts={posts} />
    </div>
  );
}

export default App;
