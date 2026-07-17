import React from "react";

/**
 * Every section AND the header use this component for horizontal padding.
 * Change spacing once here and it stays consistent across the whole site.
 */
const Container = ({ as: Tag = "div", className = "", children }) => (
  <Tag className={`max-w-6xl mx-auto px-6 md:px-10 lg:px-16 ${className}`}>
    {children}
  </Tag>
);

export default Container;