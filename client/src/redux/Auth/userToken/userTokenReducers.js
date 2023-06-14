
const reducers = {
    login: (state, { payload }) => {
        // action.payload = posts
        state.userToken = payload;
        
    },
    logout:(state)=>{
        state.userToken = null;
    }
}
export default reducers;