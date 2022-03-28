import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

// const apiUrl = "http://localhost:2410/data";

// function getApi(){
//     return fetch(apiUrl, {
//         method: 'GET',
//         headers:{
//             "Content-Type": 'application/json',
//         }
//     }).then(res => res.json())
//     .catch((err) => {
//         console.log(err);
//         throw err
//     })
// }

function* fetchForm(action){
    try{
        const form = yield call();
        yield put({type: 'GET_FORM_SUCCESS', form: form})
    }catch(e){
        yield put({type: 'GET_FORM_FAILED', message: e.message})
    }
}

function* formSaga(){
    yield takeEvery('GET_FORM_REQUESTED', fetchForm);
}



// function* addFormSaga() {
//     while (true) {
//       const { payload: { values, resolve, reject } } = yield take(TYPE)
//       // use resolve() or reject() here
//     }
//   }

// export const getForm = (state) => state.form

// export function* saveCreatedForm() {
//   while(true) {
//     yield take(SAVE_FORM);
//     let form = yield select(getForm);
//     // yield call(fetch, '/api/project', { body: project, method: 'PUT' });
//     yield put({type: SAVE_FORM_SUCCESS});
//   }
// }

export default formSaga;