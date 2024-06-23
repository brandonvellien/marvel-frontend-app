import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

//composant
import Header from "./components/Header";
//pages
import Characters from "./pages/Characters";
import CharacterComics from "./pages/Character";
import Comics from "./pages/Comics";
import Home from "./pages/Home";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters search={search} />} />
        <Route path="/comics/:characterId" element={<CharacterComics />} />
        <Route path="/comics" element={<Comics search={search} />} />
      </Routes>
    </Router>
  );
}

export default App;
