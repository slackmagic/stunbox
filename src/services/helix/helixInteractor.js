var API_ACCESS_TOKEN = "1234567890-ABCDEFGH";
var ID_ACCESS_TOKEN;
//const ID_REFRESH_TOKEN = sessionStorage.getItem('refresh-token');

const HelixInteractor = {

    init() {
        API_ACCESS_TOKEN = "1234567890-ABCDEFGH";
        ID_ACCESS_TOKEN = sessionStorage.getItem('access-token');

    },

    get(url, callback) {
        return fetch(url,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': API_ACCESS_TOKEN
                }
            }
        )
            .then(response => response.json())
            .then(data => { return data; })
            .catch(error => {
                console.log(error);
                throw new Error(this.errorGenerator(error));
            });
    },


    getWithAuth(url, callback) {
        this.init();
        return fetch(url,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': API_ACCESS_TOKEN,
                    'Authorization': 'Bearer ' + ID_ACCESS_TOKEN
                }
            }
        )
            .then(response => response.json())
            .then(data => { return data; })
            .catch(error => {
                console.log(error);
                throw new Error(this.errorGenerator(error));
            });
    },

    post(url, json, callback) {

        return fetch(url,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_ACCESS_TOKEN
                },
                body: json
            }
        )
            .then(response => response.json())
            .then(data => { return data; })
            .catch(error => {
                console.log(error);
                throw new Error(this.errorGenerator(error));
            });
    },

    postWithAuth(url, json, callback) {
        this.init();
        return fetch(url,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_ACCESS_TOKEN,
                    'Authorization': 'Bearer ' + ID_ACCESS_TOKEN
                },
                body: json
            }
        )
            .then(response => response.json())
            .then(data => { return data; })
            .catch(error => {
                console.log(error);
                throw new Error(this.errorGenerator(error));
            });
    },

    put(url, json, callback) {
        return fetch(url,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_ACCESS_TOKEN
                },
                body: json
            }
        )
            .then(response => response.json())
            .then(data => { return data; })
            .catch(error => {
                console.log(error);
                throw new Error(this.errorGenerator(error));
            });
    },

    putWithAuth(url, json, callback) {
        this.init();
        return fetch(url,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_ACCESS_TOKEN,
                    'Authorization': 'Bearer ' + ID_ACCESS_TOKEN
                },
                body: json
            }
        )
            .then(response => response.json())
            .then(data => { return data; })
            .catch(error => {
                console.log(error);
                throw new Error(this.errorGenerator(error));
            });
    },

    errorGenerator(error) {
        return '[Erreur HELIX]: ' + error.message;
    }
}

export default HelixInteractor;