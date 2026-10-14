export class ErrorApp extends Error {
    constructor(message, status = 400) {
        super(message);
        this.name = "ErrorApp";
        this.status = status;
    }
}