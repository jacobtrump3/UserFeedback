import * as types from '../actions/ActionTypes';  

export const initialState = {  
    0:{
      rating: 0,
      feedback: '',
      date: '',
      system: '',
    }
};
export default function reviewReducer(state = initialState, action) {  
  switch(action.type) {
    case types.LOAD_REVIEWS_SUCCESS:
      return action.review;
    case types.ADD_REVIEW_SUCCESS:
      return action.review;
    case types.DELETE_REVIEW_SUCCESS:
      return action.review;
    default: 
      return state;
  }
}