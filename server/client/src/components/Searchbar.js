import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions';
import styled from "styled-components";


class SearchBar extends Component {

    constructor (props) {
        super(props)
        
        this.state = {
            type: 'movie',
            query: ''
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
      }

//called when a form is submitted
onFormSubmit(event) {
    //Makes sure the user enters a search before sending the fetch
    if (this.state.query !== ''){
        this.props.fetchSearch(this.state.type, this.state.query)
    }
    //prevent the page from reloading
    event.preventDefault();
}

render(){
      return (
        <SearchContainer>
            <form id="search" onSubmit={this.onFormSubmit}>
              
              <SelectOption type='text' onChange={event => this.setState({ type: event.target.value})}>
                    <option value="movie" >Movie </option>
                    <option value="person">Person</option>
              </SelectOption>
         
                <Bar onChange={event => this.setState({ query: event.target.value})} type="text" placeholder="Search"></Bar>
                <SearchButton type='button' onClick={this.onFormSubmit}>
                  <i className="fas fa-search"></i>
                </SearchButton>
            </form>
        </SearchContainer>
      )
    }
}

function mapStateToProps (state) {
  return ({ 
      search: state.search 
    }
  )};

export default connect(
    mapStateToProps,
    actions
    )(SearchBar);


const SearchContainer = styled.div`
  display:relative;
  margin-top:40px;
  text-align: center;
 `;


const SelectOption = styled.select`
  font-size: 16px;
  color: gray;
  font-family: Oswald, sans-serif;
  line-height: 1.9;
  padding: .6em 1.5em .5em .8em;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  appearance: none;
  background-color: #fff;
  cursor: pointer;  
  &:hover{
    color:#fff;
    background-color:hsl(0, 0%, 13%);
  } 
  `;

const Bar = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  font-family: Oswald, sans-serif;
  padding: 12px 20px 12px 10px;
  background-color: transparent;
  max-width: 30%;
`;

const SearchButton = styled.button`
  background: hsl(0, 0%, 13%);
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
  padding: 15px 20px 15px 20px;
  color: #fff;
  display: inline-block;
  cursor: pointer;
  box-sizing: border-box;
`;