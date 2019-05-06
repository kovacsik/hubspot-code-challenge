import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/FilterableContent.scss';

export default class FilterableContent extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.state = {
      allGenres: []
    };
  }

  handleInputChange(event) {
    //Store the boolean value of wether this input is checked or not
    const enabled = event.target.checked;

    //Store the name of the input that was clicked on
    const name = event.target.name;

    //Send the name and wether it is checked or not to the parent's onFilterChange
    this.props.onFilterChange(name, enabled);
  }

  clearFilters(event){
    event.preventDefault();

    //Clear out the inputs so none of them are checked
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    document.querySelectorAll('input[type=radio]').forEach( el => el.checked = false );

    //Send the onClearFilters event to the parent to clear the filters
    this.props.onClearFilters();
  }

  populateDropdownFilter() {
    //Dynamically create the dropdown filter box for the genres
    const ul = document.getElementById("dropdown-items");

    //Create a genre option with a checkbox for every genre available
    const genres = this.props.genres.map((item, i) => {
      return React.createElement('li', { key: i},
        React.createElement('input', { type: "checkbox", name: item, onChange: this.handleInputChange }),
        React.createElement('span', {}, item)
      )
    });

    //Render the newly created dropdown box
    ReactDOM.render(genres, ul);
  }

  genreDropdownClick(){
    //Toggle the genre filter dropdown
    const ul = document.getElementById("dropdown-items");

    if (ul.style.display === "none") {
      ul.style.display = "block";
    } else {
      ul.style.display = "none";
    }
  }

  componentDidMount() {
    //Add event listeners
    document.getElementById("button-genre").addEventListener('click', this.genreDropdownClick)
    document.getElementById("radio-movies").addEventListener('change', this.handleInputChange)
    document.getElementById("radio-books").addEventListener('change', this.handleInputChange)
    document.getElementById("clear-filters").addEventListener('click', this.clearFilters)
  }

  componentDidUpdate(prevProps) {
    //Update the dropdown genre filters when we get a new set of genres to populate the dropdown list with
    if(prevProps.genres.length !== this.props.genres.length){
      this.setState({
        allGenres: this.props.genres
      });

      //Add the genres for the dropdown filter
      this.populateDropdownFilter();
    }
  }

  render(){
    return (
      <section>
        <div>
          <div>
            <div>
              <div className="flexy-filter">
                <div id="button-genre">
                  <span>Genre</span>
                  <div></div>
                </div>
                <div>
                  <span>Year</span>
                  <div></div>
                </div>
                <div>
                  <input type="text" placeholder="Search" />
                </div>
              </div>
              <div className="flexy-filter">
                <div>
                  <input id="radio-movies" name="movie" type="radio" />
                  <label>Movies</label>
                </div>
                <div>
                  <input id="radio-books" name="book" type="radio" />
                  <label>Books</label>
                </div>
                <div >
                  <a id="clear-filters" href="#">Clear filters</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <ul className="dropdown" id="dropdown-items" style={{ display: 'none' }}></ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
