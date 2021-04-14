import { Arg, Ctx, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import Item from "../enteties/Item";
import User from '../enteties/User';
import { MyContext } from "../types";
import { isAuth } from "../utils/isAuth";
import { FieldError } from './User';


@ObjectType()
class ItemResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Item, { nullable: true })
    item?: Item;
}


@Resolver(Item)
export class ItemResolver {
    @Query(() => Item, { nullable: true })
    async item(
        @Arg("id") id: number
    ) {
        return await Item.findOne({ where: { id } })
    }

    @Query(() => [Item], { nullable: true })
    async allItems() {
        return await Item.findAll()
    }

    @FieldResolver(() => User)
    async creator(@Root() item: Item) {
        return await User.findOne({ where: { id: item.userId } })
    }

    @Mutation(() => ItemResponse)
    @UseMiddleware(isAuth)
    async addItem(
        @Arg("title") title: string,
        @Ctx() { req }: MyContext
    ): Promise<ItemResponse> {


        if (!title) {
            return {
                errors: [
                    {
                        field: "title",
                        message: "You should enter the title",
                    },
                ]
            }
        }

        const item = await Item.create({ title, userId: req.session!.userId })

        return { item }
    }
}