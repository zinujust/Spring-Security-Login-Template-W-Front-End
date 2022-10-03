const URI = 'http://localhost:8080/'

const LoginApi = {
    getJWT: (setToken, username, password) => {

        const credentials = {
            "username": username,
            "password": password
        }

        fetch(URI + "authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(response => response.json())
            .then(data => {
                setToken('Bearer ' + data.jwt)
            })

    },

    registerUser: (user) => {
        fetch(URI + "api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }
}

export default LoginApi;