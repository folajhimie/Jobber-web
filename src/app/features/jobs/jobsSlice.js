import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
// import { sub } from 'date-fns';
import axios from "axios";

const JOBS_URL = "http://localhost:6565/api/v1/jobs";

// const initialState = {
//     posts: [],
//     status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null
// }

const jobTypeOptions = ['full-time', 'part-time', 'remote', 'internship']
const statusOptions = ['pending', 'interview', 'declined']
const sortOptions = ['latest', 'oldest', 'a-z', 'z-a']

const initialState = {
    // token: localStorage.getItem("token"),
    company: "",
    position: "",
    jobLocation: "",
    jobType: jobTypeOptions[0],
    // jobTypeOptions,
    // statusOptions,
    status: statusOptions[0],
    page: 1,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    search: "",
    searchStatus: 'all',
    searchType: 'all',
    sortOptions,
    sort: sortOptions[0],


    jobError: "",
    jobStatus: "",
    userLoaded: false,
}

export const createJobs = createAsyncThunk(
    "jobs/createJob",
    async (values, { rejectWithValues }) => {
        try {
            const response = await axios.post(`${JOBS_URL}/addJob`, {
                company: values.company,
                position: values.paosition,
                jobLocation: values.jobLocation,
                jopbTypes: values.jobTypes,
                status: values.status
            });

            // localStorage.setItem("token", response.data)

            return response.data;

        } catch (error) {
            console.log(error.response.data);
            return rejectWithValues(error.response.data);
        }
    }
);

export const getJobs = createAsyncThunk(
    "jobs/getJob",
    async (values, { rejectWithValues }) => {
        const { page, search, searchStatus, searchType, sort } = initialState;
        let url = `/alljob?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
        if (search) {
            url = `${url}&search=${search}`
            return url;
        }
        try {
            const response = await axios.get(url);
            const { jobs, totalJobs, numOfPages } = response.data
            return {
                jobs,
                totalJobs,
                numOfPages
            }

        } catch (error) {
            console.log(error.response.data);
            return rejectWithValues(error.response.data);
        }
    }
);

export const setEditJobs = createAsyncThunk(
    "jobs/editJob",
    async (id, { rejectWithValues }) => {
        const { position, company, jobLocation, jobType, status } = initialState;
        try {
            const response = await axios.patch(`${JOBS_URL}/addJob/${id}`, {
                position,
                company,
                jobLocation,
                jobType,
                status
            });

            return response.data

        } catch (error) {
            console.log(error.response.data);
            return rejectWithValues(error.response.data);
        }
    }
);

export const deleteJobs = createAsyncThunk(
    "jobs/deleteJob",
    async (id, { rejectWithValues }) => {
        try {
            const response = await axios.delete(`${JOBS_URL}/deleteJob/${id}`);
            return response.data

        } catch (error) {
            console.log(error.response.data);
            return rejectWithValues(error.response.data);
        }
    }
);

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(createJobs.rejected, (state, action) => {
            return {
                ...state,
                jobError: action.error.message,
                jobStatus: "rejected",
            };
        });
        builder.addCase(createJobs.fulfilled, (state, action) => {
            if (action.payload) {
                const jobs = action.payload
                return {
                    ...state,
                    company: jobs.company,
                    position: jobs.position,
                    jobLocation: jobs.jobLocation,
                    jopbTypes: jobs.jobTypes,
                    status: jobs.status,
                    jobStatus: "success",

                }
            } else return state;
        });

        builder.addCase(getJobs.rejected, (state, action) => {
            return {
                ...state,
                jobError: action.error.message,
                jobStatus: "rejected",
            };
        });
        builder.addCase(getJobs.fulfilled, (state, action) => {
            if (action.payload) {
                const jobs = action.payload
                return {
                    ...state,
                    jobs: jobs.jobs,
                    totalJobs: jobs.totalJobs,
                    numOfPages: jobs.numOfPages,
                    jobStatus: "success",

                }
            } else return state;
        });

        builder.addCase(setEditJobs.rejected, (state, action) => {
            return {
                ...state,
                jobError: action.error.message,
                jobStatus: "rejected",
            };
        });
        builder.addCase(setEditJobs.fulfilled, (state, action) => {
            const jobs = action.payload
            if (jobs?.id) {
                ;
                console.log('Update could not complete')
                console.log(action.payload)
            }

            return {
                ...state,
                company: jobs.company,
                position: jobs.position,
                jobLocation: jobs.jobLocation,
                jopbTypes: jobs.jobTypes,
                status: jobs.status,
                jobStatus: "success",
            }
        });

        builder.addCase(deleteJobs.rejected, (state, action) => {
            return {
                ...state,
                jobError: action.error.message,
                jobStatus: "rejected",
            };
        });
        builder.addCase(deleteJobs.fulfilled, (state, action) => {
            const jobs = action.payload
            if (jobs?.id) {
                console.log('could not Delete')
                console.log(action.payload)
            } else return state;
        });
    }
})


export default jobsSlice.reducer