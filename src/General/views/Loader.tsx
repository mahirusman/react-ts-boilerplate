import React from "react";

const Loader: React.FC<{
  display: boolean;
}> = (props) => {
  const { display } = props;
  return display ? (
    <div className="overlay">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
};

export default Loader;
