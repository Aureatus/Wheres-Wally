import GameCanvas from "./Components/GameCanvas";
import wallyImage1 from "./Assets/wheres-wally-beach-scaled.jpg";

import { initializeApp } from "firebase/app";
import { createContext, useEffect, useRef, useState } from "react";

import { getFirestore, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARq8iPDaAvq2ZLrYYYyVsw146hbLbpFvg",
  authDomain: "wheres-wally-1fa55.firebaseapp.com",
  projectId: "wheres-wally-1fa55",
  storageBucket: "wheres-wally-1fa55.appspot.com",
  messagingSenderId: "907449387792",
  appId: "1:907449387792:web:01b104d7f66e4c38363395",
};

const app = initializeApp(firebaseConfig);

const characterCoordinateContext = createContext();

const characterCoordinates = {};

function App() {
  const [charactersFound, setCharactersFound] = useState({
    Wally: false,
    Odlaw: false,
    Wizard: false,
  });

  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(null);

  const startTime = useRef(Date.now());
  const finishTime = useRef(Date.now());

  const drawWallyImage = (context, image1) => {
    context.drawImage(image1, 0, 0);
  };
  const wallyImage = new Image();
  wallyImage.src = wallyImage1;

  const fetchCharacterCoords = async () => {
    const database = getFirestore(app);
    const beachCharacterQuery = collection(database, "WallyBeachImage");
    const beachCharacterSnap = await getDocs(beachCharacterQuery);
    beachCharacterSnap.forEach((doc) => {
      switch (doc.id) {
        case "WallyLocation":
          characterCoordinates[doc.id] = doc.data();
          break;
        case "OdlawLocation":
          characterCoordinates[doc.id] = doc.data();
          break;
        case "WizardLocation":
          characterCoordinates[doc.id] = doc.data();
          break;
        default:
          break;
      }
    });
  };

  const playerScores = {};

  const fetchPlayerScores = async () => {
    const database = getFirestore(app);
    const scoresQuery = collection(database, "scores");
    const scoresSnap = await getDocs(scoresQuery);
    scoresSnap.forEach((score) => {
      if (Object.keys(playerScores).length < 10) {
        playerScores[score.id] = score.data();
      }
    });
  };

  fetchPlayerScores();

  fetchCharacterCoords();

  useEffect(() => {
    if (Object.values(charactersFound).every((value) => value === true)) {
      finishTime.current = Date.now();
      setGameFinished(true);
    }
  }, [charactersFound]);

  useEffect(() => {
    if (gameFinished) {
      const score = (finishTime.current - startTime.current) / 1000;
      setScore(score);
    }
  }, [gameFinished, startTime, finishTime]);

  return (
    <div className="App">
      <main>
        <characterCoordinateContext.Provider value={characterCoordinates}>
          <GameCanvas
            drawWallyImage={drawWallyImage}
            wallyImage1={wallyImage}
            app={app}
            charactersFound={charactersFound}
            setCharactersFound={setCharactersFound}
          />
        </characterCoordinateContext.Provider>
      </main>
    </div>
  );
}

export default App;
export { characterCoordinateContext };
