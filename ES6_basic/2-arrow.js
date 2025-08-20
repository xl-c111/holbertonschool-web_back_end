export default function getNeighborhoodsList() {
  this.sanFranciscoNeighborhoods = ['SOMA', 'Union Square'];

  this.addNeighborhood = (newNeighborhood) => {
    this.sanFranciscoNeighborhoods.push(newNeighborhood);
    return this.sanFranciscoNeighborhoods;
  };
}

// this: the current obj;
// this.addNeighborhood: a method added to the obj;
// newNeighborhood: the input argument, a new Neighborhood to be added
