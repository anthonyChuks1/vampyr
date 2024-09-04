class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    if (vampire) {
      vampire.creator = this;
      this.offspring.push(vampire);
    }
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    if (!this.creator) {
      return 0;
    }

    return this.creator.numberOfVampiresFromOriginal + 1;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return vampire.numberOfVampiresFromOriginal >
      this.numberOfVampiresFromOriginal
      ? true
      : false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisAncestors = [];
    let currentVampire = this;

    // Collect all ancestors of the current vampire
    while (currentVampire) {
      thisAncestors.push(currentVampire);
      currentVampire = currentVampire.creator;
    }

    currentVampire = vampire;

    // Traverse the ancestors of the other vampire and find the common one
    while (currentVampire) {
      if (thisAncestors.includes(currentVampire)) {
        return currentVampire;
      }
      currentVampire = currentVampire.creator;
    }
    return currentVampire;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    //helper to search the branches
    //
    //base case
    let vampire = null;
    if (this.name === name) {
      vampire = this;
    }

    //searches the offspring of the current vampire
    for (let offspring of this.offspring) {
      //it will keep running the search function until base function is satisfied
      if (!vampire) {
        vampire = offspring.vampireWithName(name);
      }
    }

    return vampire;
    //Note: this only searches the offspring of a branch
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;
    
    //First vampire;

    //now count
    const countVamps = function (vampire) {
      if (vampire.offspring.length === 0) {
        return total;
      }

      let count = vampire.offspring.length;
      for (let offspring of vampire.offspring) {
        count += countVamps(offspring);
      }
      return count;
    };

    total = countVamps(this);
    return total;
  }

  

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];
  
    // Helper function to collect millennial vampires recursively
    const collectMillennials = function (vampire) {
      // Check if the current vampire was converted after 1980
      if (vampire.yearConverted > 1980) {
        millenials.push(vampire);
      }
  
      // Recursively check all offspring
      for (let offspring of vampire.offspring) {
        collectMillennials(offspring);
      }
    };
  
    // Start collecting from the current vampire
    collectMillennials(this);
    return millenials;
  }
}

module.exports = Vampire;
