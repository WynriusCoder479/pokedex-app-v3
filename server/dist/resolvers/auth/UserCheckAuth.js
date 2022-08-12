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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCheckAuthResolver = void 0;
const checkAuth_1 = require("../../middleware/checkAuth");
const UserMutationResponse_1 = require("../../types/response/UserMutationResponse");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
const internalServerError_1 = require("../../utils/internalServerError");
let UserCheckAuthResolver = class UserCheckAuthResolver {
    async checkAuth(context) {
        try {
            const { req } = context;
            const existingUser = await User_1.User.findOneBy({ id: req.session.userId });
            if (!existingUser)
                return {
                    code: 400,
                    success: false,
                    message: 'User not found'
                };
            return {
                code: 200,
                success: true,
                message: 'User check auth successfully',
                user: existingUser
            };
        }
        catch (error) {
            throw (0, internalServerError_1.internalServerError)(error);
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(_return => UserMutationResponse_1.UserMutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserCheckAuthResolver.prototype, "checkAuth", null);
UserCheckAuthResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserCheckAuthResolver);
exports.UserCheckAuthResolver = UserCheckAuthResolver;
//# sourceMappingURL=UserCheckAuth.js.map