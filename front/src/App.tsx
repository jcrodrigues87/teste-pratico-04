import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListProviders } from "./pages/ListProviders";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/providers"
            element={<ListProviders />}
          ></Route>
          <Route
            path="/register"
            element={<Register />}
          ></Route>
          <Route
            path="/"
            element={<Home />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
