import React from "react";
import CoreConcepts from "./CoreConcepts.jsx";
import Examples from "./Examples.jsx";

const Main = () => {
    // const concepts = CORE_CONCEPTS;

    return (
        <main className="font-RobotoCondensed">
            <h2 className="font-bold">Time to get started!</h2>
            <CoreConcepts />
            <Examples />
        </main>
    );
};

export default Main;
