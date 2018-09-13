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
        this.clearForm = this.clearForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.collectFeedback = this.collectFeedback.bind(this);
    }
    showStars(event) {
        if(this.state.rating > 0){
            for(let i = event.target.attributes.id.value.substring(5); i <= 5; i ++){
                console.log(document.getElementById("star-"+i))
                document.getElementById("star-"+i).setAttribute("aria-hidden", "true");
            }
        }
        this.setState({rating: 0});
        for(let i = 1; i <= event.target.attributes.id.value.substring(5); i ++){
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
        this.setState({rating:event.target.attributes.id.value.substring(5)});
    }

    collectFeedback(event){
        this.setState({feedback: event.target.value});
    }
    clearForm(){
        for(let i = 1; i <= 5; i ++){
            document.getElementById("star-"+i).setAttribute("aria-hidden", "true");
        }
        document.getElementById("user-input").value = '';
    }

    handleSubmit(){
        let review = {}
        review.rating = this.state.rating;
        review.feedback = this.state.feedback;
        review.date = new Date();
        const d = new Date();
        review.date =d.getHours() +":" + d.getMinutes()+ " " +d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear();
        review.system = navigator.userAgent;
        this.props.addReview(review);
        this.clearForm()
    }

    render(){
        const stars =[1,2,3,4,5];
        return(
                <div>
                    <div className="modal-header">
                        <h3>Feedback</h3>
                    </div>
                    <div className="modal-body">
                    <h5>Please Rate your experience in the app so far.</h5>

                        <div className="stars mb-1">
                            {stars.map((star) =>
                                <span className="star" key={star} 
                                onClick={this.getRating}
                                onMouseEnter={this.showStars}
                                onMouseLeave={this.hideStars}
                                >
                                    <label aria-hidden="true" key={star} id={`star-${star}`}>&#9733;</label>&#9734;
                                </span>
                            )}
                        </div>
                        <h5 className="mb-3">Tell us why you gave us this rating. It'll help us improve! <i>Optional</i></h5>
                        <div className="input-group mb-3">
                            <textarea className="form-control border-secondary user-input" onChange={this.collectFeedback} id="user-input" aria-label="With textarea"></textarea>
                        </div>
                        <button onClick={this.handleSubmit} className="btn btn-primary btn-lg pt-1 pb-1 pr-3 pl-3 mr-1 mt-2"data-dismiss="modal">Submit</button>
                        <button onClick={this.clearForm} className="btn btn-secondary btn-lg pt-1 pb-1 pr-4 pl-4  mt-2" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
        );
    }
}

export default UserFeedback;