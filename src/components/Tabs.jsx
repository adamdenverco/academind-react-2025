import React from "react";

const Tabs = ({ children, tabsContainer = "menu", ...props }) => {
    const TabsContainer = tabsContainer;
    return <TabsContainer>{children}</TabsContainer>;
};

export default Tabs;
