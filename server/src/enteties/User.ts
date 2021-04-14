import { AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Table({
    tableName: 'user',
    timestamps: false
})
class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number

    @Unique
    @Field()
    @Column
    email: string

    @Column
    password: string
}

export default User


