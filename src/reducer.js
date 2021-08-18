export const initialState={
    user:null
}


// action={  type: actionTypes.SET_USER,  user: result.user,} from LogIn.js
const reducer=(state,action)=>{

    switch(action.type){

        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        case 'DETROY_USER':
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
};
export default reducer