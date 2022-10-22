import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center text-2xl">
      <div>LOADING...</div>
      <FaSpinner className="animate-spin" />
    </div>
  );
};

export default Loading;
