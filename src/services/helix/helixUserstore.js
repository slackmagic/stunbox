import HelixInteractor from './helixInteractor';
const LOGIN = "/api/userstore/login";
const USER_LIST = "/api/userstore/users";

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