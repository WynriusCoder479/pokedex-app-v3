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
exports.Team = void 0;
const Pokemon_1 = require("../types/pokemons/Pokemon");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Team = class Team extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(_type => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Team.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Team.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => type_graphql_1.ID),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Team.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => User_1.User),
    (0, typeorm_1.ManyToOne)(_type => User_1.User, user => user.teams),
    __metadata("design:type", User_1.User)
], Team.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Team.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => [Pokemon_1.Pokemon]),
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Array)
], Team.prototype, "pokemons", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => Date),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Team.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(_type => Date),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Team.prototype, "updatedAtL", void 0);
Team = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Team);
exports.Team = Team;
//# sourceMappingURL=Team.js.map