import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from "../constants/constants";

export const validateFiled = (filedName, min_len, max_len) => {
    if (filedName.length < min_len) {
        return {
            validateStatus: 'error',
            errorMsg: `Name is too short (Minimum ${min_len} characters needed.)`
        }
    } else if (filedName.length > max_len) {
        return {
            validationStatus: 'error',
            errorMsg: `Name is too long (Maximum ${max_len} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    }
};

export const validateUsername = (username) => {
    return validateFiled(username, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
};

export const validatePassword = (password) => {
    return validateFiled(password, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
};

export const validateEmail = (email) => {
    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if (!email) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email may not be empty'
        }
    } else if (!EMAIL_REGEX.test(email)) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email not valid'
        }
    }
    return {
        validateStatus: "success",
        errorMsg: null
    }
};
