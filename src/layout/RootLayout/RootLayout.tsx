import { SVG_Logo } from "../../assets";

function RootLayout() {
  return (
    <>
      <header>
        <div className="container">
          <div>
            <SVG_Logo />
          </div>

          <button>Reset</button>
          <span>Balance: 10000€</span>
        </div>
      </header>
      <main>
        <div className="container">
            
        </div>
      </main>
    </>
  );
}

export { RootLayout };
