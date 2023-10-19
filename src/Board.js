// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

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
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyRooksConflictsOn: function(row, col) {
      return this.hasRowConflictAt(row) || this.hasColConflictAt(col);
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
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
    hasRowConflictAt: function(rowIndex) {
      // fetch the row of the chess board at the particular row Index
      var row = this.get(rowIndex);
      // use reduce function to summate all the elements within the row array
      var count = row.reduce((sum, cell) => sum + cell);

      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // get arrays of all rows in the board using rows()
      // iterate through each row arrays
      for (var i = 0; i < this.get('n') - 1; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var count = 0;

      for (var i = 0; i < board.length; i++) {
        count += board[i][colIndex];
      }

      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this.get('n') - 1; i++) {
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

    //I:number that ranges from -(n-1) to (n-1)
    //O: Binary result ( T ? F)
    //C:
    //E:if input = positive or negative (n-1) we return true

    //strat: if input is equal to positive or negative n-1 we return false. use a count variable. if input negative, then we start at col 0 row abs(input), otherwise we start at row 0 col (input). once we have our starting point, we iterate through the diagonal and accumulate a sum.
    // board[i][majorDiagonalColumnIndexAtFirstRow]

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var board = this.rows();

      // check to see input is equal to positive or negative n - 1
      // if (Math.abs(majorDiagonalColumnIndexAtFirstRow) === this.get('n') - 1) {
      //   // return false
      //   return false;
      // }

      // check to see if input is < 0
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        // row index = abs (input)
        var rowIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        var colIndex = 0;
      } else {
        var rowIndex = 0;
        var colIndex = majorDiagonalColumnIndexAtFirstRow;
      }


      while (this._isInBounds(rowIndex, colIndex)) {
        // add current element to count
        count += board[rowIndex][colIndex];
        rowIndex++;
        colIndex++;
      }

      return count > 1; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var numCols = this.get('n');

      for (var i = -numCols + 1; i < numCols; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var board = this.rows();
      var n = this.get('n');

      // check to see input is equal to positive or negative n - 1
      // if (minorDiagonalColumnIndexAtFirstRow === 2 * n - 2 || minorDiagonalColumnIndexAtFirstRow === 0) {

      //   return false;
      // }

      // check to see if input is < n
      var rowIndex, colIndex;
      if (minorDiagonalColumnIndexAtFirstRow < n - 1) {
        // row index = input
        rowIndex = minorDiagonalColumnIndexAtFirstRow;
        colIndex = 0;
      } else {
        rowIndex = n - 1;
        colIndex = minorDiagonalColumnIndexAtFirstRow - (n - 1);
      }


      while (this._isInBounds(rowIndex, colIndex)) {
        // add current element to count
        count += board[rowIndex][colIndex];
        rowIndex--;
        colIndex++;
      }

      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (var i = 1; i < 2 * this.get('n') - 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
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
