import NavBar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* <Route path="/body" ele ment={<Body />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
