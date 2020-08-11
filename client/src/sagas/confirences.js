import { put, takeEvery, call } from 'redux-saga/effects'

import { GET_ALL_COUNTRIES, GET_ALL, SAVE_CONF_INFO_SAGA, GET_CONF_INFO_SAGA, GET_ALL_CONFIRENCES, CONFIRM_CONFIRENCE_SAGA, SET_CONF_STATUS } from '../redux/reducers/types'
import Axios from 'axios'
import { api } from '../api/confirencesApi'
import ConfirencesApi from '../api/confirencesApi'

// Countries
function* getAllCountries() {
    const fetch = Axios.get
    const url = 'https://restcountries.eu/rest/v2/all'
    const cities = yield call(fetch, url)
    yield put({ type: GET_ALL_COUNTRIES, payload: cities.data })
}

export function* watchGetAllCounries() {
    yield takeEvery(GET_ALL, getAllCountries)
}

// Data about conference

function* saveConfInfo(action) {
    yield call(api.post, ConfirencesApi.addConf(), action.payload)

}

export function* watchSaveConfInfo() {
    yield takeEvery(SAVE_CONF_INFO_SAGA, saveConfInfo)
}

function* getConfInfo(action) {
    try {
        const confirences = yield call(api.post, ConfirencesApi.getConf(), action.payload)
        yield put({ type: GET_ALL_CONFIRENCES, payload: confirences.data })

    } catch (error) {
        yield console.log(error)
    }
}

export function* watchGetConfInfo() {
    yield takeEvery(GET_CONF_INFO_SAGA, getConfInfo)
}

function* setConfStatus(action) {
    yield console.log('action', action)
    yield call(api.post, ConfirencesApi.setStatus(), action.payload)
    yield put({type:SET_CONF_STATUS,payload:action.payload})
}

export function* watchSetConfStatus() {
    yield takeEvery(CONFIRM_CONFIRENCE_SAGA, setConfStatus)
} 
