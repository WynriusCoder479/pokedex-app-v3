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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMutationResponse = void 0;
const User_1 = require("../../entities/User");
const type_graphql_1 = require("type-graphql");
const Response_1 = require("./Response");
const FieldError_1 = require("../util/FieldError");
let UserMutationResponse = class UserMutationResponse {
};
__decorate([
    (0, type_graphql_1.Field)(_type => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserMutationResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => String, { nullable: true }),
    __metadata("design:type", String)
], UserMutationResponse.prototype, "accessToken", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => String, { nullable: true }),
    __metadata("design:type", String)
], UserMutationResponse.prototype, "refreshToken", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserMutationResponse.prototype, "errors", void 0);
UserMutationResponse = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: Response_1.IResponse })
], UserMutationResponse);
exports.UserMutationResponse = UserMutationResponse;
//# sourceMappingURL=UserMutationResponse.js.map