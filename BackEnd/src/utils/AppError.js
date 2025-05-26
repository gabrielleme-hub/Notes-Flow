class AppError {
    message;
    statusCode;

    constructor(message, statusCode = 400) {
        this.message = message; // Corrigido: atribuição correta
        this.statusCode = statusCode; // Corrigido: atribuição correta
    }
}

module.exports = AppError;
