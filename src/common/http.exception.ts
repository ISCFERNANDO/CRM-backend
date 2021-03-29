export default class HttpException extends Error {
    statusCode?: number;
    statusMessage: string;
    error: string | null;

    constructor(statusCode: number, message: string, error?: string) {
        super(message);

        this.statusCode = statusCode;
        this.statusMessage = message;
        this.error = error || null;
    }
}
