"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterResolver = void 0;
const UserMutationResponse_1 = require("../../types/response/UserMutationResponse");
const type_graphql_1 = require("type-graphql");
const RegisterInput_1 = require("../../types/auth/RegisterInput");
const validateRegisterInput_1 = require("../../utils/validateRegisterInput");
const User_1 = require("../../entities/User");
const argon2_1 = __importDefault(require("argon2"));
const internalServerError_1 = require("../../utils/internalServerError");
let UserRegisterResolver = class UserRegisterResolver {
    async register(registerInput, context) {
        const validateRegisterInputError = (0, validateRegisterInput_1.validateRegisterInput)(registerInput);
        if (validateRegisterInputError !== null)
            return Object.assign({ code: 400, success: false }, validateRegisterInputError);
        try {
            const { username, email, password } = registerInput;
            const existingUser = await User_1.User.findOne({
                where: [{ username }, { username }]
            });
            if (existingUser)
                return {
                    code: 400,
                    success: false,
                    message: 'Duplicated username or email',
                    errors: [
                        {
                            field: existingUser.username === username ? 'username' : 'email',
                            message: `${existingUser.username === username ? 'Username' : 'Email'} already taken`
                        }
                    ]
                };
            const hashedPassword = await argon2_1.default.hash(password);
            const newUser = User_1.User.create({
                username,
                email,
                password: hashedPassword
            });
            await newUser.save();
            const { req } = context;
            req.session.userId = newUser.id;
            return {
                code: 200,
                success: true,
                message: 'User registration successfully',
                user: newUser
            };
        }
        catch (error) {
            throw (0, internalServerError_1.internalServerError)(error);
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(_return => UserMutationResponse_1.UserMutationResponse),
    __param(0, (0, type_graphql_1.Arg)('registerInput')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput_1.RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserRegisterResolver.prototype, "register", null);
UserRegisterResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserRegisterResolver);
exports.UserRegisterResolver = UserRegisterResolver;
//# sourceMappingURL=UserRegister.js.map