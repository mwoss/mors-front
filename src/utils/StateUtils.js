export const passwordEqualityState = (password1, password2, status, msg) => {
    return {
        password1: {
            value: password1,
            validateStatus: status,
            errorMsg: msg
        },
        password2: {
            value: password2,
            validateStatus: status,
            errorMsg: msg
        }
    }
};