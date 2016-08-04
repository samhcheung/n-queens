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
  var solution = new Board({n: n}); //fixme
  var rookPlacer = (row, col, rooksLeft) => {
    // if solution found
    if (rooksLeft === 0) { return; }
    // if conflicts
    if (solution.checkCurrentRook(row, col)) {
      rookPlacer(row + 1, col, rooksLeft);
    } else {
      solution.togglePiece(row, col);
      rookPlacer(0, col + 1, rooksLeft - 1);
    }

  };
  rookPlacer(0, 0, n);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({n: n}); //fixme
  var solutionCount = 0;
  var rookPlacer = (row, col, rooksLeft) => {
    // if solution found
    if (rooksLeft === 0) { 
      solutionCount++;
      return; 
    }
    
    // if conflicts
    if (solution.checkCurrentRook(row, col)) {
      if (row + 1 < n) {
        rookPlacer(row + 1, col, rooksLeft);
      }
    } else {
      solution.togglePiece(row, col);
      rookPlacer(0, col + 1, rooksLeft - 1);
      solution.togglePiece(row, col);

      if (row + 1 < n) {
        rookPlacer(row + 1, col, rooksLeft);
      }
    }

  };
  rookPlacer(0, 0, n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n}); //fixme
  var aSolution;
  var rookPlacer = (row, col, rooksLeft) => {
    // if solution found
    if (rooksLeft === 0) { 
      if (aSolution === undefined) {
        aSolution = solution.rows().map((arr) => arr.slice());
      }
      return; 
    }
    
    solution.togglePiece(row, col);
    // if conflicts
    if (solution.hasAnyQueensConflicts()) {
      solution.togglePiece(row, col);
      if (row + 1 < n) {
        rookPlacer(row + 1, col, rooksLeft);
      }
    } else {
      rookPlacer(0, col + 1, rooksLeft - 1);
      solution.togglePiece(row, col);

      if (row + 1 < n) {
        rookPlacer(row + 1, col, rooksLeft);
      }
    }

  };
  if (n === 2 || n === 3) {
    return solution.rows();
  } else {
    rookPlacer(0, 0, n);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return aSolution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n: n}); //fixme
  var solutionCount = 0;
  var rookPlacer = (row, col, rooksLeft) => {
    // if solution found
    if (rooksLeft === 0) { 
      solutionCount++;
      return; 
    }
    
    solution.togglePiece(row, col);
    // if conflicts
    if (solution.hasAnyQueensConflicts()) {
      solution.togglePiece(row, col);
      if (row + 1 < n) {
        rookPlacer(row + 1, col, rooksLeft);
      }
    } else {
      rookPlacer(0, col + 1, rooksLeft - 1);
      solution.togglePiece(row, col);

      if (row + 1 < n) {
        rookPlacer(row + 1, col, rooksLeft);
      }
    }

  };
  rookPlacer(0, 0, n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
