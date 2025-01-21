import React from "react";

const Header = () => {
    return (
        <header className="font-RobotoCondensed text-center">
            <img
                className="inline"
                src="src/assets/images/react-core-concepts.png"
                alt="Stylized atom"
            />
            <h1 className=" font-bold">React Essentials</h1>
            <p className="">
                Fundamental React concepts you will need for almost any app you
                are going to build!
            </p>
        </header>
    );
};

const Main = () => {
    return (
        <main className="font-RobotoCondensed">
            <h2 className="font-bold">Time to get started!</h2>
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
