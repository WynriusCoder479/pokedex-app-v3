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
exports.UserUpdateTeamResolver = void 0;
const Team_1 = require("../../entities/Team");
const checkAuth_1 = require("../../middleware/checkAuth");
const TeamMutationResponse_1 = require("../../types/response/TeamMutationResponse");
const PokemonTeamInput_1 = require("../../types/Team/PokemonTeamInput");
const UpdateTeamInput_1 = require("../../types/Team/UpdateTeamInput");
const type_graphql_1 = require("type-graphql");
let UserUpdateTeamResolver = class UserUpdateTeamResolver {
    async updateTeam(updateTeamInput, pokemons, context) {
        try {
            const { id, title, description } = updateTeamInput;
            const existingTeam = await Team_1.Team.findOneBy({ id });
            if (!existingTeam)
                return {
                    code: 400,
                    success: false,
                    message: 'Team not found'
                };
            const { req } = context;
            if (existingTeam.userId !== req.session.userId)
                return {
                    code: 400,
                    success: false,
                    message: 'Unauthorised'
                };
            if (pokemons.length > 6)
                return {
                    code: 400,
                    success: false,
                    message: 'Total ev too much',
                    errors: [
                        {
                            field: 'ev',
                            message: 'Total ev <= 510'
                        }
                    ]
                };
            existingTeam.title = title;
            existingTeam.description = description;
            existingTeam.pokemons = pokemons;
            await existingTeam.save();
            return {
                code: 200,
                success: true,
                message: 'Updated team successfully',
                team: existingTeam
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
    __param(0, (0, type_graphql_1.Arg)('updateTeamInput')),
    __param(1, (0, type_graphql_1.Arg)('pokemons', () => [PokemonTeamInput_1.PokemonTeamInput])),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateTeamInput_1.UpdateTeamInput,
        Array, Object]),
    __metadata("design:returntype", Promise)
], UserUpdateTeamResolver.prototype, "updateTeam", null);
UserUpdateTeamResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserUpdateTeamResolver);
exports.UserUpdateTeamResolver = UserUpdateTeamResolver;
//# sourceMappingURL=UserUpdateTeam.js.map