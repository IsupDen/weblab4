import { hitConstants } from "../constants";

export function hits(state = [], action) {
    switch (action.type) {
        case hitConstants.CREATE_HIT:
            return [
                action.hit,
                ...state
            ];
        case hitConstants.GET_HITS:
            return [
                ...action.hits
            ];
        case hitConstants.DELETE_HITS:
            return state.filter(({ user }) => user.username !== action.username);
        default:
            return state;
    }
}