import { api } from "../../Config/api";
import { GET_PROFILE_FAILTURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILTURE, LOGIN_REQUEST, LOGIN_SUCCESS, UPDATE_PROFILE_FAILTURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"

export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data)

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)

        }
        console.log("login success", data)
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt })

    } catch (error) {
        console.log("--------", error)
        dispatch({ type: LOGIN_FAILTURE, payload: error })
    }
};


export const registerUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, loginData.data)

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)

        }
        console.log("register----", data)
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt })

    } catch (error) {
        console.log("-------", error)
        dispatch({ type: LOGIN_FAILTURE, payload: error })
    }
};

export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`,
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }

        );

        console.log("profile----", data);
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });

    } catch (error) {
        console.log("-------", error);
        dispatch({ type: GET_PROFILE_FAILTURE, payload: error });
    }
};


export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
        const { data } = await api.post(`${API_BASE_URL}/api/users/update`,reqData);

        console.log("update profile----", data);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });

    } catch (error) {
        console.log("-------", error);
        dispatch({ type: UPDATE_PROFILE_FAILTURE, payload: error });
    }
};