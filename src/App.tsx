import { Graphoni } from "./lib/Graphoni";

const data = {
  values: [
    { x: 90, y: 400 },
    { x: 105, y: 500 },
    { x: 305, y: 500 },
    { x: 450, y: 400 },
    { x: 600, y: 900 },
    { x: 1000, y: 200 },
    { x: 780, y: 1050 },
  ],
};

export const App = () => {
  return <Graphoni height={500} width={1000} data={data} ySteps={20} />;
};
