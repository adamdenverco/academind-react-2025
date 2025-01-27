import React from "react";

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

export default CoreConcept;
