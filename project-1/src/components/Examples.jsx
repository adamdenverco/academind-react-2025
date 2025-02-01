import React from "react";
import { EXAMPLES } from "./../data.js";
import { useState } from "react";
import Section from "./Section.jsx";
import Tabs from "./Tabs.jsx";
import TabButton from "./TabButton.jsx";

const Examples = () => {
    const examples = EXAMPLES;
    // console.log("concepts", concepts);

    let menuItems = [
        { id: 1, name: "Components", active: false },
        { id: 2, name: "State", active: false },
        { id: 3, name: "Props", active: false },
        { id: 4, name: "State", active: false },
    ];

    let tabItems = [];
    for (const [key, item] of Object.entries(examples)) {
        item.id = key;
        tabItems.push(item);
    }
    console.log("tab items", tabItems);

    const [tabContent, setTabContent] = useState(null);

    const handleSelect = (item) => {
        // console.log("hello handle select " + item.name);
        setTabContent(item);
    };

    return (
        <Section id="examples" title="Examples">
            <Tabs>
                {tabItems.map((item, index) => {
                    // console.log(item);
                    let tempTabContentTitle = tabContent
                        ? tabContent.title
                        : "";
                    return (
                        <TabButton
                            onSelect={handleSelect}
                            key={index}
                            item={item}
                            isSelected={tempTabContentTitle === item.title}
                        >
                            {item.title}
                        </TabButton>
                    );
                })}
            </Tabs>
            <div className="tab-content">
                {!tabContent ? (
                    <h3>Please select a topic</h3>
                ) : (
                    <>
                        <h3>{tabContent.title}</h3>
                        <p>{tabContent.description}</p>
                        <pre>
                            <code>{tabContent.code}</code>
                        </pre>
                    </>
                )}
            </div>
        </Section>
    );
};

export default Examples;
