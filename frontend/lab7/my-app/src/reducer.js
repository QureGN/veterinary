export default function reducer(state, action){
    switch (action.type){
        case 'Сложение':
            return{
                orders: [...state.orders, action.payload],
            };
        default:
            return {...state};
    }
}