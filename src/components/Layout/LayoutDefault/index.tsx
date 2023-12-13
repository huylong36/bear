
import { Submenu } from '../../Submenu';
import Header from './Header';
function DefaultLayout({children}: any) {
    return (
        <>
            <Header/>
            <Submenu/>
            <div className="container">
                {children}
            </div>
        </>
    )
}

export default DefaultLayout;
