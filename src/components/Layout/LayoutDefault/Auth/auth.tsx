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
import { requestLogin, requestRegister } from '../../../../redux/slices/userSlices';
import { FCDialog } from '../../../Dialog';
import InputField from '../../../TextField';
import './style.scss';

export const Auth = (props: { open: boolean, handleCloseLogin: () => void; initView: number; }) => {
    const { open, handleCloseLogin, initView } = props;
    const [view, setView] = useState(initView);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const onChangeView = (view: number) => {
        setView(view);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();



    const handleRegister = async (data: {
        account: string,
        password: string,
    }) => {
        try {
            const actionResult = await dispatch(requestRegister({
                account: data.account,
                password: data.password,
            }))
            const res = unwrapResult(actionResult);
            switch (res.loginCode) {
                case BearConfig.REGISTER_ACCOUNT_IS_USED:
                    enqueueSnackbar("Tài khoản đã tồn tại", { variant: "error" });
                    break;
                case BearConfig.REGISTER_SUCCESS:
                    enqueueSnackbar("Đăng ký thành công", { variant: "success" });
                    Cookies.set("user", JSON.stringify(res.accessToken));
                    window.location.href = '/';
                    break;
                default:
                    break;
            }

        } catch (error) {

        }
    }
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
                case BearConfig.LOGIN_WRONG_PASSWORD:
                    enqueueSnackbar("Mật khẩu không chính xác", { variant: "error" });
                    break;
                case BearConfig.LOGIN_SUCCESS:
                    enqueueSnackbar("Đăng nhập thành công", { variant: "success" });
                    Cookies.set("user", JSON.stringify(res.accessToken));
                    window.location.href = '/';
                    break;
                default:
                    break;
            }
        } catch (error) {
            enqueueSnackbar("Đăng nhập thất bại", { variant: "error" })
        }
    }
    const renderContentRegister = () => {
        return (
            <form onSubmit={handleSubmit(handleRegister)}>
                <div id="auth-form">
                    <Grid container spacing={5}>
                        <Grid item md={6}>
                            <div className="auth-form-item">
                                <label htmlFor="" className="item-name">{"Tài khoản"} (*)</label>
                                <div className="input-item-panel">
                                    <div className="input-item">
                                        <InputField
                                            startAdornment={(<InputAdornment position="start">
                                                <img width={25} height={25} src={AcountIcon} alt="user" />
                                            </InputAdornment>)}
                                            {...register('account', { required: 'Vui lòng nhập tài khoản' })}
                                            placeholder="Nhập tài khoản"
                                        />
                                    </div>
                                    {errors.account && <p className='text_error'>{errors.account.message}</p>}
                                </div>
                            </div>
                            <div className="auth-form-item">
                                <label htmlFor="" className="item-name">{"Mật khẩu"} (*)</label>
                                <div className="input-item-panel">
                                    <div className="input-item">
                                        <InputField
                                            startAdornment={(<InputAdornment position="start">
                                                <img width={25} height={25} src={PasswordIcon} alt="password" />
                                            </InputAdornment>)}
                                            placeholder="Nhập mật khẩu"
                                            type="password"
                                            {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
                                        />
                                    </div>
                                    {errors.account && <p className='text_error'>{errors.account.message}</p>}
                                </div>
                            </div>
                            <div className="auth-form-item">
                                <label htmlFor="" className="item-name">{"Số điện thoại"} (*)</label>
                                <div className="input-item-panel">
                                    <div className="input-item">
                                        <InputField
                                            startAdornment={(<InputAdornment position="start">
                                                <img width={25} height={25} src={PasswordIcon} alt="phone" />
                                            </InputAdornment>)}
                                            placeholder="Nhập số điện thoại"
                                            type="number"
                                            {...register('phone', { required: 'Vui lòng nhập số điện thoại' })}
                                        />
                                    </div>
                                    {errors.phone && <p className='text_error'>{errors.phone.message}</p>}
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="auth-form-item">
                                <label htmlFor="" className="item-name">{"Email"} (*)</label>
                                <div className="input-item-panel">
                                    <div className="input-item">
                                        <InputField
                                            startAdornment={(<InputAdornment position="start">
                                                <img width={25} height={25} src={PasswordIcon} alt="email" />
                                            </InputAdornment>)}
                                            placeholder="Nhập email"
                                            type="email"
                                            {...register('email', { required: 'Vui lòng nhập email' })}
                                        />
                                    </div>
                                    {errors.email && <p className='text_error'>{errors.email.message}</p>}
                                </div>
                            </div>
                            <div className="auth-form-item">
                                <label htmlFor="" className="item-name">{"Xác nhận mật khẩu"} (*)</label>
                                <div className="input-item-panel">
                                    <div className="input-item">
                                        <InputField
                                            startAdornment={(<InputAdornment position="start">
                                                <img width={25} height={25} src={PasswordIcon} alt="passwordConfirm" />
                                            </InputAdornment>)}
                                            placeholder="Xác nhận mật khẩu"
                                            type="password"
                                            {...register('passwordConfirm', {
                                                required: 'Vui lòng nhập lại mật khẩu',
                                                validate: value => value === watch('password') || 'Mật khẩu không khớp'
                                            })}
                                        />
                                    </div>
                                    {errors.passwordConfirm && <p className='text_error'>{errors.passwordConfirm.message}</p>}
                                </div>
                            </div>
                            <div className="auth-form-item">
                                <label htmlFor="" className="item-name">{"Địa chỉ"} (*)</label>
                                <div className="input-item-panel">
                                    <div className="input-item">
                                        <InputField
                                            startAdornment={(<InputAdornment position="start">
                                                <img width={25} height={25} src={PasswordIcon} alt="address" />
                                            </InputAdornment>)}
                                            placeholder="Nhập Địa chỉ"
                                            type="text"
                                            {...register('address', { required: 'Vui lòng nhập địa chỉ' })}
                                        />
                                    </div>
                                    {errors.address && <p className='text_error'>{errors.address.message}</p>}
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <div className="auth-form-btn">
                        <Button
                            variant="outlined"
                            className="btn-submit"
                            type="submit"
                        >Đăng ký</Button>
                    </div>
                    <div className="auth-form-item no-acount">
                        <span>Bạn đã có tài khoản ? <span style={{ cursor: "pointer", color: "#399da7" }} onClick={() => onChangeView(1)}>Đăng nhập ngay</span></span>
                    </div>
                </div>
            </form>
        )
    }
    const renderContentLogin = () => {
        return (
            <form onSubmit={handleSubmit(handleLogin)}>
                <div id="auth-form">
                    <div className="auth-form-item">
                        <label htmlFor="" className="item-name">{"Tài khoản"} (*)</label>
                        <div className="input-item-panel">
                            <div className="input-item">
                                <InputField
                                    startAdornment={(<InputAdornment position="start">
                                        <img width={25} height={25} src={AcountIcon} alt="user" />
                                    </InputAdornment>)}
                                    {...register('account', { required: 'Vui lòng nhập tài khoản' })}
                                    placeholder="Nhập tài khoản"
                                />
                            </div>
                            {errors.account && <p className='text_error'>{errors.account.message}</p>}
                        </div>
                    </div>
                    <div className="auth-form-item">
                        <label htmlFor="" className="item-name">{"Mật khẩu"} (*)</label>
                        <div className="input-item-panel">
                            <div className="input-item">
                                <InputField
                                    startAdornment={(<InputAdornment position="start">
                                        <img width={25} height={25} src={PasswordIcon} alt="password" />
                                    </InputAdornment>)}
                                    placeholder="Nhập mật khẩu"
                                    {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
                                    type="password"
                                />
                            </div>
                            {errors.password && <p className='text_error'>{errors.password.message}</p>}
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
    return (
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
