import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let init = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [arr, setArr] = useState(init);
  const [player, setPlayer] = useState<boolean | undefined>(undefined);

  //for disabling all buttons
  const disable = () => {
    document.querySelectorAll("[data-btn]")?.forEach((i) => {
      i?.setAttribute("disabled", "disabled");
    });
  };

  //for hiding start buton
  const enable = () => {
    document.querySelector("[data-start]")?.classList.toggle("opacity-0");
  };

  useEffect(() => {
    disable();
  }, []);

  const handleClick = (e: any) => {
    let p: string;
    player ? (p = "x") : (p = "o");
    let ar = arr;

    //setting values
    ar.map((r: any, i: number) => {
      if (i == e.i) {
        r.map((c: any, j: number) => {
          if (j == e.j) {
            console.log(i, j);
            r.splice(j, 1, p);
          }
          return r;
        });
      }
    });
    setArr(ar);

    //checks horizontally
    var c = `Player ${player ? 1 : 2} won`;
    var flag = false;
    ar.map((r: any, i: number) => {
      let prev: any = ar[i][0];
      let won = true;
      r.map((c: any, j: number) => {
        if (c != prev || c == "") {
          won = false;
        }
      });

      if (won) {
        disable();
        enable();
        setArr(init);
        setPlayer(undefined);
        flag = true;
        alert(JSON.stringify(c));
      }
    });

    //checks vertitally
    for (let j = 0; j <= 2; j++) {
      var prev: any = ar[0][j];
      let won = true;
      for (let i = 0; i <= 2; i++) {
        console.log(i);
        if (ar[i][j] != prev || ar[i][j] == "") {
          won = false;
        }
      }
      if (won) {
        disable();
        setArr(init);
        setPlayer(undefined);
        flag = true;
        alert(JSON.stringify(c));
        enable();
      }
    }

    //checks diagonally .ie from top left to bottom right
    {
      let won = true;
      for (let i = 1; i <= 2; i++) {
        let prev = ar[0][0];
        if (ar[i][i] != prev || ar[i][i] == "") {
          won = false;
        }
      }

      if (won) {
        disable();
        enable();
        setArr(init);
        setPlayer(undefined);
        flag = true;
        alert(JSON.stringify(c));
      }
    }

    //checks diagonally .ie from top right to bottom left
    {
      let won = true;
      let j = 1;
      for (let i = 1; i >= 0; i--) {
        let prev = ar[0][2];
        if (ar[j][i] != prev || ar[j][i] == "") {
          won = false;
        }
        j++;
      }
      if (won) {
        disable();
        enable();
        setArr(init);
        setPlayer(undefined);
        flag = true;
        alert(JSON.stringify(c));
      }
    }

    //set player only if flag is false
    !flag && setPlayer(!player);
  };
  return (
    <div className="App bg-amber-50 flex justify-center py-24 md:py-8 items-center h-screen flex-col gap-20 md:gap-8">
      {player != undefined ? (
        <p className="text-gray-800 rounded-3xl md:font-bold font:semibold font-mono ">
          Player {player ? 1 : 2}'s turn.{" "}
        </p>
      ) : (
        <span className="opacity-0">.</span>
      )}

      <section className="flex flex-col  ">
        {arr.map((r: any, i: number) => {
          {
            return (
              <div className="flex  border-b-2 row border-gray-800   ">
                {r?.map((c: any, j: number) => {
                  return (
                    <button
                      data-btn
                      key={j}
                      onClick={() => {
                        handleClick({ i, j });
                      }}
                      className="bg-amber-50 column border-r-2 border-gray-800 hover:bg-amber-100 font-bold text-4xl  w-8 h-8 md:p-20 p-14  flex justify-center items-center aspect-square "
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            );
          }
        })}
      </section>
      <section className=" flex items-center justify-center">
        <button
          data-start
          onClick={() => {
            setPlayer(true);
            document
              .querySelector("[data-start]")
              ?.classList.toggle("opacity-0");
            document.querySelectorAll("[data-btn]")?.forEach((i) => {
              i?.removeAttribute("disabled");
            });
          }}
          className="bg-white border-2 text-gray-800  border-gray-800 md:text-3xl font-mono font-semibold hover:bg-cyan-200  px-8 rounded-3xl  py-2  inline-flex items-center  "
        >
          Start
        </button>
      </section>
    </div>
  );
}

export default App;
