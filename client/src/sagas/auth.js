import { put, takeEvery, call } from 'redux-saga/effects'
import React from 'react'

import AdminApi, { api } from '../api/api'
import UsersApi, { userApi } from '../api/users'
import { LOGIN_USER_SAGA, SET_ERROR, AUTH_USER, SET_TOKEN, LOGOUT_USER_SAGA, LOGOUT_USER, CLEAR_TOKEN, AUTH_USER_SAGA, ADD_USER_SAGA, ADD_USER, UPDATE_USER_SAGA, UPDATE_USER, GET_ALL_USERS_SAGA, GET_ALL_USERS, CHANGE_USER_STATUS_SAGA, DELETE_USER_SAGA, UPDATE_USER_STATUS, DELETE_USER } from '../redux/reducers/types'
import { Redirect } from 'react-router'

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER_SAGA, loginUser)
}

function* loginUser(action) {
    try {
        const data = yield call(api.post, AdminApi.login(), action.payload)
        console.log(data)
        api.defaults.headers = { 'Authorization': data.data.token }
        localStorage.setItem('token', data.data.token)
        yield put({ type: SET_TOKEN, payload: data.data.token })
        yield put({ type: AUTH_USER_SAGA })
        return (<Redirect to="/admin/adminpanel"/>)
    } catch (error) {
        console.log(error)
        yield put({ type: SET_ERROR, payload: error.response.data.msg })
    }

}


export function* watchAuthUser() {
    yield takeEvery(AUTH_USER_SAGA, authUser)
}

function* authUser(action) {
    try {
        api.defaults.headers['Authorization'] === undefined && (api.defaults.headers = { 'Authorization': action.payload })
        const response = yield call(api.get, AdminApi.auth())
        yield put({ type: AUTH_USER, payload: response.data.user })
    } catch (error) {
        yield console.log('ERROR', error)
        yield put({ type: SET_ERROR, payload: error.response && error.response.data.msg })
    }
}


export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER_SAGA, logoutUser)
}

function* logoutUser() {
    yield put({ type: LOGOUT_USER })
    yield put({ type: CLEAR_TOKEN })
    yield localStorage.removeItem('token')
}

export function* watchAddUser() {
    yield takeEvery(ADD_USER_SAGA, addUser)
}

function* addUser(action) {
    const user = yield call(userApi.post, UsersApi.addUser(), action.payload)
    yield put({ type: ADD_USER, payload: user.data.newUser })
}

export function* watchUpdateUser() {
    yield takeEvery(UPDATE_USER_SAGA, updateUser)
}

function* updateUser(action) {
    const user = yield call(userApi.post, UsersApi.updateUser(), action.payload)
    yield put({ type: UPDATE_USER, payload: user.data.newUser })
}

export function* watchGetAllUsers() {
    yield takeEvery(GET_ALL_USERS_SAGA, getAllUsers)
}

function* getAllUsers() {
    const users = yield call(userApi.get, UsersApi.findAll())
    const usersArr = users.data.users
    yield put({ type: GET_ALL_USERS, payload: usersArr })
}

export function* watchChangeUserStatus() {
    yield takeEvery(CHANGE_USER_STATUS_SAGA, changeUserStatus)
}

function* changeUserStatus(action) {
    yield call(userApi.post, UsersApi.updateUserStatus(), action.payload)
    yield put({type:UPDATE_USER_STATUS,payload:action.payload})

}

export function* watchDelUser() {
    yield takeEvery(DELETE_USER_SAGA, delUser)
}

function* delUser(action) {
    yield call(userApi.post, UsersApi.delUser(), action.payload)
    yield put({type:DELETE_USER,payload:action.payload})
} 