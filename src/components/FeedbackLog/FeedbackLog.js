import React, { Component } from 'react'
import './FeedbackLog.scss';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import * as ReviewActions from "../../actions/ReviewAction";
import intitialState, { initialState } from "../../reducers/ReviewReducer"

class FeedbackLog extends Component{
    constructor(props){
        super(props);
        this.deleteReview=this.deleteReview.bind(this);
    }
    deleteReview(event){
        this.props.deleteReview(event.target.attributes.id.value);
        
    }
   
    render(){
        let reviewIdIndex = 0;
        let i = 0;
        return(
            <div>
                <h2>Past Reviews:</h2>
                <div className="feedback">
                    <ul className="feedback-list">
                        {this.props.reviews.map((review) =>
                        <div key={i++} >
                            {review != "Be the first to review this page" &&
                            <li className="feedback-item">
                                <div className="review">
                                    {review.feedback}
                                </div>
                                <br/>
                                <div className="star-rating">
                                    {(function(){
                                        let stars = [];
                                        for(let i = 0; i < review.rating; i++){
                                            stars.push(<span key={Math.random()}>&#9733;</span>)
                                        }
                                        for(let i = 0; i < 5 - review.rating; i++){
                                            stars.push(<span key={Math.random()}>&#9734;</span>)
                                        }
                                        return stars;
                                    })()}
                                </div>
                                <span className="date">
                                    posted at {review.date.substring(0,5)} on {review.date.substring(5)}
                                </span>
                                <p>
                                    <button className="btn btn-outline-info p-1 ml-0 more-info-btn" type="button" data-toggle="collapse" data-target={`#info${this.props.reviewIds[reviewIdIndex]}`} aria-expanded="false" aria-controls="collapseExample">
                                        More Info
                                    </button>
                                    <button onClick={this.deleteReview}
                                    className="btn btn-outline-danger p-1 pl-3 pr-3 ml-2" id={this.props.reviewIds[reviewIdIndex++]}>
                                        Delete
                                    </button>
                                </p>
                                <div className="collapse" id={`info${this.props.reviewIds[reviewIdIndex]}`}>
                                    <div className="card card-body more-info mr-4">
                                        <strong>date: </strong> {review.date}
                                        <hr />
                                        <strong>system info: </strong> {review.system} 
                                        <hr />
                                        <strong>rating: </strong> {review.rating}
                                        <hr />
                                        <strong>feedback: </strong> {review.feedback}                                
                                    </div>
                                </div>

                                    
                            </li>
                            }
                            {review == "Be the first to review this page" &&
                                <h3> {review} </h3>
                            }   
                        </div>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default FeedbackLog;