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
exports.UserRemoveMultipleTeamResolver = void 0;
const Team_1 = require("../../entities/Team");
const checkAuth_1 = require("../../middleware/checkAuth");
const TeamMutationResponse_1 = require("../../types/response/TeamMutationResponse");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let UserRemoveMultipleTeamResolver = class UserRemoveMultipleTeamResolver {
    async removeMultipleTeam(idArray, context) {
        try {
            const { req } = context;
            const existingTeams = await Team_1.Team.find({
                where: {
                    userId: req.session.userId,
                    id: (0, typeorm_1.In)(idArray)
                }
            });
            if (!existingTeams)
                return {
                    code: 400,
                    success: false,
                    message: 'User has not team'
                };
            existingTeams.forEach(team => team.remove());
            return {
                code: 200,
                success: true,
                message: 'Remove all team has choice successfully'
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
    __param(0, (0, type_graphql_1.Arg)('idArray', _type => [type_graphql_1.ID])),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], UserRemoveMultipleTeamResolver.prototype, "removeMultipleTeam", null);
UserRemoveMultipleTeamResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserRemoveMultipleTeamResolver);
exports.UserRemoveMultipleTeamResolver = UserRemoveMultipleTeamResolver;
//# sourceMappingURL=UserRemoveMultipleTeam.js.map