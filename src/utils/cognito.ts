import { AUTH_ERROR } from "../constants/errors";

const mapErrorToErrorMessage = (type: string) => {
    switch (type) {
        case AUTH_ERROR.UsernameExistsException: {
            return "User with this email already exists"
        }
        case AUTH_ERROR.SignUpError: {
            return "Error creating user"
        }
        case AUTH_ERROR.ExpiredCodeException: {
            return "Invalid code provided, please request a code again"
        }
        default: {
            return "Something went wrong!"
        }
    }
}

export { mapErrorToErrorMessage }