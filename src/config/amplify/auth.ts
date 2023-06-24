import { Auth } from "@aws-amplify/auth"

const config: ReturnType<typeof Auth.configure> = {
    userPoolId: import.meta.env.VITE_USERPOOL_ID,
    region: import.meta.env.VITE_COGNITO_REGION,
    userPoolWebClientId: import.meta.env.VITE_USERPOOL_WEBCLIENT_ID,
    mandatorySignIn: true,
}

export { config }