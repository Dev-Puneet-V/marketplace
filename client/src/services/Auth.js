import AppConfig from "../config/AppConfig";
import {
    sendAuthorizeGetRequest, sendAuthorizePostRequest,
    sendGetRequest, sendPostRequest
} from "../helpers/CommonHelper";

const AuthService = {

    signin: function (data) {
        const url = AppConfig.API_URL + '/check-mobile';
        return sendPostRequest(url, data);
    },
}

export default AuthService;