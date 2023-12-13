import SearchIcon from '@mui/icons-material/Search';
import { Button, Divider, Grid, InputAdornment, Container } from '@mui/material';
import { useState } from 'react';
import AcountIcon from '../../../../assets/images/account.png';
import Logo from '../../../../assets/images/logo.png';
import PasswordIcon from '../../../../assets/images/password.png';
import GoogleIcon from '../../../../assets/images/google.png';
import { FCDialog } from '../../../Dialog';
import InputField from '../../../TextField';
import './style.scss';
function Header() {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(0);
    const openLogin = () => {
        setOpen(!open)
        setView(1);
    }
    const openRegister = () => {
        setOpen(!open)
        setView(2);
    }
    const closeLogin = () => {
        setOpen(false)
    }
    const onChangeView = (view: number) => {
        if (view === 1) {
            setView(2);
        } else {
            setView(1);
        }
    }
    const renderContentLogin = () => {
        return (
            <div id="auth-form">
                <div className="auth-form-item">
                    <label htmlFor="" className="item-name">{"Tài khoản"} (*)</label>
                    <div className="input-item">
                        <InputField
                            startAdornment={(<InputAdornment position="start">
                                <img width={25} height={25} src={AcountIcon} alt="user" />
                            </InputAdornment>)}
                            placeholder="Nhập tài khoản"
                        />
                    </div>
                </div>
                <div className="auth-form-item">
                    <label htmlFor="" className="item-name">{"Mật khẩu"} (*)</label>
                    <div className="input-item">
                        <InputField
                            startAdornment={(<InputAdornment position="start">
                                <img width={25} height={25} src={PasswordIcon} alt="password" />
                            </InputAdornment>)}
                            placeholder="Nhập mật khẩu"
                            type="password"
                        />
                    </div>
                </div>
                <div className="auth-form-item forgot-password">
                    <span>Quên mật khẩu ?</span>
                </div>
                <div className="auth-form-btn">
                    <Button
                        variant="outlined"
                        className="btn-submit"
                        onClick={() => { }}
                    >Đăng nhập</Button>
                </div>
                <div className="divider">
                    <Divider>hoặc</Divider>
                </div>

                <div className="auth-form-btn">
                    <Button
                        variant="outlined"
                        className="btn-submit login-with-goole"
                        onClick={() => { }}
                    ><img style={{ width: "35px", marginRight: "5px" }} alt="google" src={GoogleIcon} />Đăng nhập với google</Button>
                </div>
                <div className="auth-form-item no-acount">
                    <span>Bạn chưa có tài khoản ? <span style={{ cursor: "pointer", color: "#399da7" }} onClick={() => onChangeView(1)}>Đăng ký ngay</span></span>
                </div>
            </div>
        )
    }
    const renderContentRegister = () => {
        return (
            <div id="auth-form">
                <Grid container spacing={5}>
                    <Grid item md={6}>
                        <div className="auth-form-item">
                            <label htmlFor="" className="item-name">{"Tài khoản"} (*)</label>
                            <div className="input-item">
                                <InputField
                                    startAdornment={(<InputAdornment position="start">
                                        <img width={25} height={25} src={AcountIcon} alt="user" />
                                    </InputAdornment>)}
                                    placeholder="Nhập tài khoản"
                                />
                            </div>
                        </div>
                        <div className="auth-form-item">
                            <label htmlFor="" className="item-name">{"Mật khẩu"} (*)</label>
                            <div className="input-item">
                                <InputField
                                    startAdornment={(<InputAdornment position="start">
                                        <img width={25} height={25} src={PasswordIcon} alt="password" />
                                    </InputAdornment>)}
                                    placeholder="Nhập mật khẩu"
                                    type="password"
                                />
                            </div>
                        </div>
                        <div className="auth-form-item">
                            <label htmlFor="" className="item-name">{"Số điện thoại"} (*)</label>
                            <div className="input-item">
                                <InputField
                                    startAdornment={(<InputAdornment position="start">
                                        <img width={25} height={25} src={PasswordIcon} alt="phone" />
                                    </InputAdornment>)}
                                    placeholder="Nhập số điện thoại"
                                    type="number"
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={6}>
                        <div className="auth-form-item">
                            <label htmlFor="" className="item-name">{"Email"} (*)</label>
                            <div className="input-item">
                                <InputField
                                    startAdornment={(<InputAdornment position="start">
                                        <img width={25} height={25} src={PasswordIcon} alt="email" />
                                    </InputAdornment>)}
                                    placeholder="Nhập email"
                                    type="email"
                                />
                            </div>
                        </div>
                        <div className="auth-form-item">
                            <label htmlFor="" className="item-name">{"Xác nhận mật khẩu"} (*)</label>
                            <div className="input-item">
                                <InputField
                                    startAdornment={(<InputAdornment position="start">
                                        <img width={25} height={25} src={PasswordIcon} alt="confirm-password" />
                                    </InputAdornment>)}
                                    placeholder="Nhập lại mật khẩu"
                                    type="password"
                                />
                            </div>
                        </div>
                        <div className="auth-form-item">
                            <label htmlFor="" className="item-name">{"Địa chỉ"} (*)</label>
                            <div className="input-item">
                                <InputField
                                    startAdornment={(<InputAdornment position="start">
                                        <img width={25} height={25} src={PasswordIcon} alt="address" />
                                    </InputAdornment>)}
                                    placeholder="Nhập Địa chỉ"
                                    type="number"
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <div className="auth-form-btn">
                    <Button
                        variant="outlined"
                        className="btn-submit"
                        onClick={() => { }}
                    >Đăng ký</Button>
                </div>
                <div className="auth-form-item no-acount">
                    <span>Bạn đã có tài khoản ? <span style={{ cursor: "pointer", color: "#399da7" }} onClick={() => onChangeView(2)}>Đăng nhập ngay</span></span>
                </div>
            </div>
        )
    }
    return (
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
                    <Button className="btn-acount login" onClick={() => openLogin()}>Đăng nhập</Button>
                    <Button className="btn-acount register" onClick={() => openRegister()}>Đăng Ký</Button>
                </div>

                {open ? <FCDialog
                    className="custom-dialog-auth"
                    title={view === 1 ? "Đăng nhập" : "Đăng ký"}
                    open={open}
                    handleClose={() => closeLogin()}
                    content={view === 1 ? renderContentLogin() : renderContentRegister()}
                    size={view === 1 ? "sm" : "md"}
                /> : <></>}
            </div>
        </Container>
    )
}

export default Header;
