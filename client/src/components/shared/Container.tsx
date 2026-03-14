import React from "react";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className='w-full max-w-298 mx-auto relative container'>{children}</div>;
};

export default Container;
