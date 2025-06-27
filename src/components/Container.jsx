import React from "react";

const Container = ({ children, className = "" }) => <div className={`container ${className}`.trim()}>{children}</div>;

export default Container;
