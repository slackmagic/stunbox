import HelixInteractor from './helixInteractor';
const LOGIN = "/api/userstore/user/login";

const HelixUserstore = {

    login(login, password, callback) {
        return HelixInteractor.post(LOGIN, JSON.stringify({
            login: login,
            password: password
        }));
    },
}

export default HelixUserstore;