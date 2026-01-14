import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import Header from "./Header";
function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Layout;
