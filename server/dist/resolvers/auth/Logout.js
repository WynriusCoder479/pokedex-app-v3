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
exports.UserLogoutResolver = void 0;
const Constants_1 = require("../../utils/Constants");
const type_graphql_1 = require("type-graphql");
let UserLogoutResolver = class UserLogoutResolver {
    logout(context) {
        const { res, req } = context;
        return new Promise((resolve, _reject) => {
            res.clearCookie(Constants_1.COOKIE_NAME);
            req.session.destroy(error => {
                if (error) {
                    console.log(`ESTROYING SESSION ERROR: ${error}`);
                    resolve(false);
                }
                resolve(true);
            });
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(_return => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserLogoutResolver.prototype, "logout", null);
UserLogoutResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserLogoutResolver);
exports.UserLogoutResolver = UserLogoutResolver;
//# sourceMappingURL=Logout.js.map