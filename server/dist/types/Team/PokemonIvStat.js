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
exports.PokemonIvStat = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
let PokemonIvStat = class PokemonIvStat {
};
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: 0 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], PokemonIvStat.prototype, "hpIv", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: 0 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], PokemonIvStat.prototype, "attackIv", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: 0 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], PokemonIvStat.prototype, "defendIv", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: 0 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], PokemonIvStat.prototype, "specialAttackIv", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: 0 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], PokemonIvStat.prototype, "specialDefendIv", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: 0 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], PokemonIvStat.prototype, "speedIv", void 0);
PokemonIvStat = __decorate([
    (0, type_graphql_1.ObjectType)('PokemonIvStatObject'),
    (0, type_graphql_1.InputType)('PokemonIvStatInput')
], PokemonIvStat);
exports.PokemonIvStat = PokemonIvStat;
//# sourceMappingURL=PokemonIvStat.js.map