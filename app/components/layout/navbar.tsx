import Link from "next/link";
import type { FC } from "react";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <Link href="/" className={styles.navbarLogo}>
          KF
        </Link>
        <Link href="/">
          <span className={styles.navbarTitle}>Knowledge Flow</span>
        </Link>
      </div>

      <div className={styles.navbarRight}>
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