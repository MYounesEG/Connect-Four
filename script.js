(function () {
  var prefixEl = document.querySelector("#prefix");
  var primaryTextEl = document.querySelector(".primary");
  var secondaryTextEl = document.querySelector(".secondary");
  var currentPlayerNameEl = document.querySelector("#current-player");
  var otherPlayerNameEl = document.querySelector("#other-player");
  var playAgainEl = document.querySelector("#play-again");
  var playAgainBtnEl = document.querySelector("#play-again-btn");
  var gameBoardEl = document.querySelector("#board");
  playAgainBtnEl.addEventListener("click", () => location.reload());
  gameBoardEl.addEventListener("click", placeGamePiece);
  currentPlayerNameEl.addEventListener("keydown", Game.do.handleNameChange);
  otherPlayerNameEl.addEventListener("keydown", Game.do.handleNameChange);
  function placeGamePiece(e) {
    if (e.target.tagName !== "BUTTON") return;
    var targetCell = e.target.parentElement;
    var targetRow = targetCell.parentElement;
    var targetRowCells = [...targetRow.children];
    var gameBoardRowsEls = [...document.querySelectorAll("#board tr")];
    var y_pos = gameBoardRowsEls.indexOf(targetRow);
    var x_pos = targetRowCells.indexOf(targetCell);
    y_pos = Game.do.dropToBottom(x_pos, y_pos);
    if (Game.check.isPositionTaken(x_pos, y_pos)) {
      alert(Game.config.takenMsg);
      return;
    }
    Game.do.addDiscToBoard(x_pos, y_pos);
    Game.do.printBoard();
    if (
      Game.check.isVerticalWin() ||
      Game.check.isHorizontalWin() ||
      Game.check.isDiagonalWin()
    ) {
      gameBoardEl.removeEventListener("click", placeGamePiece);
      prefixEl.textContent = Game.config.winMsg;
      currentPlayerNameEl.contentEditable = false;
      secondaryTextEl.remove();
      playAgainEl.classList.add("show");
      return;
    } else if (Game.check.isGameADraw()) {
      gameBoardEl.removeEventListener("click", placeGamePiece);
      primaryTextEl.textContent = Game.config.drawMsg;
      secondaryTextEl.remove();
      playAgainEl.classList.add("show");
      return;
    }
    Game.do.changePlayer();
  }
})();
