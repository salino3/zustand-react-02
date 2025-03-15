import { create } from "zustand";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface DataState {
  count: number;
  title: string;
  posts: Post[];
}

export interface CounterState extends DataState {
  increment: (value: number) => void;
  getPosts: () => Promise<void>;
  clearStore: () => void;
  multiply: (value: number) => void;
}

export interface CounterState {
  count: number;
  title: string;
  posts: Post[];
  increment: (value: number) => void;
  getPosts: () => Promise<void>;
  clearStore: () => void;
  multiply: (value: number) => void;
}

const initialState: DataState = {
  count: 10,
  title: "Some title",
  posts: [],
};

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
