import { Auth } from "@aws-amplify/auth";

export type LogInUserParams = {
    email: string;
    password: string;
}

const logInUser = async (params: LogInUserParams) => {
    const { email, password } = params;
    const response = await Auth.signIn({
        username: email,
        password: password,
    })
    return response;
}


const logOutUser = async () => {
    const response = await Auth.signOut()
    return response;
}

export type RegisterUserParams = {
    email: string;
    password: string;
}

const registerUser = async (params: RegisterUserParams) => {
    const { email, password } = params;
    const response = await Auth.signUp({
        username: email,
        password: password,
    })
    return response;
}

export type ConfirmUserParams = {
    email: string;
    code: string;
}

const confirmUser = async (params: ConfirmUserParams) => {
    const { email, code } = params;
    const response = await Auth.confirmSignUp(email, code)
    return response;
}

const getCurrentAuthenticatedUser = async (
    params?: Parameters<typeof Auth.currentAuthenticatedUser>[0]
) => {
    const user = await Auth.currentAuthenticatedUser(params);
    return user;
};

const getCurrentUserPreferredMfa = async (params?: Parameters<typeof Auth.currentAuthenticatedUser>[0]) => {
    const user = await Auth.currentAuthenticatedUser();
    const mfaPreference = await Auth.getPreferredMFA(user, params);
    return mfaPreference;
}

export interface SetPreferredMFAParams {
    mfaMethod: Parameters<typeof Auth.setPreferredMFA>[1]
}

const setPreferredMFA = async (params: SetPreferredMFAParams) => {
    const { mfaMethod } = params;
    const user = await Auth.currentAuthenticatedUser();
    const response = await Auth.setPreferredMFA(user, mfaMethod)
    return response;
}

const getTOTPSetupAuthorizationCode = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const response = await Auth.setupTOTP(user);
    return response;
}

export interface VerifyTotpTokenParams {
    challengeAnswer: string
}

const verifyTotpToken = async (params: VerifyTotpTokenParams) => {
    const { challengeAnswer } = params;
    const user = await Auth.currentAuthenticatedUser();
    const response = await Auth.verifyTotpToken(user, challengeAnswer);
    return response;
}

export { confirmUser, getCurrentAuthenticatedUser, getCurrentUserPreferredMfa, logInUser, logOutUser, registerUser, setPreferredMFA, getTOTPSetupAuthorizationCode, verifyTotpToken };
