/* eslint-disable react/prop-types */
const StateCard = ({ message, bgColor }) => {
  return (
    <div
      className={`max-w-80 w-80 h-auto ${bgColor} rounded-2xl mt-4 px-5 py-10`}
    >
      <p className="px-5 text-sm text-center">{message}</p>
    </div>
  );
};

export default StateCard;
