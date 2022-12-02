import Header from "../components/header/header";
import Menu from "../components/menu/menu";
import OpenComponents from "./openComponents";

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <OpenComponents>
        <Header />
        {children}
      </OpenComponents>
    </>
  );
};

export default Layout;
