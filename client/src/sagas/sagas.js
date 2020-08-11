import { all } from 'redux-saga/effects'
import { watchLoginUser, watchLogoutUser, watchAuthUser, watchAddUser, watchUpdateUser, watchGetAllUsers, watchChangeUserStatus, watchDelUser } from './auth'
import { watchGetAllCounries, watchGetConfInfo, watchSaveConfInfo, watchSetConfStatus } from './confirences'

export default function* rootSaga() {
    yield all([
        // Countries
        watchGetAllCounries(),
        
        //Confirences
        watchSaveConfInfo(),
        watchGetConfInfo(),
        watchSetConfStatus(),
        
        // Admin
        watchLoginUser(),
        watchLogoutUser(),
        watchAuthUser(),
        watchAddUser(),
        watchUpdateUser(),
        watchGetAllUsers(),
        watchChangeUserStatus(),
        watchDelUser()
    ])
}