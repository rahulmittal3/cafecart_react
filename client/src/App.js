import "./App.css";

//importing React-Compnents..........
import { Route, Routes } from "react-router-dom";

//importing pages........
import AboutUs from "./Pages/AboutUs.js";
import Blogs from "./Pages/Blogs.js";
import Coffee from "./Pages/Coffee.js";
import Machine from "./Pages/Machine.js";
import Pods from "./Pages/Pods.js";
import Root from "./Pages/Root.js";
function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Root />} />
      <Route path="/pages/about-us" exact element={<AboutUs />} />
      <Route path="/products/category/coffee" exact element={<Coffee />} />
      <Route path="/products/category/pods" exact element={<Pods />} />
      <Route path="/products/category/machine" exact element={<Machine />} />
      <Route path="/blog" exact element={<Blogs />} />
    </Routes>
  );
}

export default App;
