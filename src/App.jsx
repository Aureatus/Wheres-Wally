import GameCanvas from "./Components/GameCanvas";
import wallyImage1 from "./Assets/wheres-wally-1.jpg";

function App() {
  const drawWallyImage = (context, image1) => {
    context.drawImage(image1, 0, 0);
  };
  const wallyImage = new Image();
  wallyImage.src = wallyImage1;

  return (
    <div className="App">
      <header></header>
      <main>
        <GameCanvas drawWallyImage={drawWallyImage} wallyImage={wallyImage} />
      </main>
    </div>
  );
}

export default App;
