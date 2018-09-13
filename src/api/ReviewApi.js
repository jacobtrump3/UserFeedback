import initialState from "../reducers/ReviewReducer";
import "isomorphic-fetch";
var key = config.API_KEY;
class ReviewApi {  
    static loadReviews() {
      return fetch("https://user-feedback-testdata.firebaseio.com/.json?auth="+key)
      .then(response => {
        return response.json();
      }).catch(error => {
        return initialState;
      });
    }

    static addReview(review){
      const url = "https://user-feedback-testdata.firebaseio.com/.json?auth="+key;
        let data = (JSON.stringify(review));
        const request = new Request(url,{
          method: 'POST',  
          headers: new Headers({
              'Content-Type': 'application/json'  
        }),
        body: data
      });
      return fetch(request)
      .then( () => { 
        return fetch(url).then(response => {
          return response.json();
        }).catch(error => {
          return initialState;
        });
      }).catch(error => {
        return error;
      });
    }

    static deleteReview(reviewId){
      const url = "https://user-feedback-testdata.firebaseio.com/"+reviewId+".json?auth="+key;
      const listUrl = "https://user-feedback-testdata.firebaseio.com/.json?auth="+key;
      const request = new Request(url,{
        method: 'DELETE',
      });
      return fetch(request)
      .then( () => { 
        return fetch(listUrl).then(response => {
          return response.json();
        }).catch(error => {
          return initialState;
        });
      }).catch(error => {
        return error;
      });
        
    }
}
  
export default ReviewApi;