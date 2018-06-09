import HelixGeneric from './helixGeneric';
const LOGIN = "/api/userstore/user/login";

const HelixUserstore = {

    login(login, password, callback) {
        return HelixGeneric.post(LOGIN, JSON.stringify({
            login: login,
            password: password
        }));
    },
}

export default HelixUserstore;