import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CheckCats from "./pages/CheckCats";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="CheckCats" element={<CheckCats />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
