import { Inter } from "next/font/google";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaGear, FaPaperPlane } from "react-icons/fa6";
import "../globals.css";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <div className={styles.navContainer}>
          {/* <Link href="/app/announcements">
            <FaBullhorn color={"grey"} size={20} />
          </Link>
          <Link href="/app/chores">
            <FaBroom color={"grey"} size={20} />
          </Link> */}
          <Link href="/app/messages">
            <FaPaperPlane color={"grey"} size={18} />
          </Link>
          <Link href="/app">
            <FaHome color={"grey"} size={20} />
          </Link>
          <Link href="/app/settings">
            <FaGear color={"grey"} size={20} />
          </Link>
          {/* <Link href="/app/shopping-list">
            <FaShoppingBasket color={"grey"} size={20} />
          </Link> */}
        </div>
      </body>
    </html>
  );
}
