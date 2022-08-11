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
exports.Pokemon = void 0;
const type_graphql_1 = require("type-graphql");
const PokemonAbility_1 = require("./PokemonAbility");
const PokemonEvStat_1 = require("./PokemonEvStat");
const PokemonIvStat_1 = require("./PokemonIvStat");
let Pokemon = class Pokemon {
};
__decorate([
    (0, type_graphql_1.Field)(_type => type_graphql_1.ID),
    __metadata("design:type", Number)
], Pokemon.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => String),
    __metadata("design:type", String)
], Pokemon.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => PokemonAbility_1.PokemonAbility),
    __metadata("design:type", PokemonAbility_1.PokemonAbility)
], Pokemon.prototype, "ability", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => PokemonIvStat_1.PokemonIvStat),
    __metadata("design:type", PokemonIvStat_1.PokemonIvStat)
], Pokemon.prototype, "iv", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => PokemonEvStat_1.PokemonEvStat),
    __metadata("design:type", PokemonEvStat_1.PokemonEvStat)
], Pokemon.prototype, "ev", void 0);
Pokemon = __decorate([
    (0, type_graphql_1.ObjectType)()
], Pokemon);
exports.Pokemon = Pokemon;
//# sourceMappingURL=Pokemon.js.map