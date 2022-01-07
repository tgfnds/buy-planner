import {AuthErrorCodes} from "firebase/auth";
import {useCallback} from "react";

interface AuthErrors {
    [key: string]: string;
}

const authErrors: AuthErrors = {
    [AuthErrorCodes.USER_DELETED]: "User not found!",
    [AuthErrorCodes.EMAIL_EXISTS]: "Email already exists!",
    [AuthErrorCodes.INVALID_EMAIL]: "Email must have a valid format!",
    [AuthErrorCodes.INVALID_PASSWORD]: "Password is invalid!",
    [AuthErrorCodes.EXPIRED_OOB_CODE]: "Action code expired!",
    [AuthErrorCodes.INVALID_OOB_CODE]: "Invalid action code!",
    [AuthErrorCodes.USER_DISABLED]: "This user is disabled!",
    [AuthErrorCodes.EXPIRED_POPUP_REQUEST]: "Popup closed or expired!",
};

const GENERIC_ERROR = "Something went wrong!";

const useFirebaseErrors = () => {
    /**
     * Returns the message corresponding to a given firebase error code.
     * @param code Firebase error code.
     * @returns The message/description for the given error code.
     */
    const getErrorMessage = useCallback((code: string) => {
        return authErrors[code] ?? GENERIC_ERROR;
    }, []);

    return {
        getErrorMessage,
    }
};

export {useFirebaseErrors};
