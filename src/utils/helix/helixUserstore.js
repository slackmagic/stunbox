import HelixInteractor from './helixInteractor';
const LOGIN = "/api/userstore/user/login";
const USER_LIST = "/api/userstore/user/all";

const HelixUserstore = {

    login(login, password, callback) {
        return HelixInteractor.post(LOGIN, JSON.stringify({
            login: login,
            password: password
        }));
    },

    userList(callback) {
        return HelixInteractor.getWithAuth(USER_LIST);
    },
}

export default HelixUserstore;