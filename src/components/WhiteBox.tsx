import React from "react";

interface WhiteBoxProps {
    pinkWhite: boolean; // property for use later
    
    onClick?: () => void; // 
}

const WhiteBox: React.FC<WhiteBoxProps> = ({ pinkWhite, onClick }) => { // two props
  // baseStyles
  const baseStyles = {
    width: "200px",
    height: "200px",
    backgroundColor: "pink",
    border: "1px solid black",
    borderRadius: "12px"
  }

  // dynamic (add or modify)
  const dynamicStyles = {
    ...baseStyles, // copies base styles
    backgroundColor: pinkWhite ? "pink" : "white", // using pinkWhite prop
  }

  return (
    <div style={dynamicStyles} onClick={onClick}>
    </div>
  );
};

export default WhiteBox;
