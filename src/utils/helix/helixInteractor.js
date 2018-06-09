const API_ACCESS_TOKEN = "1234567890-ABCDEFGH";
const ID_ACCESS_TOKEN = sessionStorage.getItem('access-token');
//const ID_REFRESH_TOKEN = sessionStorage.getItem('refresh-token');

const HelixInteractor = {

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
            .catch(error => console.log(error));
    },


    getWithAuth(url, callback) {
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
            .catch(error => console.log(error));
    },

    post(url, json, callback) {

        console.log(url);
        console.log(json);
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
            .catch(error => console.log(error));
    },

    postWithAuth(url, json, callback) {

        console.log(url);
        console.log(json);
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
            .catch(error => console.log(error));
    }
}

export default HelixInteractor;