import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { CounterState, initialState, Post } from "./interface";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCounterStore = create<CounterState>()(
  persist(
    immer((set, get) => ({
      ...initialState,
      increment: (value) =>
        set((state) => ({
          count: state.count + value,
        })),
      getPosts: async () => {
        const posts = await (
          await fetch("https://jsonplaceholder.typicode.com/posts/")
        )?.json();
        set((state) => ({
          ...state,
          posts,
        }));
      },
      clearStore: () => {
        set((state) => ({
          ...initialState,
          increment: state.increment,
          getPosts: state.getPosts,
          clearStore: state.clearStore,
          multiply: state.multiply,
        }));
        //   , replace, false for default
      },
      multiply: (value: number) => {
        // const count = get().count
        const { count } = get();
        set({ count: count * value });
      },
      updatePostTitle: (postId: number, newTitle: string) =>
        set((state: CounterState) => {
          const postIndex = state.posts.findIndex(
            (post: Post) => post.id === postId
          );
          if (postIndex !== -1) {
            state.posts[postIndex].title = newTitle;
          }
        }),
    })),
    {
      name: "counter-storage",
      //* Storage in localStorage for default, also without include the parameter.
      storage: createJSONStorage(() => sessionStorage),
      //* For default 'persist' saves all object and arrays
      partialize: (state) => ({ count: state.count, title: state.title }),
    }
  )
);

// Selector for avoid rerender
export function useCounterSelector<T extends keyof CounterState>(
  ...keys: T[]
):
  | { [K in keyof CounterState]: CounterState[K] }
  | { [K in T]?: CounterState[K] } {
  if (keys.length === 0) {
    return useCounterStore(useShallow((state) => state));
  }

  const selectors: { [K in T]?: CounterState[K] } = {};

  keys.forEach((key) => {
    selectors[key] = useCounterStore(useShallow((state) => state[key]));
  });

  return selectors;
}
