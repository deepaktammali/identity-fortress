export const HUB_EVENTS = {
  AUTH: {
    signIn: "signIn",
    signOut: "signOut",
  },
} as const;

export const MFA_METHOD = {
  NOMFA: "NOMFA",
  SMS: "SMS",
  TOTP: "TOTP",
  SOFTWARE_TOKEN_MFA: "SOFTWARE_TOKEN_MFA",
} as const
