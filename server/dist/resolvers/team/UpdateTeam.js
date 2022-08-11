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
const TeamMutationResponse_1 = require("../../types/response/TeamMutationResponse");
const PokemonTeamInput_1 = require("../../types/team/PokemonTeamInput");
const UpdateTeamInput_1 = require("../../types/team/UpdateTeamInput");
const InternalServerError_1 = require("../../utils/InternalServerError");
const type_graphql_1 = require("type-graphql");
let UserUpdateTeamResolver = class UserUpdateTeamResolver {
    async updateTeam(updateTeamInput, pokemons, context) {
        try {
            const { id, title, description } = updateTeamInput;
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
            if (pokemons.length > 6)
                return {
                    code: 400,
                    success: false,
                    message: 'Team too more pokemon',
                    errors: [
                        {
                            field: 'pokemons',
                            message: 'Teams can only contain up to 6 pokemon'
                        }
                    ]
                };
            const checkEv = pokemons.every(poke => {
                const { hpEv, attackEv, defendEv, specialAttackEv, specialDefendEv, speedEv } = poke.ev;
                const totalEv = hpEv +
                    attackEv +
                    defendEv +
                    specialAttackEv +
                    specialDefendEv +
                    speedEv;
                return totalEv <= 510;
            });
            if (!checkEv)
                return {
                    code: 400,
                    success: false,
                    message: 'Total ev too much',
                    errors: [
                        {
                            field: 'iv',
                            message: 'Total ev must less 510'
                        }
                    ]
                };
            existingTeam.title = title ? title : existingTeam.title;
            existingTeam.description = description
                ? description
                : existingTeam.description;
            existingTeam.pokemons = pokemons ? pokemons : existingTeam.pokemons;
            await existingTeam.save();
            return {
                code: 200,
                success: true,
                message: 'Team updated successfully',
                team: existingTeam
            };
        }
        catch (error) {
            console.log(error);
            throw (0, InternalServerError_1.internalServerError)(error);
        }
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(_return => TeamMutationResponse_1.TeamMutationResponse),
    __param(0, (0, type_graphql_1.Arg)('updateTeamInput')),
    __param(1, (0, type_graphql_1.Arg)('pokemons', _type => [PokemonTeamInput_1.PokemonTeamInput])),
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
//# sourceMappingURL=UpdateTeam.js.map