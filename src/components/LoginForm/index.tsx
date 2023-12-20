import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Form, Input, message } from 'antd';
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import BearConfig from "../../modules/shared/common/configs";
import { useAppDispatch } from "../../redux/hook";
import { requestLogin, setIsLogin } from "../../redux/slices/userSlices";
import './style.scss';

type FieldType = {
    account?: string;
    password?: string;
};
const LoginForm = (props: {
    onSuccess: () => void
}) => {
    const { onSuccess = () => { } } = props
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();
    const onFinish = async (data: {
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
                    messageApi.open({
                        type: 'error',
                        content: 'Đăng nhập không thành công',
                    });
                    break;
                case BearConfig.LOGIN_ACCOUNT_NOT_EXIST:
                    messageApi.open({
                        type: 'error',
                        content: 'Tài khoản không tồn tại',
                    });
                    break;
                case BearConfig.LOGIN_WRONG_PASSWORD:
                    messageApi.open({
                        type: 'error',
                        content: 'Mật khẩu không chính xác',
                    });
                    break;
                case BearConfig.LOGIN_SUCCESS:
                    // messageApi.open({
                    //     type: 'success',
                    //     content: 'Đăng nhập thành công',
                    // });
                    onSuccess();
                    dispatch(setIsLogin(true))
                    break;
                default:
                    break;
            }
        } catch (error) {
            enqueueSnackbar("Đăng nhập thất bại", { variant: "error" })
        }
    }
    return (
        <div className="cms-view-panel">
            <div style={{
                display: "flex",
                justifyContent: 'center'
            }}>
                {contextHolder}
                <Form
                    name="basic"
                    style={{
                        width: "100%"
                    }}
                    className="form-login-panel"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Account"
                        name="account"
                        rules={[{ required: true, message: 'Please input your account!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item style={{ display: 'flex', justifyContent: "center" }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )

}
export default LoginForm