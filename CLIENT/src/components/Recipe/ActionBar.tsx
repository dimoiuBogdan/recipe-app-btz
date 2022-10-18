import React, { FC } from "react";

type ActionBarProps = {
  isShown: boolean;
};
const ActionBar: FC<ActionBarProps> = ({ isShown }) => {
  if (!isShown) {
    return <></>;
  }

  return (
    <div className="absolute top-6 overflow-hidden shadow-md w-44 rounded-lg text-base">
      <ActionBarElement
        action={() => {
          console.log("1");
        }}
        text="Favorite"
      />
      <ActionBarElement
        action={() => {
          console.log("2");
        }}
        text="Delete"
      />
      <ActionBarElement
        action={() => {
          console.log("3");
        }}
        text="Edit"
      />
    </div>
  );
};

export default ActionBar;

type ActionBarElementProps = {
  text: string;
  action: () => void;
};
const ActionBarElement: FC<ActionBarElementProps> = ({ text, action }) => {
  return (
    <div
      onClick={action}
      className="py-1 px-2 bg-orange-200 bg-opacity-50 hover:bg-opacity-75 cursor-pointer"
    >
      <div>{text}</div>
    </div>
  );
};
