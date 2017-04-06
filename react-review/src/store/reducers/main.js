const initialState = {
  birds: [
      "Eagle",
      "Flamingo",
      "Penguin"
       ],
  fish: [
       "Seahorse",
       "Octopus",
       "Stingray"
        ],
  mammals: [
          "Tiger",
          "Panda",
          "Pig"
        ],
  selectedBird: "Eagle",
  selectedFish: "Seahorse",
  selectedMammal: "Tiger"
};

// make sure you understand the parameters here!
export default (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case 'SET_MAMMAL':
     newState.selectedMammal = action.animal
     break
   case 'SET_BIRD' :
     newState.selectedBird = action.animal
    break
   case 'SET_FISH' :
     newState.selectedFish = action.animal
    break
   default:
    break
  }

  return newState
};
