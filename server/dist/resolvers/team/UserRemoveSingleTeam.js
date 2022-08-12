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
exports.UserRemoveSingleTeamResolver = void 0;
const Team_1 = require("../../entities/Team");
const checkAuth_1 = require("../../middleware/checkAuth");
const type_graphql_1 = require("type-graphql");
const TeamMutationResponse_1 = require("../../types/response/TeamMutationResponse");
let UserRemoveSingleTeamResolver = class UserRemoveSingleTeamResolver {
    async removeSingleTeam(id, context) {
        try {
            const { req } = context;
            const existingTeam = await Team_1.Team.findOne({
                where: {
                    userId: req.session.userId,
                    id
                }
            });
            if (!existingTeam)
                return {
                    code: 400,
                    success: false,
                    message: 'Team not found'
                };
            await existingTeam.remove();
            return {
                code: 200,
                success: true,
                message: 'Team remove successfully'
            };
        }
        catch (error) {
            console.log(error);
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error.message}`
            };
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(_return => TeamMutationResponse_1.TeamMutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('id', _type => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserRemoveSingleTeamResolver.prototype, "removeSingleTeam", null);
UserRemoveSingleTeamResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserRemoveSingleTeamResolver);
exports.UserRemoveSingleTeamResolver = UserRemoveSingleTeamResolver;
//# sourceMappingURL=UserRemoveSingleTeam.js.map