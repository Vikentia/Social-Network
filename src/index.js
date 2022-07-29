import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';


let rerender = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state}
                dispatch={store.dispatch.bind(store)}
                store={store} />
        </BrowserRouter>,
        document.getElementById('root')
    );
};

rerender(store.getState());

store.subscribe(() => {
    let state = store.getState()
    rerender(state)
});

