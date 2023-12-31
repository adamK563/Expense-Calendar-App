import React from "react";
import CalendarApp from "./components/CalendarApp";

function App() {
  return (
    <div className="app">
      <header className="app-header"></header>
      <main className="app-main">
        <CalendarApp />
      </main>
      <footer className="app-footer">{/* Footer content */}</footer>
    </div>
  );
}

export default App;
