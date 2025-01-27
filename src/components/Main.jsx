import React from "react";
import { CORE_CONCEPTS } from "./../data.js";
import CoreConcept from "./CoreConcept";

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

export default Main;
