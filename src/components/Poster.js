import React, { Component } from 'react';
import '../styles/Poster.scss';

export default class Poster extends Component {

  render(){
    const { poster  } = this.props;
    return (
      <div className="poster-wrapper">

        {/*
          Poster image
        */}
        <div>
          <img src={ poster.poster } alt="poster img" />
        </div>

        {/*
          Poster title
        */}
        <div className="poster-title">
          { poster.title } <span> (<i>{ poster.year }</i>)</span>
        </div>

        {/*
          Poster genres
        */}
        <div>
          <strong>Genres:</strong> <span className="capitalize">{ poster.genre.join(', ') }</span>
        </div>
      </div>
    );
  }
}
