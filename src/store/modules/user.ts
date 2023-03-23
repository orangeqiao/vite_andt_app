import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
export const getUserList = createAsyncThunk('user/getUserList',
    async ({ currentPage = 1, pageSize = 5 }: { currentPage?: number, pageSize?: number, type?: string }) => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: { list: [{name:'czq'},{name:'czq'}, {name:'czq'}, {name:'czq'}, {name:'czq'}], total: 5 } });
            }, 500);
        });

        try {
            var [res] = await Promise.all([promise]);
        } catch (error) {
            console.error(error);
        }

        const payload = _.get(res, 'data', { list: [], total: 0 });
        console.log(payload);
        return payload;
    },
);

export const user = createSlice({
    name: "user",
    initialState: {
        list: [],
        total: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserList.fulfilled, (state, { payload }) => {
            state.list = payload.list;
            state.total = payload.total;
        })
    }
});
export const { } = user.actions;

export default user.reducer;