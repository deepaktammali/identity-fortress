const AUTH_ERROR = {
    // Cognito Errors
    UsernameExistsException: "UsernameExistsException",
    ExpiredCodeException: "ExpiredCodeException",
    // Custom
    SignUpError: "SignUpError"
} as const


export { AUTH_ERROR }