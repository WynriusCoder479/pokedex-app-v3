"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalServerError = void 0;
const internalServerError = (error) => {
    console.log(error);
    return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`
    };
};
exports.internalServerError = internalServerError;
//# sourceMappingURL=internalServerError.js.map