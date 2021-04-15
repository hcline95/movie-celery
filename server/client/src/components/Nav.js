import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import styled from "styled-components";
import * as actions from '../actions';

const Nav = (props) => {

  return (
    <NavContainer>
      <div id="logo">
        <button id="logo" onClick={()=>{return props.fetchAllMovies()}}>
          <Link to="/">
            <h1>Movie Database</h1>
          </Link>
        </button>
      </div>
    </NavContainer>
  );
};



export default connect(null, actions)(Nav);

const NavContainer = styled.div`
  position: fixed;
  z-index: 999;
  background: hsl(0, 0%, 13%);
  color: whitesmoke;
  margin: 0;
  width: 100%;
  height: auto;
  padding: 1.5em;
  #logo {
    position: relative;
    float: left;
    width: 200px;
    height: auto;
    background-color:hsl(0, 0%, 13%);
    border: none;
    outline:none;
    font-family: Oswald, sans-serif
  }
  a {
    color: #fff;
  }
`;
