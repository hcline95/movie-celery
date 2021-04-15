import React, { Component } from "react";
import * as actions from '../actions';
import { connect } from "react-redux";
import styled from "styled-components";



class Credits extends Component {
    

  render() {
    //if error is returned for the Cast/Crew
    if (this.props.cast === undefined){
        return(
          <>
          <br/>
          <p>Sorry. We could not find that cast & crew.</p>
          </>
        )
      }


    const renderCastMember = (castMember) => {
        
        return (
          <div key={castMember.cast_id}>
            <Poster
              src={castMember.profile_path === null ? 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB466677935_.png' : `http://image.tmdb.org/t/p/w185${castMember.profile_path}`}
              alt="profile"
              style={{ boxShadow: "0 5px 30px black" }}
              id={castMember.cast_id} 
            />
            <Name>
              {castMember.character}
            </Name>
            <NameSmall>
              {castMember.name}
            </NameSmall>
          </div>
        );
    }


    const renderCrewMember = (crewMember) => {
      
        return (
        <div key={crewMember.credit_id}>
          <NameSmall >
            {crewMember.name}
          </NameSmall>
        </div>
        );
    }
    
    
    return (
     <>
        <h1>Cast</h1>
            <Grid>
                {this.props.cast.map(renderCastMember)}
            </Grid>
        <h1>Crew</h1>
            <Grid>
                {this.props.crew.map(renderCrewMember)}
            </Grid>
     </>
    );
  }
}

function mapStateToProps(state) {
  return {
    cast: state.credits.cast,
    crew: state.credits.crew
  };
}

export default connect(
  mapStateToProps,
  actions
)(Credits);

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2em;
  margin: 0 auto;
`;

const Name = styled.h2`
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
width:185px;
padding-right:10px;
padding-left:10px;
`;

const NameSmall = styled.h4`
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
width:185px;
padding-right:10px;
padding-left:10px;
`;

const Poster = styled.img`
  box-shadow: 0 0 30px white;
  width:185px;
  height:277px;
  &:hover {
    transform: scale(1.06);
    transition-duration: 300ms;
  }
`;

