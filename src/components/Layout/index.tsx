import { useState } from "react";
import { LeftMenu } from "./LeftMenu";

const Layout = ({ children }: any) => {
    const [isOpenMenu, setOpenMenu] = useState(true);
    return (
        <div style={{ minHeight: "100vh", height: "100%" }} className="main-layout">
            <div onClick={() => setOpenMenu(!isOpenMenu)}>
            </div>
            <div style={{ minHeight: "100vh", height: "100%" }}>
                {children}
            </div>
        </div>

    )
}
export default Layout;