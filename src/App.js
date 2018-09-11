import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';  
import "./App.scss";
import UserFeedback from './components/UserFeedback/UserFeedback';
import FeedbackLog from './components/FeedbackLog/FeedbackLog';
import {bindActionCreators} from 'redux';
import * as ReviewActions from "./actions/ReviewAction";
import intitialState, { initialState } from "./reducers/ReviewReducer"

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            showPopup: false,
            reviews: [],
            reviewIds: [],
        }
        this.togglePopup = this.togglePopup.bind(this);
        this.addReview =this.addReview.bind(this);
    }
    componentWillReceiveProps(props) {
        this.setState({
            reviews: props.reviews,
            reviewIds: props.reviewIds,
        });
    }
    togglePopup(){
        this.setState({
            showPopup:!this.state.showPopup,
        })
    }
    addReview(review){
        this.props.actions.addReview(review);
    }
    render() {
        return(
            <div className="userFeedback">
                <div className="header">
                    <h1>TITLE</h1>
                    <button className="userFeedback-btn" onClick={this.togglePopup}>Give us Feedback</button>
                    <UserFeedback
                        hidden={!this.state.showPopup}
                        togglePopup={this.togglePopup}
                        addReview={this.addReview}
                    />
                </div>
                <div className="log">
                <FeedbackLog reviews={this.state.reviews} reviewIds={this.state.reviews}/>
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