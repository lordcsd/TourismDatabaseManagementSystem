// import { createStore } from "redux";

// //dispatch data types
// let ADDED_BUG = "bug_added";
// let REMOVED_BUG = "bug_removed";

// //store
// export let store = createStore(reducer);

// //reducers (events)
// let lastId = 0;

// function reducer(state = [], action) {
//   if (action.type === ADDED_BUG) {
//     return [
//       ...state,
//       {
//         id: lastId,
//         description: action.payload.description,
//         resolved: false,
//       },
//     ];
//   } else if (action.type == REMOVED_BUG) {
//     return state.filter((bug) => bug.id !== action.payload.id);
//   }
//   //if all options fail, ie if is neither add nor remove
//   return state;
// }

// //index.js
// //dispatch
// export let addToStore = (description) => {
//   store.dispatch({
//     type: ADDED_BUG,
//     payload: {
//       id: ++lastId,
//       description,
//       resolved: false,
//     },
//   });
// };

// export let removeFromStore = () => {
//   store.dispatch({
//     type: REMOVED_BUG,
//     payload: {
//       id: id,
//     },
//   });
// };

// //subcribing from UI layrer
// export const unsubscribe = store.subscribe(() => {
//   return store.getState();
// });
