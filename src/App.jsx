import React from "react";
import logo from "./assets/images/react-core-concepts.png";
import { CORE_CONCEPTS } from "./data.js";

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

const CoreConcept = ({ concept }) => {
    console.log("concept", concept);
    return (
        <li>
            <img src={concept.image} alt={concept.title} />
            <h3>{concept.title}</h3>
            <p>{concept.description}</p>
        </li>
    );
};

const Main = () => {
    const concepts = CORE_CONCEPTS;
    console.log("concepts", concepts);

    return (
        <main className="font-RobotoCondensed">
            <h2 className="font-bold">Time to get started!</h2>
            <section id="core-concepts">
                <h2>Core Concepts</h2>
                <ul>
                    {concepts.map((concept, index) => {
                        return <CoreConcept key={index} concept={concept} />;
                    })}
                </ul>
            </section>
        </main>
    );
};

const App = () => {
    return (
        <div>
            <Header />
            <Main />
        </div>
    );
};

export default App;
