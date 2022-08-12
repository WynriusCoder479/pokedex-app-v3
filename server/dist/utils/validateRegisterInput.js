"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterInput = void 0;
const emailValidator = __importStar(require("email-validator"));
const validateRegisterInput = (registerInput) => {
    const { username, email, password } = registerInput;
    const passwordPartern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (username.length <= 4 || username.includes('@'))
        return {
            message: 'Invalid username',
            errors: [
                {
                    field: 'username',
                    message: 'Username length must be greater than 2 and not includes @ character'
                }
            ]
        };
    const emailValidate = emailValidator.validate(email);
    if (!emailValidate)
        return {
            message: 'Invalid email',
            errors: [
                {
                    field: 'email',
                    message: 'Email wrong form'
                }
            ]
        };
    const passwordValidate = passwordPartern.test(password);
    if (!passwordValidate)
        return {
            message: 'Invalid password',
            errors: [
                {
                    field: 'email',
                    message: 'Password must be greater than 8, at least one uppercase letter, at least one digit, and at least one special charactor'
                }
            ]
        };
    return null;
};
exports.validateRegisterInput = validateRegisterInput;
//# sourceMappingURL=validateRegisterInput.js.map