import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import User from './User';




@Table({
    tableName: 'item',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
})
@ObjectType()
class Item extends Model {
    @Field()
    @Column({
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column
    @Field()
    title: string

    @CreatedAt
    @Field()
    created_at: Date;

    @ForeignKey(() => User as typeof Model,)
    @Column
    userId: number;

    @BelongsTo(() => User as typeof Model)
    user: User;
}

export default Item

