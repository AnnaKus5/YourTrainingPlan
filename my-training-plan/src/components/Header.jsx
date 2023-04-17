import { Link } from "react-router-dom";

export default function Header() {

    return (
      <>
      <Link to="/">
      <header>
        <img className="logo-img" src="\images\dumbbell-color.png" alt="logo" />
        <h1 className="logo">Your Training Plan</h1>
      </header>
      </Link>
      </>
    )
}