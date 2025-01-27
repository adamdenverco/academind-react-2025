import React from "react";
import logo from "./../../assets/images/react-core-concepts.png";
import "./Header.css";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

const genRandomInt = (max) => {
    return Math.floor(Math.random() * (max + 1));
};

const titleWord = reactDescriptions[genRandomInt(2)];

const Header = () => {
    return (
        <header className="font-RobotoCondensed text-center">
            <img className="inline" src={logo} alt="Stylized atom" />
            <h1 className=" font-bold">React Essentials</h1>
            <p className="">
                {titleWord} React concepts you will need for almost any app you
                are going to build!
            </p>
        </header>
    );
};

export default Header;
