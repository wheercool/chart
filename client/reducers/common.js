import R from 'ramda'
export const copyArray = R.map(R.identity);
export const copyObject = (obj) => Object.assign(obj, {})

/*
Создает специализированную версию редьюсера, ограниченную доп. параметром scope
*/
export function makeScopedReducer(reducerFunction, reducerScope) {
    return (state, action) => {
        const isInitializationCall = state === undefined;
        if(!isInitializationCall && action.scope !== reducerScope) return state;

        return reducerFunction(state, action);
    }
}
