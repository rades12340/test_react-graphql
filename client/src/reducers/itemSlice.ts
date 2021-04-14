import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FieldError, Item } from '../generated/graphql';
import itemAPI from '../utils/itemAPI';

export const getItems = createAsyncThunk(
    'items/getItems',
    async (_, { dispatch }) => {
        const items = await itemAPI.allItems()

        dispatch(setItems(items.allItems))
    }
)
export const addItem = createAsyncThunk(
    'items/addItem',
    async (title: string, { dispatch }) =>
        await itemAPI.addItem(title)

)

interface ItemInterface {
    errors: undefined | FieldError[],
    items: Item[]
}

const INITIAL_STATE: ItemInterface = {
    errors: undefined,
    items: []
}

export const itemSlice = createSlice({
    name: 'itemSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setItems: (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload
        },
        addItemToList: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload)
            state.errors = undefined
        },
        setItemInputError(state, action: PayloadAction<FieldError[]>) {
            state.errors = action.payload
        },
    }
});


export const { setItems, setItemInputError, addItemToList } = itemSlice.actions






