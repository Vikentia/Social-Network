import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';
import chatReducer from './chat-reducer';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
})
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// let store = createStore(rootReducer, applyMiddleware(thunk));
type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertyTypes<T>>
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export default store;