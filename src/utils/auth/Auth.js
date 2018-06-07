const Auth =
{
    authenticate(login, password, callback) {
        const URL = "/api/userstore/user/login";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '1234567890-ABCDEFGH'
            },

            body: JSON.stringify({
                login: login,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('access-token', data.access_token);
                sessionStorage.setItem('refresh-token', data.refresh_token);
            })
            .catch((err) => console.log(err));

        setTimeout(callback, 500); // fake async
    },

    isAuthenticated() {
        console.log("isAuthenticated call:" + ("access-token" in sessionStorage));
        return "access-token" in sessionStorage;
    },

    signout(callback) {
        //this.isAuthenticated = false
        setTimeout(callback, 100); // fake async
        sessionStorage.removeItem('access-token');
        sessionStorage.removeItem('refresh-token');
        console.log('isAuthenticated false');

    },
}

export default Auth;