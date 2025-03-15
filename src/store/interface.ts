export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface DataState {
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

//
export const initialState: DataState = {
  count: 10,
  title: "This is a counter",
  posts: [],
};
