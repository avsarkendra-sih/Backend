class ApiError extends Error {
    statusCode: number;
    errors: any[];
    success: boolean;
    data: any | null;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: any[] = [],
        stack: string = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.errors = errors;
        this.message = message;
        this.success = false;
        this.data = null;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
