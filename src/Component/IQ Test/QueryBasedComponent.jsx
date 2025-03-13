import { useLocation } from "react-router-dom";
import TestCard from "./TestCard";
import TestResult from "./TestResult";

const ComponentA = () => <h2>Component A</h2>;

const QueryBasedComponent = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const type = query.get("type");

  const componentMap = {
    A: <ComponentA />,
    result: <TestResult />,
  };

  return componentMap[type] || <TestCard />;
};

export default QueryBasedComponent;