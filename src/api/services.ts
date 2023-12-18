import EndPoint from "../modules/shared/common/endpoint"
import { ApiConfig } from "./config"

export const apiRegister = async (payload: { account:string , password:string }) => {
    return ApiConfig(EndPoint.REGISTER, payload)
}
export const apiLogin = async (payload: { account:string , password:string }) => {
    return ApiConfig(EndPoint.LOGIN, payload)
}