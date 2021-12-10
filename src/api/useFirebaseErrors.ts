import { AuthErrorCodes } from "firebase/auth";

interface AuthErrors {
  [key: string]: string;
}

const authErrors: AuthErrors = {
  [AuthErrorCodes.USER_DELETED]: "User not found!",
  [AuthErrorCodes.EMAIL_EXISTS]: "Email already exists!",
  [AuthErrorCodes.INVALID_EMAIL]: "Email must have a valid format!",
  [AuthErrorCodes.INVALID_PASSWORD]: "Password is invalid!",
};

const useFirebaseErrors = () => {
  /**
   * Returns the message corresponding to a given firebase error code.
   * @param code Firebase error code.
   * @returns The message/description for the given error code.
   */
  function getErrorMessage(code: string) {
    return authErrors[code];
  }

  return {
    getErrorMessage,
  };
};

export { useFirebaseErrors };
