import "./App.css";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import CarouselPage from "./pages/CarouselPage";
import FormPage from "./pages/FormPage";
import NoMatch from "./pages/NoMath";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="carousel" element={<CarouselPage />} />
          <Route path="form" element={<FormPage />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
