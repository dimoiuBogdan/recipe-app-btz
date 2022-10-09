import React, { FC } from "react";

const ActionBar = () => {
  return <div>ActionBar</div>;
};

export default ActionBar;

type ActionBarElementProps = {
  icon: any;
  text: string;
  shown: boolean;
  action: () => void;
};
const ActionBarElement: FC<ActionBarElementProps> = ({
  icon,
  text,
  shown,
  action,
}) => {
  if (!shown) {
    return <></>;
  }

  return (
    <div onClick={action} className="flex items-center">
      {icon}
      <div>{text}</div>
    </div>
  );
};
