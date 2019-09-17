const songLyricsArray = {
1: "Avalokiteshvara, while practicing deeply with, the Insight that Brings Us to the Other Shore, suddenly discovered that, all of the five Skandhas are equally empty, and with this realisation, he overcame all Ill-being., Listen Sariputra, this Body itself is Emptiness, and Emptiness itself is this Body., This Body is not other than Emptiness, and Emptiness is not other than this Body., The same is true of Feelings, Perceptions Mental Formations, and Consciousness., Listen Sariputra all phenomena, bear the mark of Emptiness;, their true nature is the nature of, no Birth no Death, no Being no Non-being, no Defilement no Purity, no Increasing no Decreasing., That is why in Emptiness, Body Feelings Perceptions, Mental Formations and Consciousness, are not separate self entities., The Eighteen Realms of Phenomena, which are the six Sense Organs, the six Sense Objects, and the six Consciousnesses, are also not separate self entities., The Twelve Links of Interdependent Arising, and their Extinction, are also not separate self entities., Ill-being, the Causes of Ill-being, the End of Ill-being, the Path, insight and attainment, are also not separate self entities., Whoever can see this, no longer needs anything to attain., Bodhisattvas who practice, the Insight that Brings Us to the Other Shore, see no more obstacles in their mind, and because there, are no more obstacles in their mind, they can overcome all fear, destroy all wrong perceptions, and realize Perfect Nirvana., All Buddhas in the past, present and future, by practicing, the Insight that Brings Us to the Other Shore, are all capable of attaining, Authentic and Perfect Enlightenment., Therefore Sariputra, it should be known that, the Insight that Brings Us to the Other Shore, is a Great Mantra, the most illuminating mantra, the highest mantra, a mantra beyond compare, the True Wisdom that has the power, to put an end to all kinds of suffering., Therefore let us proclaim, a mantra to praise, the Insight that Brings Us to the Other Shore., Gate Gate Paragate Parasamgate Bodhi Svaha!, Gate Gate Paragate Parasamgate Bodhi Svaha!, Gate Gate Paragate Parasamgate Bodhi Svaha! ".split(', '),
2: "This is the story of Micheal, the ugliest boy in town!, Ugly and weak!, They called him a FREAK!, and he spent his life living underground, spent his life living underground, spent his life living underground.".split(', ')
};
// INITIAL REDUX STATE
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Heart Sutra",
      artist: "The Monks",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "Story of Micheal",
      artist: "Don't hug me I'm scared",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    }
  }
};

// REDUX REDUCERS
const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    case 'RESTART_SONG':
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    default:
      return state;
  }
}

const rootReducer = this.Redux.combineReducers({
  currentSongId: songChangeReducer,
  songsById: lyricChangeReducer
});

const songChangeReducer = (state = initialState.currentSongId, action) => {
  switch (action.type){
    case 'CHANGE_SONG':
      return action.newSelectedSongId
    default:
      return state;
  }
}

// JEST TESTS + SETUP
const { expect } = window;

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC' })).toEqual({
  1: {
    title: "Heart Sutra",
    artist: "The Monks"",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "Story of Micheal",
    artist: "Don't hug me I'm scared"",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1,
  }
});

expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1 })).toEqual({
  1: {
    title: "Heart Sutra",
    artist: "The Monks",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "Story of Micheal",
    artist: "Don't hug me I'm scared"",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});





expect(songChangeReducer(initialState, { type: null })).toEqual(initialState);

expect(songChangeReducer(initialState, { type: 'CHANGE_SONG', newSelectedSongId: 1 })).toEqual(1);
expect(rootReducer(initialState, { type: null })).toEqual(initialState);
expect(store.getState().currentSongId).toEqual(songChangeReducer(undefined, { type: null }));
expect(store.getState().songsById).toEqual(lyricChangeReducer(undefined, { type: null }));

// REDUX STORE
const { createStore } = Redux;
const store = createStore(rootReducer);

// JEST TESTS + SETUP
const { expect } = window;

// RENDERING STATE IN DOM
const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }

  if (store.getState().currentSongId) {
    const currentLine = document.createTextNode(store.getState().songsById[store.getState().currentSongId].songArray[store.getState().songsById[store.getState().currentSongId].arrayPosition]);
    document.getElementById('lyrics').appendChild(currentLine);
  } else {
    const selectSongMessage = document.createTextNode("Select a song from the menu above to sing along!");
    document.getElementById('lyrics').appendChild(selectSongMessage);
  }
}



const renderSongs = () => {
  const songsById = store.getState().songsById;
  for (const songKey in songsById) {
    const song = songsById[songKey]
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const em = document.createElement('em');
    const songTitle = document.createTextNode(song.title);
    const songArtist = document.createTextNode(' by ' + song.artist);
    em.appendChild(songTitle);
    h3.appendChild(em);
    h3.appendChild(songArtist);
    h3.addEventListener('click', function() {
      selectSong(song.songId);
    });
    li.appendChild(h3);
    document.getElementById('songs').appendChild(li);
  }
}

window.onload = function() {
  renderSongs();
  renderLyrics();
}

const userClick = () => {
  if (store.getState().songsById[store.getState().currentSongId].arrayPosition === store.getState().songsById[store.getState().currentSongId].songArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG',
                     currentSongId: store.getState().currentSongId });
  } else {
    store.dispatch({ type: 'NEXT_LYRIC',
                     currentSongId: store.getState().currentSongId });
  }
}

const selectSong = (newSongId) => {
  let action;
  if (store.getState().currentSongId) {
    action = {
      type: 'RESTART_SONG',
      currentSongId: store.getState().currentSongId
    }
    store.dispatch(action);
  }
  action = {
    type: 'CHANGE_SONG',
    newSelectedSongId: newSongId
  }
  store.dispatch(action);
}

// SUBSCRIBE TO REDUX STORE
store.subscribe(renderLyrics);