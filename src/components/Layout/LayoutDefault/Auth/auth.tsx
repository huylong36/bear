import { Button, Divider, Grid, InputAdornment } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { useSnackbar } from "notistack";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import AcountIcon from '../../../../assets/images/account.png';
import GoogleIcon from '../../../../assets/images/google.png';
import PasswordIcon from '../../../../assets/images/password.png';
import BearConfig from '../../../../modules/shared/common/configs';
import { useAppDispatch } from '../../../../redux/hook';
import { requestLogin } from '../../../../redux/slices/userSlices';
import { FCDialog } from '../../../Dialog';
import InputField from '../../../TextField';

export const Auth = (props:{open:boolean,handleCloseLogin:() => void; initView: number; }) =>{
    const {open, handleCloseLogin, initView } = props;
    const [view, setView] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const onChangeView = (view: number) => {
        if (view === 1) {
            setView(2);
        } else {
            setView(1);
        }
        console.log('view' , view)
    }
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = async (data: {
        account: string,
        password: string
    }) => {
        try {
            const actionResult = await dispatch(requestLogin({
                account: data.account,
                password: data.password
            }))
            const res = unwrapResult(actionResult);
            switch (res.loginCode) {
                case BearConfig.LOGIN_FAILED:
                    enqueueSnackbar("Đăng nhập thất bại", { variant: "error" });
                    break;
                case BearConfig.LOGIN_ACCOUNT_NOT_EXIST:
                    enqueueSnackbar("Tài khoản không tồn tại", { variant: "error" });
                    break;
                    case BearConfig.LOGIN_SUCCESS:
                        Cookies.set("user", JSON.stringify(res.accessToken));
                        window.location.href = '/';
                        break;
                default:
                    break;
            }
        } catch (error) {
        }
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
                    <span>Bạn đã có tài khoản ? <span style={{ cursor: "pointer", color: "#399da7" }} onClick={() => onChangeView(1)}>Đăng nhập ngay</span></span>
                </div>
            </div>
        )
    }
    const renderContentLogin = () => {
        return (
            <form onSubmit={handleSubmit(handleLogin)}>
                <div id="auth-form">
                    <div className="auth-form-item">
                        <label htmlFor="" className="item-name">{"Tài khoản"} (*)</label>
                        <div className={`input-item`}>
                            <InputField
                                startAdornment={(<InputAdornment position="start">
                                    <img width={25} height={25} src={AcountIcon} alt="user" />
                                </InputAdornment>)}
                                {...register('account', { required: true })}
                                placeholder="Nhập tài khoản"
                            />
                            {errors.account?.type === "required" ? <>{errors.account.message}</> : <></>}
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
                                {...register('password')}
                                type="password"
                            />
                        </div>
                    </div>
                    <div className="auth-form-item forgot-password">
                        <span>Quên mật khẩu ?</span>
                    </div>
                    <div className="auth-form-btn">
                        <Button
                            type="submit"
                            variant="outlined"
                            className="btn-submit"
                        >Đăng nhập</Button>
                    </div>
                    <div className="divider">
                        <Divider>hoặc</Divider>
                    </div>
                    <div className="auth-form-btn">
                        <Button
                            variant="outlined"
                            className="btn-submit login-with-goole"
                        ><img style={{ width: "35px", marginRight: "5px" }} alt="google" src={GoogleIcon} />Đăng nhập với google</Button>
                    </div>
                    <div className="auth-form-item no-acount">
                        <span>Bạn chưa có tài khoản ? <span style={{ cursor: "pointer", color: "#399da7" }} onClick={() => onChangeView(2)}>Đăng ký ngay</span></span>
                    </div>
                </div>
            </form>
        )
    }
    return(
        <>
            <FCDialog
                className="custom-dialog-auth"
                title={view === 1 ? "Đăng nhập" : "Đăng ký"}
                open={open}
                handleClose={() => handleCloseLogin()}
                content={view === 1 ? renderContentLogin() : renderContentRegister()}
                size={view === 1 ? "sm" : "md"}
            /> 


        </>
    )
}
