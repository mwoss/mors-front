import {API_BASE_URL, API_VERSION, ACCESS_TOKEN} from '../constants/constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Token ' + localStorage.getItem(ACCESS_TOKEN))
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
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + API_VERSION + "/auth/user/",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + API_VERSION + "/users/" + username,
        method: 'GET'
    });
}

export function seo(seoRequest) {
    return request({
        url: API_BASE_URL +API_VERSION+ "/seo/optimization",
        method: 'POST',
        body: JSON.stringify(seoRequest)
    });
}