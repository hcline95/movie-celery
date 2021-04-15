import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Poster } from "./Movie";
import Overdrive from "react-overdrive";
import * as actions from '../actions';
import { connect } from "react-redux";
import Credits from "./Credits";
import { Link } from "react-router-dom";

class MovieDetail extends Component {

  //fetches for cast and crew info when page loads
  componentDidMount(){
        this.props.fetchCredits(this.props.match.params.id) 
  }

  render() {
    //background picture paths
    const POSTER_PATH = "http://image.tmdb.org/t/p/w185";
    const BACKDROP_PATH = "http://image.tmdb.org/t/p/w1280";

    // movie id that matches movie clicked on
    const { movie } = this.props


    const renderMovieDetail = () => {
        return (
          <div id="info">
            <h1>{movie.title}</h1>
            <div id="infoAttr">
              <p className="first">{movie.release_date}</p>
              <p>
                {movie.vote_average}
                /10
              </p>
            </div>
            <p>{movie.overview}</p>
          </div>
        );
    }

    //if Id number is invalid
    if (movie === undefined){
      return(
        <>
        <br/>
        <Link to="/">
          <Error>Sorry. We could not find that movie. Click here to return to the home page</Error>
        </Link> 
        </>
      )
    }

    return (
      <Fragment>
        <BackdropContainer backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`} >
          <Back><Link to='/' id='back'><i className="far fa-arrow-alt-circle-left"></i> Back</Link></Back>
        </BackdropContainer>
        <DetailInfo>
          <Overdrive id={String(movie.id)}>
            <Poster
              src={movie.poster_path === null ? 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB466677935_.png'  : `${POSTER_PATH}${movie.poster_path}`}
              alt="poster"
              style={{ boxShadow: "0 5px 30px black" }}
            />
          </Overdrive>
          {renderMovieDetail()}
        </DetailInfo>
        <Description>
          <Credits />
        </Description>
      </Fragment>
    );
  }
}

function mapStateToProps({ movies }, ownProps) {
  return {
    movie: movies[ownProps.match.params.id]
  };
}

export default connect(
  mapStateToProps,
  actions
)(MovieDetail);

const BackdropContainer = styled.div`
  position: relative;
  padding-bottom: 70vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-position: relative;
  object-fit: cover;
  width:100%;
  justify-content: center;
  opacity: 0.8;
  a{
    color: #fff;
    text-decoration:none;
  }
`;

const Back = styled.div`
  position: relative;
  font-color: black;
  font-size:30px
`;

const DetailInfo = styled.div`
  background: hsl(0, 0%, 93%);
  text-align: left;
  padding: 1.5em 1em 0 1em;
  display: flex;
  /* align-items: center; */
  font-size: 1.2em;
  div#info {
    margin-left: 20px;
    width: 100%;
    height: 180px;
  }
  div#infoAttr {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
    margin: 0.5em auto 1em 0;
    color: hsl(0, 100%, 59%);
    font-size: 1em;
  }
  div#infoAttr > p:not(.first) {
    display: inline-block;
    margin-left: 1.5em;
  }
  div#infoAttr > p:hover {
    color: hsl(0, 100%, 72%);
    cursor: pointer;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;

const Description = styled.div`
  margin: 0 auto;
  padding: 1.3em;
  text-align: left;
  width: 100%;
  /* position: absolute;
  left: -2%;
  top: 30%; */
  color: whitesmoke;
  background: black;
  text-shadow: 1px 1px black;
`;

const Error = styled.p`
padding-left:100px;
`;