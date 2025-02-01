import React from "react";

const TabButton = ({ children, item, onSelect, isSelected }) => {
    // const handleClick = () => {
    //     console.log(item);
    // };

    return (
        <li>
            <button
                onClick={() => onSelect(item)}
                className={isSelected ? "active" : ""}
            >
                {children}
            </button>
        </li>
    );
};

export default TabButton;
