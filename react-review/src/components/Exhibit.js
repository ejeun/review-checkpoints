import React, {Component} from 'react';
import AnimalSelect from './AnimalSelect';
import Cage from './Cage';


export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAnimal: this.props.selectedAnimal,
    }
    this.setAnimal = this.setAnimal.bind(this)
  }

  setAnimal(animal) {
    this.setState({
      selectedAnimal: animal
    })
  }

  render () {
  	return (
	    <div className="exhibit">
	      <Cage 
        selectedAnimal={this.props.selectedAnimal}
        />
        <AnimalSelect
        submitAnimal={this.setAnimal}
        animals={this.props.animals}
        />
      </div>
  		)
  }
};
