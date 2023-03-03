import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../features/auth/authSlice';


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:6565/api/v1/auth',
    credentials: 'same-origin',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        // headers.set('Access-Control-Allow-Origin', '*');

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
            headers.set('Content-Type', 'application/json');
            headers.set('Access-Control-Allow-Credentials', true);
            headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {


    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        console.log("sending Refresh Token...");

        const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);


        if (refreshResult?.data) {
            
            api.dispatch(setCredentials({...refreshResult?.data}))

            result = await baseQuery(args, api, extraOptions)
        } else{

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your Login has Expired..."
            }
            return refreshResult
        }
    }

    return result;
}


export const apiSlice = createApi({
    // reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Organization', 'Job', 'User'],
    endpoints: builder => ({})
})