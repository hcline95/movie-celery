import React, { Component } from "react";
import styled from "styled-components";
import Movie from "./Movie";
import { connect } from "react-redux";
import * as actions from '../actions';
import InfiniteScroll from 'react-infinite-scroller';
import SearchBar from './Searchbar';


class MovieList extends Component {  

  componentDidMount () {
    //loads the most recent search or all movies
    this.props.search.query === '' ? this.props.fetchAllMovies() : this.props.fetchSearch(this.props.search.type, this.props.search.query, 1) 
  }


  render() {
    //loops through the movie order and prints each one
    const movies = this.props.order.map((id) => {
    const movie = this.props.movies[id];
      return <Movie key={movie.id} id={movie.id} title={movie.title} img={movie.poster_path} />
    });

  
    return (
      <>
      <SearchBar />
      <InfiniteScroll
        loadMore={()=>{this.props.search.query === '' ? this.props.fetchAllMovies(this.props.currentPage + 1) : this.props.fetchSearch(this.props.search.type, this.props.search.query, this.props.currentPage + 1)}}
        pageStart={0}
        hasMore={this.props.currentPage < this.props.totalPages ? true : false}> 
        <MovieGrid>
          {this.props.totalPages === 0 ? <Error>Sorry, We could not find any movies that matched your search.</Error> : movies}
        </MovieGrid>
      </InfiniteScroll>
      </>
    );
  }
}

function mapStateToProps (state) {
  return { 
    movies: state.movies, 
    totalPages: state.total_pages, 
    search: state.search,
    order: state.order,
    currentPage: state.current_page }
};

export default connect(
  mapStateToProps,
  actions
)(MovieList);

const MovieGrid = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 2em;
margin: 0 auto;
`;

const Error = styled.p`
padding-top:20px;
`;