import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';  
import "./App.scss";
import UserFeedback from './components/UserFeedback/UserFeedback';
import FeedbackLog from './components/FeedbackLog/FeedbackLog';
import {bindActionCreators} from 'redux';
import * as ReviewActions from "./actions/ReviewAction";
import intitialState, { initialState } from "./reducers/ReviewReducer"
import 'babel-polyfill';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            reviews: [],
            reviewIds: [],
        }
        this.addReview =this.addReview.bind(this);
        this.deleteReview=this.deleteReview.bind(this);
    }
    componentWillReceiveProps(props) {
        this.setState({
            reviews: props.reviews,
            reviewIds: props.reviewIds,
        });
    }
 
    addReview(review){
        this.props.actions.addReview(review);
    }
    deleteReview(reviewId){
        this.props.actions.deleteReview(reviewId);
    }
    
    render() {
        return(
            <div className="userFeedback">
                <div className="header">
                    <h1>TITLE</h1>
                    <button 
                    className="btn btn-primary mb-2" 
                    data-toggle="modal"
                    data-target="#feedbackModal"
                    >
                        Give us Feedback
                    </button>
                </div>
                <div className="modal fade sm"
                    id="feedbackModal"
                    tabIndex="-1" 
                    role="dialog" 
                    aria-labelledby="feedbackModalLabel" 
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content"> 
                            <UserFeedback addReview={this.addReview}/>
                        </div>
                    </div>
                </div>
                <div className="log">
                    <FeedbackLog 
                    reviews={this.state.reviews} 
                    reviewIds={this.state.reviewIds}
                    deleteReview={this.deleteReview}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let reviews = [];
    let reviewIds = [];
    if(state != initialState && state !=null){
       Object.keys(state).forEach(function(key){
           reviews.push(state[key]);
           reviewIds.push(key);
       })
    }
    else{
        reviews = ["Be the first to review this page"];
    }
    return {reviews, reviewIds};
  }
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(ReviewActions, dispatch),
    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App);