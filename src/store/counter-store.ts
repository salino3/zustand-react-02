import { create } from "zustand";
import { CounterState, initialState } from "./interface";

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
