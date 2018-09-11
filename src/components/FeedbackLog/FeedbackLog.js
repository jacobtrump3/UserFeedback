import React, { Component } from 'react'
import './FeedbackLog.scss';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import * as ReviewActions from "../../actions/ReviewAction";
import intitialState, { initialState } from "../../reducers/ReviewReducer"

class FeedbackLog extends Component{
    constructor(props){
        super(props);
    }
   
    render(){
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
                                <div key={i} className="star-rating">
                                    {(function(){
                                        let stars = [];
                                        for(let i = 0; i < review.rating; i++){
                                            stars.push(<span key={i}>&#9733;</span>)
                                        }
                                        for(let i = 0; i < 5 - review.rating; i++){
                                            stars.push(<span key={i}>&#9734;</span>)
                                        }
                                        return stars;
                                    })()}
                                </div>
                                <span className="date">
                                    {review.date.substring(0,10)}
                                </span>
                                    {/* <button className="delete-btn">delete</button> */}
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