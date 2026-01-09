import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

const Body = () => {
  return (
    <div>
      hii
      <NavBar />
      <Outlet />
    </div>
  );
};
export default Body;
