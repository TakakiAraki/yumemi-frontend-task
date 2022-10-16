import { fork, takeLatest, call, put, select } from "@redux-saga/core/effects";
import { is } from "~/utils/Is";
import { createStorage } from "~/utils/storage";
import { StoreState } from "../applicatrion/store";
import { setUserData, updateUserData, UserDataState } from "../userData/slice";

const storage = createStorage<UserDataState>("user-data-state");

function* loadUserData() {
  const data: UserDataState | undefined = yield call(storage.load);
  if (is.null(data)) return;
  yield put(setUserData(data.resource));
}

function* saveUserData() {
  const value: StoreState = yield select();
  yield call(storage.save, value.userData);
}

export function* coreSaga() {
  yield fork(loadUserData);
  yield takeLatest(updateUserData.type, saveUserData);
}
