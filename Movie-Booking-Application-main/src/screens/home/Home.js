import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import SingleLineImageList from "./SingleLineImageList";
import moviesData from "../../common/moviesData";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";

import genres from "../../common/genre";
import artists from "../../common/artists";

import Filter, { filterObject } from "./Filter";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moviesData: moviesData,
      genres: genres,
      artists: artists,
      filteredObject: moviesData,
    };
  }

  filterMovie = () => {
    // checking if the user has clicked on apply button without filling form
    // if so do nothing just returning the initial movie data

    if (
      filterObject.name === "" &&
      filterObject.releaseDateEnd === "" &&
      filterObject.releaseDateStart === "" &&
      filterObject.genres.length === 0 &&
      filterObject.artists.length === 0
    ) {
      const newState = this.state;
      newState.filteredObject = moviesData;
      this.setState(newState);
      return moviesData;
    }

    const filteredMovies = this.state.moviesData.filter((movie) => {
      if (
        movie.title.toLowerCase() === filterObject.name.toLowerCase() ||
        movie.genres.some((genre) => filterObject.genres.includes(genre)) ||
        movie.artists.some((artist) =>
          filterObject.artists.includes(
            `${artist.first_name} ${artist.last_name}`
          )
        ) ||
        (new Date(filterObject.releaseDateStart) <
          new Date(movie.release_date) &&
          new Date(filterObject.releaseDateEnd) > new Date(movie.release_date))
      ) {
        return movie;
      }
    });

    const newState = this.state;
    newState.filteredObject = filteredMovies;

    this.setState(newState);
  };

  render() {
    return (
      <div>
        <Header isDetails={false} />
        <span className="headingUpComingMovies">Upcoming Movies</span>
        <SingleLineImageList moviesData={this.state.moviesData} />

        <div className="flex-container">
          <div className="left">
            <ImageList cols={4} rowHeight={350}>
              {this.state.filteredObject.map((item) => (
                <ImageListItem className="featuredImageContainer" key={item.id}>
                  <Link to="/details" state={{ movie: item }}>
                    <img
                      src={item.poster_url}
                      srcSet={item.poster_url}
                      alt={item.title}
                      loading="lazy"
                      className="featuredImage"
                    />
                    <ImageListItemBar
                      title={item.title}
                      subtitle={`Release Date : ${new Date(
                        item.release_date
                      ).toDateString()}`}
                    />
                  </Link>
                </ImageListItem>
              ))}
            </ImageList>
          </div>
          <div className="right">
            <Filter
              genres={this.state.genres}
              artists={this.state.artists}
              filterMovie={this.filterMovie}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
