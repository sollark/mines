'use strict';

let gLeaders = [];

function onClearLeadersClick() {
  clearLeaderRecords();
}

function initLeaderList() {
  gLeaders = [];
  loadLeaders();
  renderLeaders(gLeaders);
}

function loadLeaders() {
  let leadersFromStorage = null;

  switch (gLevel.SIZE) {
    case EASY:
      leadersFromStorage = loadFromLS('easyLeaders');
      break;
    case MEDIUM:
      leadersFromStorage = loadFromLS('mediumLeaders');
      break;
    case EXPERT:
      leadersFromStorage = loadFromLS('expertLeaders');
      break;
  }
  if (leadersFromStorage) {
    gLeaders = leadersFromStorage;
  }
}

function checkIfLeader(time) {
  // if player has better time than last in gLeaders
  if (gLeaders.length < 10 || gDurationTime < gLeaders.at(-1).time) {
    // create leader object
    let playerName = promptUserName();
    const player = { name: playerName, time: gDurationTime };

    // if gLeaders reach 10 records
    if (gLeaders.length === 10) gLeaders.pop();

    //save
    saveToLeaders(player);
    renderLeaders(gLeaders);
  }
}

function renderLeaders(leaders) {
  const elLeaderList = document.querySelector('.leaders');
  let strHTML = '';

  for (let leader of leaders) {
    strHTML +=
      `<li>
        <span class='name'>${leader.name} </span>
        <span class='time'> 
        time: ` +
      ('' + leader.time).toMMSS() +
      `</span>
      </li>`;
  }

  elLeaderList.innerHTML = strHTML;
}

function saveToLeaders(player) {
  gLeaders.push(player);

  // sort leaders by game time
  gLeaders.sort((leader1, leader2) => {
    return leader1.time - leader2.time;
  });

  switch (gLevel.SIZE) {
    case EASY:
      saveToLS('easyLeaders', gLeaders);
      break;
    case MEDIUM:
      saveToLS('mediumLeaders', gLeaders);
      break;
    case EXPERT:
      saveToLS('expertLeaders', gLeaders);
      break;
  }
}

function clearLeaderRecords() {
  gLeaders = [];
  switch (gLevel.SIZE) {
    case EASY:
      removeFromLS('easyLeaders');
      break;
    case MEDIUM:
      removeFromLS('mediumLeaders');
      break;
    case EASY:
      removeFromLS('expertLeaders');
      break;
  }

  renderLeaders(gLeaders);
}

function promptUserName() {
  let playerName = null;

  while (true) {
    playerName = prompt('What is your name?');
    if (playerName.length > 15) alert('Too long');
    else break;
  }

  return playerName || 'Player';
}

{
  /* <ul class='leaders'></ul>; */
}
