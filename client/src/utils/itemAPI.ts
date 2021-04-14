import { AddItemDocument, AddItemMutationVariables, AllItemsDocument, Item, ItemResponse } from '../generated/graphql'
import { client } from './userAPI'

class ItemAPI {
    async allItems(): Promise<{ allItems: Item[] }> {
        return await client.request(AllItemsDocument)
    }

    async addItem(title: string): Promise<{ addItem: ItemResponse }> {
        const variables: AddItemMutationVariables = {
            title
        }
        return await client.request(AddItemDocument, variables)
    }
}


export default new ItemAPI()