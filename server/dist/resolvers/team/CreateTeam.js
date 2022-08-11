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
exports.UserCreateTeamResolver = void 0;
const Team_1 = require("../../entities/Team");
const TeamMutationResponse_1 = require("../../types/response/TeamMutationResponse");
const CreateTeamInput_1 = require("../../types/team/CreateTeamInput");
const PokemonTeamInput_1 = require("../../types/team/PokemonTeamInput");
const InternalServerError_1 = require("../../utils/InternalServerError");
const type_graphql_1 = require("type-graphql");
const checkAuth_1 = require("../../middleware/checkAuth");
let UserCreateTeamResolver = class UserCreateTeamResolver {
    async createTeam(createTeamInput, pokemons, context) {
        try {
            const { title, description } = createTeamInput;
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
            const { req } = context;
            const newTeam = Team_1.Team.create({
                title,
                description,
                pokemons,
                userId: req.session.userId
            });
            await newTeam.save();
            return {
                code: 200,
                success: true,
                message: 'Create team succeccfully',
                team: newTeam
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
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('createTeamInput')),
    __param(1, (0, type_graphql_1.Arg)('pokemons', _type => [PokemonTeamInput_1.PokemonTeamInput])),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTeamInput_1.CreateTeamInput,
        Array, Object]),
    __metadata("design:returntype", Promise)
], UserCreateTeamResolver.prototype, "createTeam", null);
UserCreateTeamResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserCreateTeamResolver);
exports.UserCreateTeamResolver = UserCreateTeamResolver;
//# sourceMappingURL=CreateTeam.js.map