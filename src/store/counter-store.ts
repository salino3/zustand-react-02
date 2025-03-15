import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { CounterState, initialState, Post } from "./interface";
import { useCallback } from "react";

export const useCounterStore = create<CounterState>((set, get) => ({
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
}));

// Selector for avoid rerender
export const useCounterSelector = <T extends keyof CounterState>(
  ...keys: T[]
) => {
  const selectors: { [K in T]?: CounterState[K] } = {};

  keys.forEach((key) => {
    selectors[key] = useCounterStore(useShallow((state) => state[key]));
  });

  return selectors;
};
