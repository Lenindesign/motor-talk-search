import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Container component that applies a consistent max-width of 980px
 * Use this component to wrap content sections throughout the application
 */
const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  as: Component = "div"
}) => {
  return (
    <Component className={`max-w-[980px] mx-auto w-full ${className}`}>
      {children}
    </Component>
  );
};

export default Container;
