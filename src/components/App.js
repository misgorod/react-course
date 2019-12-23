import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movie: {
        id: 157336, // Interstellar
        poster: 'xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg'
      },
      lastUpdate: new Date(),
      value: "",
      suggestions: [],
      placeholder: "Enter movie name"
    }

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.movie.poster}?api_key=33507de7c1b19be686f91394950c9a61)`}}>
        <Autosuggest 
          suggestions={this.state.suggestions} 
          inputProps={{...this.state, onChange: this.onChange}} 
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} 
          alwaysRenderSuggestions={true} 
          getSuggestionValue={this.getSuggestionValue} 
          renderSuggestion={this.renderSuggestion}/>
      </div>
    )
  }

  updateMovieState(movie) {
    console.log(movie);
    this.setState({
      movie: {
        id: movie.id,
        original_title: movie.original_title,
        tagline: movie.tagline,
        overview: movie.overview,
        homepage: movie.homepage,
        poster: movie.poster_path,
        production: movie.production_companies,
        genre: movie.genres,
        release: movie.release_date,
        vote: movie.vote_average,
        runtime: movie.runtime,
        revenue: movie.revenue,
        backdrop: movie.backdrop_path
      }
    })
  }

  async fetchMovieById(movieId) {
    let url = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=33507de7c1b19be686f91394950c9a61`
    let response = await fetch(url);
    return await response.json();
  }

  async onSuggestionsFetchRequested({value, reason}) {
    if (reason == 'input-changed' && value != '') {
      let url = `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=33507de7c1b19be686f91394950c9a61`;
      let response = await fetch(url);
      let json = await response.json();
      this.setState({
        suggestions: json.results
      })
    }
  }

  getSuggestionValue(suggestion) {
    this.updateMovieState(suggestion);
    return suggestion.title;
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.title}</span>
    );
  }

  onChange(event, {newValue, method}) {
    this.setState({
      value: newValue
    })
  }

  async componentDidMount() {
    let movie = await this.fetchMovieById(this.state.movie.id);
    this.updateMovieState(movie);
  }
}

export default App;
