(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(rowIndex) {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    // given an array, check for conflicts
    hasConflict: function(arr) {
      var sum = 0;
      for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (sum > 1) {
          return true;
        }
      }
      return false;
    },
    // check conflicts for row;
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      return this.hasConflict(row); // fixme
    },
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var n = this.get('n');
      for (var i = 0; i < n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      } 
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    // get an array of columns
    getCol: function(colIndex) {
      var rows = this.rows();
      return rows.map((row) => row[colIndex]);
    },
    // check conflicts for column
    hasColConflictAt: function(colIndex) {
      var n = this.get('n');
      var rows = this._currentAttributes;
      var sum = 0;
      for (var i = 0; i < n; i++) {
        sum += rows[i][colIndex];
        if (sum > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = this.get('n');
      for (var i = 0; i < n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      } 
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(rowIndex, colIndex) {
      var n = this.get('n');
      var sum = 0;
      var sliced = [];
      for (var i = rowIndex; i < n; i++) {
        sliced.push(this._currentAttributes[i]);
      }
      // var rows = this.rows();
      // var major = [];
      // rows.slice(rowIndex).forEach(function (row, i) {
      //   if (colIndex + i < n) {
      //     major.push(row[colIndex + i]);
      //   }
      // });
      //return this.hasConflict(major); // fixme
      for (var i = 0; i < sliced.length; i++) {
        if (colIndex + i < n) {
          sum += sliced[i][colIndex + i];
          if (sum > 1) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.get('n');
      for (var i = n - 2; i > 0; i--) {
        if (this.hasMajorDiagonalConflictAt(0, i)) {
          return true;
        }
      }
      for (var i = 0; i < n - 1; i++) {
        if (this.hasMajorDiagonalConflictAt(i, 0)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(rowIndex, colIndex) {
      // var rows = this.rows();
      // var minor = [];
      // rows.slice(rowIndex).forEach(function (row, i) {
      //   if (colIndex - i >= 0) {
      //     minor.push(row[colIndex - i]);
      //   }
      // });
      // return this.hasConflict(minor); // fixme
      var n = this.get('n');
      var sum = 0;
      var sliced = [];
      for (var i = rowIndex; i < n; i++) {
        sliced.push(this._currentAttributes[i]);
      }

      for (var i = 0; i < sliced.length; i++) {
        if (colIndex - i >= 0) {
          sum += sliced[i][colIndex - i];
          if (sum > 1) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.get('n');
      for (var i = 1; i < n; i++) {
        if (this.hasMinorDiagonalConflictAt(0, i)) {
          return true;
        }
      }
      for (var i = 1; i < n - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i, n - 1)) {
          return true;
        }
      }
      return false; // fixme
    },
    checkCurrentRook: function (row, col) {
      var n = this.get('n');
      var sum = 0;
      for ( var i = 0; i < n; i++ ) {
        sum += this._currentAttributes[row][i];
        if (sum > 0) {
          return true;
        }
      }
      // sum = 0;
      // for ( var j = 0; j < n; j++ ) {
      //   sum += this._currentAttributes[j][col];
      //   if (sum > 0) {
      //     return true;
      //   }
      // }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());