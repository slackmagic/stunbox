import decode from 'jwt-decode';
import Userstore from '../helix/helixUserstore';

const Auth =
{
    authenticate(login, password, callback) {

        Userstore.login(login, password)
            .then(data => {
                console.log(data);
                sessionStorage.setItem('access-token', data.access_token);
                sessionStorage.setItem('access-exp', decode(data.access_token).exp);
                sessionStorage.setItem('refresh-token', data.refresh_token);
                sessionStorage.setItem('refresh-exp', decode(data.refresh_token).exp);

                console.log(new Date(decode(data.access_token).exp * 1000));
                console.log(new Date(decode(data.refresh_token).exp * 1000));
            })

        setTimeout(callback, 500); // fake async
    },

    isAuthenticated() {
        console.log("TOKEN EXPIRED:" + this.isTokenExpired(sessionStorage.getItem('access-token')));
        if ("access-token" in sessionStorage) {
            if (this.isTokenExpired(sessionStorage.getItem('access-token'))) {
                this.signout();
                return false;
            } else { return true; }
        } else { return false; }
    },

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            } else return false;
        } catch (err) { return false; }
    },

    signout(callback) {
        sessionStorage.removeItem('access-token');
        sessionStorage.removeItem('access-exp');
        sessionStorage.removeItem('refresh-token');
        sessionStorage.removeItem('refresh-exp');
    },
}
export default Auth;