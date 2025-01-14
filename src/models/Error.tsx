import showNotification from "../utils/Notifications";

export interface AppError {

    message: string;
    status?: number;
    details?: string;

}
export function createAppError(error: unknown) {
    if (error instanceof Error) {
        return { message: error.message };
    }
    return { message: 'Unknown error.' };
};

export function handleFetchError(error: unknown, action: string, setNotification: Function) {
    const appError = createAppError(error);
    console.error(`Error during ${action}:`, appError.message);
    showNotification(`Error during ${action}: ${appError.message}`, setNotification);
};


