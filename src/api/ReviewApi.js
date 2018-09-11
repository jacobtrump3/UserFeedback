import initialState from "../reducers/ReviewReducer";
import { loadReviews } from "../actions/ReviewAction";
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
}
  
export default ReviewApi;