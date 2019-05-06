import React, { Component } from 'react';
import '../styles/Testimonial.scss';

export default class Testimonial extends Component {

  updateTestimonialText(event){
    event.preventDefault();

    //Get a Chuck Norris joke from the Chuck Norris Jokes API (http://www.icndb.com/api/)
    fetch("http://api.icndb.com/jokes/random")
      .then(res => res.json())
      .then(
        (result) => {
          //Change the author name
          //Can maybe incorporate a random name later
          document.getElementById("testimonial-author").innerHTML = "Old Wise One";

          //Change the text to the joke from the API
          document.getElementById("testimonial-text").innerHTML = result.value.joke;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  componentDidMount() {
    //Add event listener to the Tell Me More button
    document.getElementById("testimonial-btn").addEventListener('click', this.updateTestimonialText)
  }

  render(){
    return (
      <div>
      	<div className="flexy-testimonial">
      		<div>
      			<p id="testimonial-text">Polaroid bushwich microdosing tattooed. Cornhold single coffee bicycle rights lumbersexual, pour-over
      				intelligents ethical selfies schlitz raw denim 90's leggings. Art party fap lumbersexual mustache actually tilde
      				disrupt kinfolk goth +1.</p>
            <span id="testimonial-author">Indiana Jones, Archaeologist</span>
      		</div>
      		<a id="testimonial-btn">Tell Me More</a>
      	</div>
      </div>
    );
  }
}
