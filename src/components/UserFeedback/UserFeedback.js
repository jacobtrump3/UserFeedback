import React, { Component } from 'react'
import './UserFeedback.scss';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import * as ReviewActions from "../../actions/ReviewAction";

class UserFeedback extends Component{
    constructor(props){
        super(props);
        this.state={
            rating: 0,
            feedback: '',
            reviews:'',
        }
        this.showStars = this.showStars.bind(this);
        this.hideStars = this.hideStars.bind(this);
        this.getRating = this.getRating.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.collectFeedback = this.collectFeedback.bind(this);
    }
    showStars(event) {
        if(this.state.rating > 0){
            for(let i = event.target.attributes[1].value.substring(5); i <= 5; i ++){
                document.getElementById("star-"+i).setAttribute("aria-hidden", "true");
            }
        }
        this.setState({rating: 0});
        for(let i = 1; i <= event.target.attributes[1].value.substring(5); i ++){
            document.getElementById("star-"+i).setAttribute("aria-hidden", "false");
        }
    }

    hideStars(){
        if(this.state.rating === 0){
            for(let i = 1; i <= 5; i ++){
                document.getElementById("star-"+i).setAttribute("aria-hidden", "true");
            }
        }
    }

    getRating(event){
        this.setState({rating:event.target.attributes[1].value.substring(5) })
    }

    collectFeedback(event){
        this.setState({feedback: event.target.value});
    }
    clearForm(){
        for(let i = 1; i <= 5; i ++){
            document.getElementById("star-"+i).setAttribute("aria-hidden", "true");
        }
        document.getElementById("feedback").value = '';
    }
    handleCancel(){
        this.props.togglePopup();
        for(let i = 1; i <= 5; i ++){
            document.getElementById("star-"+i).setAttribute("aria-hidden", "true");
        }
        document.getElementById("feedback").value = '';

    }
    handleSubmit(){
        let review = {}
        review.rating = this.state.rating;
        review.feedback = this.state.feedback;
        review.date = new Date();
        review.system = navigator.userAgent;
        this.props.togglePopup();
        this.props.addReview(review);
    }

    render(){
        const stars =[1,2,3,4,5];
        return(
            <div className="modal-backdrop" hidden={this.props.hidden}>
                <div className="modal"  hidden={this.props.hidden}>
                    <h2>Feedback</h2>
                    <h4>Please Rate your experience in the app so far.</h4>
                    <div className="stars">
                        {stars.map((star) =>
                         <span className="star" key={star} 
                         onClick={this.getRating}
                         onMouseEnter={this.showStars}
                         onMouseLeave={this.hideStars}>
                             <label aria-hidden="true" id={`star-${star}`}>&#9733;</label>&#9734;
                         </span>
                        )}
                    </div>
                    <h4>Tell us why you gave us this rating. It'll help us improve! <i>Optional</i></h4>
                    <textarea onChange={this.collectFeedback} id="feedback" className="user-input"></textarea>
                    <button onClick={this.handleSubmit} className="btn submit-btn">Submit</button>
                    <button onClick={this.handleCancel} className="btn cancel-btn">Cancel</button>
                </div>
            </div>
        );
    }
}

export default UserFeedback;