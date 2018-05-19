const Auth =
    {
        authenticate(login, password, callback) {
            const URL = "/api/userstore/login";
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
                    sessionStorage.setItem('access-key-exp', data.exp);
                    sessionStorage.setItem('access-key', data.key);
                })
                .catch((err) => console.log(err));

            setTimeout(callback, 500); // fake async
        },

        isAuthenticated() {
            console.log("isAuthenticated call:" + ("access-key" in sessionStorage));
            console.log("date-now: " + new Date());
            console.log("date-exp: " + new Date(sessionStorage.getItem("access-key-exp")));
            return "access-key" in sessionStorage;
        },

        signout(callback) {
            //this.isAuthenticated = false
            setTimeout(callback, 100); // fake async
            sessionStorage.removeItem('access-key');
            sessionStorage.removeItem('access-key-exp');
            console.log('isAuthenticated false');

        },
    }

export default Auth;