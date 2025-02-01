import React from "react";
import { CORE_CONCEPTS } from "./../data.js";
import CoreConcept from "./CoreConcept";
import Section from "./Section.jsx";

const CoreConcepts = () => {
    const concepts = CORE_CONCEPTS;

    return (
        <Section id="core-concepts" title="Core Concepts">
            <ul>
                {concepts.map((concept, index) => {
                    return <CoreConcept key={index} concept={concept} />;
                })}
            </ul>
        </Section>
    );
};

export default CoreConcepts;
