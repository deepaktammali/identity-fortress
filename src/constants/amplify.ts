export const HUB_EVENTS = {
  AUTH: {
    signIn: "signIn",
    signOut: "signOut",
    tokenRefresh: "tokenRefresh"
  },
} as const;

export const MFA_METHOD = {
  NOMFA: "NOMFA",
  SMS_MFA: "SMS_MFA",
  TOTP: "TOTP",
  SOFTWARE_TOKEN_MFA: "SOFTWARE_TOKEN_MFA",
} as const

export const COGNITO_ATTRIBUTES = {
  PHONE_NUMBER: "phone_number",
  SOFTWARE_MFA_CONFIGURED: "custom:soft_mfa_configured"
} as const