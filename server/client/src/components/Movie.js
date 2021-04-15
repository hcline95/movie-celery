import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Overdrive from "react-overdrive";

const POSTER_PATH = "http://image.tmdb.org/t/p/w185";

//rendering of one individual movie
const Movie = (props) => {
  return (
    <Link to={`/${props.id}`}>
      <Overdrive id={String(props.id)}>
        <Poster src={props.img == null ? 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB466677935_.png' :`${POSTER_PATH}${props.img}`} alt={props.title} />
      </Overdrive>
    </Link>
  )
};

export default Movie;

export const Poster = styled.img`
  box-shadow: 0 0 30px white;
  width:185px;
  height:277px;
  &:hover {
    transform: scale(1.06);
    transition-duration: 300ms;
  }
`;
