import React, { Component } from 'react';

// exporting the constructor function (dumb component).
// what is the parameter coming in here?
export default (props) => {
  return (
    <form>
      <label>Select an Animal: </label>
      <select
        onChange={(evt) => props.submitAnimal(evt.target.value)}
      >
        {props.animals.map(animal => {<option key={animal}>{animal}</option> })}
      </select>
    </form>
  )
 }
