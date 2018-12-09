import {API_BASE_URL, API_VERSION, ACCESS_TOKEN} from '../constants/constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'JWT ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    try {
        return fetch(options.url, options)
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    return json;
                })
            );
    } catch (e) {
        return e;
    }
};


export function getSearchResult(term) {
    return request({
        url: API_BASE_URL + API_VERSION + "/search?query=" + term,
        method: 'GET'
    });
}


export function login(loginRequest) {
    return request({
        url: API_BASE_URL + API_VERSION + "/auth/login/",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function register(signupRequest) {
    return request({
        url: API_BASE_URL + API_VERSION + "/auth/register/",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function logout(logoutRequest) {
    return request({
        url: API_BASE_URL + API_VERSION + "/auth/logout/",
        method: 'POST',
        body: JSON.stringify(logoutRequest)
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject({message: "No access token set.", expired: false});
    }
    if (isAccessTokenExpired()) {
        refreshToken().then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.token);
        })
    }

    return request({
        url: API_BASE_URL + API_VERSION + "/auth/user/",
        method: 'GET'
    });
}

export function seo(seoRequest) {
    return request({
        url: API_BASE_URL + API_VERSION + "/seo/optimization",
        method: 'POST',
        body: JSON.stringify(seoRequest)
    });
}

const refreshToken = () => {
    return request({
        url: API_BASE_URL + API_VERSION + "/auth/refresh/",
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem(ACCESS_TOKEN)
        })
    })
};

const isAccessTokenExpired = () => {
    const token_parts = localStorage.getItem(ACCESS_TOKEN).split(/\./);
    try {
        const token_decoded = JSON.parse(window.atob(token_parts[1]));
        if (token_decoded && token_decoded.exp) {
            return 1000 * token_decoded.exp - (new Date()).getTime() < 5
        }
    } catch (e) {
        return true;
    }
    return true;
};
