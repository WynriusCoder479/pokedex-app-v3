import { Field, ID, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Team } from './Team'

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(_type => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@Field(_type => String)
	@Column({ unique: true })
	username!: string

	@Field(_type => String)
	@Column({ unique: true })
	email!: string

	@Column()
	password: string

	@OneToMany(() => Team, team => team.user)
	teams: Team[]

	@Field(_type => Date)
	@CreateDateColumn()
	createdAt: Date

	@Field(_type => Date)
	@UpdateDateColumn()
	updatedAt: Date
}
