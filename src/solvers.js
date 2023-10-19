/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // Create empty chessboard with given size n
  var solution = new Board ({ n: n});

  // Define a recursive function to add rooks
  var addRook = function (row) {
    // Base Case: All rows have been processed and a solution has been found
    if (row === n) {
      return true;
    }

    // Iterate through columns
    for (var col = 0; col < n; col++) {
      // Place rook on the current cell
      solution.togglePiece(row, col);
      // Check for conflicts
      if (!solution.hasAnyRooksConflicts()) {
        // If no conflicts, then proceed too the next row
        if (addRook(row + 1)) {
          // If a valid solution is found in the recurssion, return true
          return true;
        }
      }

      //If no valid solution is found, toggle off the rook and continue the loop
      solution.togglePiece(row, col);
    }
  };
  // start recursion from the first row
  addRook(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board ({ n: n});
  var solutionCount = 0;
  // Implement recurssive function to find rook configurations
  var addRook = function (row) {
    // Base case, if all rows have been processed (row === n), then increment solutionCount and return
    if (row === n) {
      solutionCount ++;
      return;
    }
    // loop through columns
    for (var col = 0; col < n; col++) {
      // if rows and columns are true, then we place the rook on the current cell
      solution.togglePiece(row, col);
      if (!solution.hasAnyRooksConflictsOn(row, col)) {
        // recursively call on the next row (row + 1)
        addRook(row + 1);
      }
      // backtracking by marking off unavailable rows and columns
      // untoggle on failure
      solution.togglePiece(row, col);
    }

  };
  // start recurssion from the first row
  addRook(0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // Create empty chessboard with given size n
  var solution = new Board ({ n: n});

  // Define a recursive function to add rooks
  var addQueen = function (row) {
    // Base Case: All rows have been processed and a solution has been found
    if (row === n) {
      return true;
    }

    // Iterate through columns
    for (var col = 0; col < n; col++) {
      // Place rook on the current cell
      solution.togglePiece(row, col);
      // Check for conflicts
      if (!solution.hasAnyQueenConflictsOn(row, col)) {
        // If no conflicts, then proceed too the next row
        if (addQueen(row + 1)) {
          // If a valid solution is found in the recurssion, return true
          return true;
        }
      }

      //If no valid solution is found, toggle off the rook and continue the loop
      solution.togglePiece(row, col);
    }
  };
  // start recursion from the first row
  addQueen(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board ({ n: n});
  var solutionCount = 0;

  // Implement recurssive function to find queen configurations
  var addQueen = function (row) {
    // Base case, if all rows have been processed (row === n), then increment solutionCount and return
    if (row === n) {
      solutionCount ++;
      return;
    }
    // loop through column
    for (var col = 0; col < n; col++) {
      //place a queen at current spot
      solution.togglePiece(row, col);
      //check to see if that new piece causes a conflict
      if (!solution.hasAnyQueenConflictsOn(row, col)) {
        // recursively call on the next row (row + 1)
        addQueen(row + 1);
      }
      // backtracking by marking off unavailable rows and columns
      // untoggle on failure
      solution.togglePiece(row, col);
    }

  };
  // start recurssion from the first row
  addQueen(0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
