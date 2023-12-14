import EndPoint from "../modules/shared/common/endpoint"
import { UserInfo } from "../modules/shared/model/user"
import { ApiConfig } from "./config"

export const apiRegister = async (payload: { userInfo: UserInfo }) => {
    return ApiConfig(EndPoint.REGISTER, payload)
}
export const apiLogin = async (payload: { userInfo: UserInfo }) => {
    return ApiConfig(EndPoint.LOGIN, payload)
}