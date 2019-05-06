import React, { Component } from 'react';
import './styles/App.scss';
import contentData from './data/data-revised-poster-urls.json';
import FilterableContent from './components/FilterableContent';
import Poster from './components/Poster';
import Testimonial from './components/Testimonial';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGenres: [],
      filters: {
        genre: [],
        type: []
      },
      postersData: []
    };
  }

  getAllGenres(){
    //While we get all of the genres, sort the titles alphabetically
    //As we filter later, the title will stay in alphabetical order
    contentData.media.sort((a,b) => {
      if(a.title < b.title) { return -1; }
      if(a.title > b.title) { return 1; }
      return 0;
    });

    let tempGenres = [];

    //Go through each item in the media
    for(let i = 0; i < contentData.media.length; i++){

      //Go through each genre in the item
      for(let j = 0; j < contentData.media[i].genre.length; j++){

        //If the genre is not in our list of genres, add it
        if(tempGenres.indexOf(contentData.media[i].genre[j]) === -1){
          tempGenres.push(contentData.media[i].genre[j])
        }
      }
    }

    //Sort the genres
    tempGenres.sort();

    //Add the genres to our state
    this.setState({
      allGenres: tempGenres
    });
  }

  filterPostersData(){
    let userSelectedGenres = this.state.filters.genre;
    let tempData = contentData.media;

    //If the user added any media type filters: movie or book
    if(this.state.filters.type.length > 0){

      //Filter the media items
      tempData = tempData.filter((item) => {
        return this.state.filters.type.indexOf(item.type) > -1;
      });
    }

    //If the user added any genre filters: action, adventure, comedy, etc
    if(this.state.filters.genre.length > 0){
      let canAdd = true;

      //Filter the media items
      tempData = tempData.filter((item) => {
        //Assume we can add this media item to tempData
        canAdd = true;

        //Join the genres of this media item into a string
        //This is to help avoid using another loop
        let itemGenre = item.genre.join();

        //Go through the generes that are currently selected by the user
        //We need to make sure that every genre selected by the user is in this media item's genre
        for(let j = 0; j < userSelectedGenres.length; j++){

          //If this user selected genre is not in the media item's genre, then we can't add it to tempData
          if(!itemGenre.includes(userSelectedGenres[j])){
            canAdd = false;
            break;
          }
        }

        //Return wether we can add this item or not based on if this media item has all of the genres that the user selected
        return canAdd;
      });
    }

    this.setState({
      postersData: tempData
    });
  }

  onFilterChange(name, enabled){
    //Whenever the user selects a genre or type, add that selection to our filters state to update the list later in filterPostersData
    if(name === "movie" || name === "book"){

      //Get the current list of filtered types
      let currentFilter = this.state.filters.type;

      //If the name of the filter is enabled and not in our current list, add it
      if(currentFilter.indexOf(name) === -1 && enabled){

        //Add the name to our current filter
        currentFilter.push(name);

        //Update our state with the new filter
        this.setState(prevState => ({ filters: { ...prevState.filters, type: currentFilter } }));
      }
    } else {

      //Get the current list of filtered genres
      let currentFilter = this.state.filters.genre;

      //Get the index of the selected filtered genre in case we need to remove it
      let nameIndex = currentFilter.indexOf(name);

      //If the index is not in the filter list and the checkbox is enabled (checked), then add it
      if(nameIndex === -1 && enabled){
        currentFilter.push(name);
      }
      //Else if the index is in our list already, but the checkbox is not enabled (unchecked), remove it
      else if(nameIndex > -1 && !enabled){
        currentFilter.splice(nameIndex, 1);
      }

      //Update our state
      this.setState(prevState => ({ filters: { ...prevState.filters,   genre: currentFilter } }));
    }

    //Update the poster data to refresh our list of titles to the user
    this.filterPostersData();
  }

  onClearFilters(){
    //Clear out the list of filters we have
    this.setState({
      filters: {
        genre: [],
        type: []
      }
    });

    //Update the poster data to refresh our list of titles to the user
    this.filterPostersData();
  }

  componentDidMount() {
    //When this app is mounted:

    //Get all of the genres to send to the FilterableContent component
    this.getAllGenres();

    //Call the filterPostersData now to populate the media items for the user
    this.filterPostersData();
  }

  render() {
    return (
      <div className="App">
        {/*
          First banner
        */}
        <div className="exercise-banner">
          <h3>
            Exercise 1 - Filterable Content
          </h3>
          <div></div>
        </div>

        {/*
          Filterable content UI
        */}
        <FilterableContent genres={this.state.allGenres} onFilterChange={this.onFilterChange.bind(this)} onClearFilters={this.onClearFilters.bind(this)}/>

        {/*
          Display the number of media items after filtering has occured
        */}
        <div className="number-of-posters">
          Results: <span>{ this.state.postersData.length }</span>
        </div>

        {/*
          Media item wrapper
        */}
        <div className="movie-poster-wrapper">
          {/*
            If there are items in the postersData after filtering
          */}
          {this.state.postersData.length > 0 ? (
            //The posterData has media items in it, so render a Poster component for each item
            this.state.postersData.map((item, i) => {
              return <Poster poster={item} key={i}/>
            })
          ) : (
            //There are no media items in posterData
            <p> no results </p>
          )}
        </div>

        {/*
          Second banner
        */}
        <div className="exercise-banner">
          <h3>
            Exercise 2 - Testimonial Block
          </h3>
          <div></div>
        </div>

        {/*
          Testimonial block
        */}
        <Testimonial />
      </div>
    );
  }
}

export default App;
