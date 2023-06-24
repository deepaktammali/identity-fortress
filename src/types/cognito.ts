export type CognitoUser = {
  attributes: CognitoUserAttributes;
  preferredMFA: string;
  username: string;
};

export type CognitoUserAttributes = {
  sub: string;
  identities: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
};
