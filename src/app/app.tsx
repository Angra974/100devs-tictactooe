import React, { useId, useEffect } from "react";
function g_i(id) {
  return document.getElementById(id);
}
function g_s(el) {
  return document.querySelector(el);
}
function g_sa(el) {
  return document.querySelectorAll(el);
}

const DEFAULT_WIN_LIST = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * class for the game
 */
class TicTacToe {
  playerOne = "";
  playerTwo = "";
  count = 0;
  board: any = [];
  score: any = {};

  /**
   * no need for parameters
   */
  constructor() {
    this.count = 0;
    this.score = {
      playerX: 0,
      playerO: 0,
    };
  }

  /**
   *
   * @param player update the score for the players
   */
  updateScore(player: string) {
    if (player === "o") {
      party.score.playerO++;
      g_i("scoreO").textContent = party.score.playerO.toString();
    } else {
      party.score.playerX++;
      g_i("scoreX").textContent = party.score.playerX.toString();
    }
  }

  /**
   * change the user based on the content of the element
   * @param el element clicked
   */
  changePlayer(el: HTMLElement) {
    el.innerText = el.innerText.toLowerCase() === "o" ? "x" : "o";
  }

  updateCount() {
    this.count++;
  }

  checkForWinner(player) {
    console.log("checkForWinner");
    const all_list = g_sa("li");
    const partyResult = g_i("result");
    let boardy: any = [];
    boardy = structuredClone(DEFAULT_WIN_LIST);
    [...all_list].map((el) => {
      boardy.map((n, m) =>
        n.map((x, y) => {
          //     console.log(x === Number(el.dataset.id));
          //    console.log(el.textContent);
          Number(x) == Number(el.dataset.id)
            ? (boardy[m][y] = el.textContent)
            : null;
        })
      );
    });
    const haveAWinner = boardy.filter(
      (x) => x.join("") == `${player}${player}${player}`
    );

    let endGame = haveAWinner.length === 1;
    if (endGame) {
      partyResult.textContent = `Player ${player.toUpperCase()} win!`;
      partyResult.hidden = false;
      setTimeout(() => {
        partyResult.hidden = true;
      }, 3000);

      party.updateScore(player.toLowerCase());
      localStorage.setItem("partyOngoing", "false");
    } else if (!endGame && party.count > 7) {
      partyResult.textContent = `We have a draw!`;
      partyResult.hidden = false;
      setTimeout(() => {
        partyResult.hidden = true;
      }, 3000);
      localStorage.setItem("partyOngoing", "false");
      endGame = true;
    }

    //  console.log(played);
    return endGame;
  }

  /**
   * start a new party, reset count to 0.
   */
  handleNewParty() {
    const lists = g_sa("li");
    this.count = 0;
    lists.forEach((list) => {
      list.textContent = "";
    });
    // ? party is on the rune, we can click
    localStorage.setItem("partyOngoing", "true");
  }
}

const party = new TicTacToe();

const App = (): JSX.Element => {
  const list = [];
  const id = useId();

  const handleUser = (el) => {
    const partyOngoing = localStorage.getItem("partyOngoing");
    if (partyOngoing === "true") {
      const currentPlayer = document.getElementById("currentPlayer");
      if (el.target.textContent === "") {
        const _id = Number(el.target.dataset.id);
        el.target.textContent = currentPlayer.innerText.toLowerCase();
        // if (!isGameOver(el.target.textContent)) changePlayer(currentPlayer);

        // no need to do anything before the 5th click
        let endGame = false;
        if (party.count > 3) {
          endGame = party.checkForWinner(el.target.textContent);
        }
        if (!endGame) {
          party.updateCount();
          party.changePlayer(currentPlayer);
        }
      } else {
        el.target.style.backgroundColor = "red";
        setTimeout(() => {
          el.target.style.backgroundColor = "transparent";
        }, 250);
      }
    }

    //    party.checkForWinner();
  };

  const createList = () => {
    for (let i = 0; i < 9; i++) {
      list.push(
        React.createElement("li", {
          key: `${id}-${i}`,
          "data-id": `${i}`,
          onClick: (e) => handleUser(e),
        })
      );
    }
    return list;
  };

  useEffect(() => {
    localStorage.setItem("partyOngoing", "false");
    party.handleNewParty();
  });

  createList();
  return (
    <main>
      <section className="tictactoe">
        <h2>Tic Tac Toe</h2>
        <div className="players">
          <div>
            <span className="name">Player X : </span>{" "}
            <span id="scoreX">{party.score.playerX}</span>
          </div>
          <div>
            <span className="name">Player O : </span>
            <span id="scoreO">{party.score.playerO}</span>
          </div>
        </div>
        <p>
          Next player is <span id="currentPlayer">X</span>
        </p>
        <ul id="app">{list}</ul>
        <span>
          <button
            id="play"
            onClick={() => {
              party.handleNewParty();
            }}
          >
            Play Now! / Reset
          </button>
        </span>
        <span id="result" hidden></span>
      </section>
    </main>
  );
};

export default App;
