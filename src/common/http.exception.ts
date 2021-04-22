export default class HttpException extends Error {
    statusCode?: number;
    statusMessage: string;
    error: any;

    constructor(statusCode: number, message: string, error?: any) {
        super(message);

        this.statusCode = statusCode;
        this.statusMessage = message;
        this.error = error || null;
    }
}
