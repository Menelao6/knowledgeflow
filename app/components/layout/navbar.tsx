import Link from "next/link";
import type { FC } from "react";

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/">
          <div className="navbar-logo">KF</div>
        </Link>
        <Link href="/">
          <span className="navbar-title">Knowledge Flow</span>
        </Link>
      </div>

      <div className="navbar-right">
        <Link href="/dashboard" className="btn btn-ghost">
          Dashboard
        </Link>
        <Link href="/upload" className="btn btn-secondary">
          Create a Course
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
