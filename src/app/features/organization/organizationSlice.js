import { apiSlice } from "../../api/apiSlice";

import {
    // createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();


export const organizationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrganizations: builder.query({
            query: (organization) => ({
                url: 'organization/allOrg',
                method: 'GET',
                body: { ...organization },
            }),
            // A function to manipulate the data returned by a query or mutation.
            // In some cases, you may want to manipulate the data returned from a query before you put it in the cache.
            // In this instance, you can take advantage of transformResponse.
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => {
                return result
                    ? [
                        ...result.items.map(({ id }) => ({ type: 'Organization', id })),
                        { type: 'Organization', id: 'LIST' },
                    ]
                    : [{ type: 'Organization', id: 'LIST' }];
            },
        }),
        addOrganization: builder.mutation({
            query: ({id, ...organization}) => ({
                url: 'organization/addOrg',
                method: 'POST',
                body: { ...organization },
            }),
            invalidatesTags: [{ type: 'Organization', id: 'LIST' }],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log("register..", data)
                    const { organization, totalOrganizations, numOfPages } = data;
                    console.log("user LISTING", organization, totalOrganizations, numOfPages)
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getOrganizationId: builder.query({
            query: ({ id, ...organization }) => ({
                url: `/organization/allOrg/?orgId=${id}`,
                method: 'GET',
                body: { ...organization },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Organization', id: arg.id }
            ]
        }),
        showOrgStatus: builder.mutation({
            query: (organization) => ({
                url: 'organization/showOrg',
                method: 'GET',
                body: { ...organization },
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log("register..", data)
                    const { orgStatus} = data;
                    console.log("user LISTING", orgStatus)
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateOrganization: builder.mutation({
            query: ({id, ...organization}) => ({
                url: `/organization/updateOrg/?orgId=${id}`,
                method: 'PATCH',
                body: { ...organization },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Organization', id: arg.id }
            ],
        }),
        deleteOrganization: builder.mutation({
            query: ({id, ...organization}) => ({
                url: `/organization/deleteOrg/?orgId=${id}`,
                method: 'DELETE',
                body: { ...organization },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Organization', id: arg.id }
            ],
        }),
    })
})


export const {
    useGetOrganizationsQuery,
    useAddOrganizationMutation,
    useGetOrganizationIdQuery,
    useShowOrgStatusMutation,
    useUpdateOrganizationMutation, 
    useDeleteOrganizationMutation 
} = organizationApiSlice

// returns the query result object
export const selectOrganizationsResult = organizationApiSlice.endpoints.getOrganizations.select();


// const selectOrganizationsData = createSelector(
//     selectOrganizationsResult,
//     organizationResult => organizationResult.data // normalized state object with ids & entities
// )