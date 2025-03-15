import { useShallow } from "zustand/react/shallow";
import { CounterState, useCounterStore } from "../../store";

export const Title: React.FC = () => {
  const { count, title } = useCounterStore(
    useShallow((state: CounterState) => ({
      count: state.count,
      title: state.title,
    }))
  );

  return (
    <h1>
      {title}: {count}
    </h1>
  );
};
