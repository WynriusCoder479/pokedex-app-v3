import { Pokemon } from '../types/Team/Pokemon'
import { Field, ID, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { User } from './User'

@ObjectType()
@Entity()
export class Team extends BaseEntity {
	@Field(_type => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@Field(_type => String)
	@Column()
	title!: string

	@Field()
	@Column()
	userId!: number

	@Field(_type => User)
	@ManyToOne(() => User, user => user.teams)
	user: User

	@Field(_type => String)
	@Column({ nullable: true })
	description?: string

	@Field(_type => [Pokemon])
	@Column('jsonb', { nullable: true })
	pokemons?: Pokemon[]

	@Field(_type => Date)
	@CreateDateColumn()
	createdAt: Date

	@Field(_type => Date)
	@UpdateDateColumn()
	updatedAt: Date
}
