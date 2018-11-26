
import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { User } from '../user';
import { Recipe } from '../recipe';
import { RelationColumn } from '../RelationColumn';

@Entity()
@ObjectType()
export class Rate {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field(type => Int)
    @Column({ type: "int" })
    value: number;

    @Field(type => User)
    @ManyToOne(type => User)
    user: User;
    @RelationColumn()
    userId: number;

    @Field()
    @CreateDateColumn()
    date: Date;

    @ManyToOne(type => Recipe)
    recipe: Recipe;
    @RelationColumn()
    recipeId: number;
}