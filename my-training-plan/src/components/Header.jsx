import { Link, Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Header() {

    return (
      <>
      <Link to="/">
      <header>
        <img className="logo-img" src="src\images\dumbbell-color.png" alt="logo" />
        <h1 className="logo">Your Training Plan</h1>
      </header>
      </Link>
      </>
    )
}