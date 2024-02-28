import { Inter } from "next/font/google";
import Link from "next/link";
import { FaBroom, FaBullhorn, FaHome, FaShoppingBasket } from "react-icons/fa";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Roommate Organizer",
  description: "An app to help roommates organize their household",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <div className={styles.navContainer}>
          <Link href="/announcements">
            <FaBullhorn color={"grey"} size={20} />
          </Link>
          <Link href="/chores">
            <FaBroom color={"grey"} size={20} />
          </Link>
          <Link href="/rooms">
            <FaHome color={"grey"} size={20} />
          </Link>
          <Link href="/shopping-list">
            <FaShoppingBasket color={"grey"} size={20} />
          </Link>
        </div>
      </body>
    </html>
  );
}
