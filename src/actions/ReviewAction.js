import ReviewApi from "../api/ReviewApi";
import * as types from './ActionTypes';  


export function loadReviewsSuccess(review) {  
  return {type: types.LOAD_REVIEWS_SUCCESS, review};
}

export function addReviewSuccess(review){
  return{type: types.ADD_REVIEW_SUCCESS, review};
}

export function deleteReviewSuccess(review){
  return{type: types.DELETE_REVIEW_SUCCESS, review};
}

export function loadReviews() {  
  return function(dispatch) {
    return ReviewApi
    .loadReviews()
    .then(review => {
      dispatch(loadReviewsSuccess(review));
    }).catch(error => {
      throw error;
    });
  };
}
export function addReview(review) {
  return function(dispatch) {
    return ReviewApi
    .addReview(review)
    .then(responseReview => {
      dispatch(addReviewSuccess(responseReview));
    }).catch(error =>{
      throw(error);
    });
  };
}
export function deleteReview(reviewId) {
  return function(dispatch) {
    return ReviewApi
    .deleteReview(reviewId)
    .then(responseReview => {
      dispatch(deleteReviewSuccess(responseReview));
    }).catch(error =>{
      throw(error);
    })
  }
}