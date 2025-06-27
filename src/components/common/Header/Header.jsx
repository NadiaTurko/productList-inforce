import inforceLogo from "../../../assets/inforce.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <img src={inforceLogo} alt="Logo" className="logo" />
      <nav>
        <Link to="/" className="home-link">
          Home
        </Link>
      </nav>
    </header>
  );
}

Header;
