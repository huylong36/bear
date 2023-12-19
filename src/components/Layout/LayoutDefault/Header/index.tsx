import SearchIcon from '@mui/icons-material/Search';
import { Button, Container } from '@mui/material';
import { useState } from 'react';
import Logo from '../../../../assets/images/logo.png';
import { useAppSelector } from '../../../../redux/hook';
import InputField from '../../../TextField';
import { Auth } from '../Auth/auth';
import { userState } from '../../../../redux/slices/userSlices';
import './style.scss';
import { useSelector } from 'react-redux';



function Header() {
    const [view, setView] = useState(-1);
    const openAuth = (view: number) =>{
        setView(view);
    }
    const userReducer = useAppSelector(store => store.userState);
    console.log('userReducer ' , userReducer)
    return (
       <>
         <Container>
            <div className="header-panel">
                <div className="logo">
                    <img src={Logo} alt="logo" /> <span className="sub-text-logo-header">Gấu bông online</span>
                </div>

                <div className="search-product-panel">
                    <InputField className="input-search-product" placeholder="nhập sản phẩm cần tìm" />
                    <Button className="btn-seach"><SearchIcon /></Button>
                </div>


                <div className="acount-panel">
                    <Button className="btn-acount login" onClick={() => openAuth(1)}>Đăng nhập</Button>
                    <Button className="btn-acount register" onClick={() => openAuth(2)}>Đăng Ký</Button>
                </div>
            </div>
        </Container>
        {view !== -1 && <Auth open={view !== -1} handleCloseLogin={() => openAuth(-1)} initView={view} setView={setView}/>}
       </>
    )
}
export default Header;

