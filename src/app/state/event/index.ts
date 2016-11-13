import { combineReducers, Action } from '@ngrx/store';

// TODO: Add types
const OPEN_ADD_EVENT = 'OPEN_ADD_EVENT';
const CLOSE_ADD_EVENT = 'CLOSE_ADD_EVENT';
const ADD_EVENT = 'ADD_EVENT';

const isAddingEvent = (state: boolean = false, action: Action) : boolean => {
    switch (action.type) {
        case OPEN_ADD_EVENT:
            return true;
        case CLOSE_ADD_EVENT:
        case ADD_EVENT:
            return false;
        default:
            return state;
    }
};

const list = (state = [], action: Action) : any[] => {
    switch(action.type) {
        case ADD_EVENT:
            return [...state, action.payload];
        default:
            return state;
    }
};

export const openAddEvent = () : Action => ({type: OPEN_ADD_EVENT});
export const closeAddEvent = () : Action => ({type: CLOSE_ADD_EVENT});
export const addEvent = (event) : Action => ({type: ADD_EVENT, payload: event});

export default combineReducers({list, isAddingEvent});
