const tape = document.querySelector(".tape");
const inputCadena = document.querySelector("#cadenaMT");
const output = document.querySelector(".output");
const estado = document.querySelector(".estadoActual");

// const testString = "A0000B0000C0000T0000S00001001000110011010111101110111";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fillTape() {
  const cadena = `b${inputCadena.value}b`;
  for (character of cadena) {
    tape.insertAdjacentHTML(
      "beforeend",
      `
          <div class="element">${character}</div>
      `
    );
  }
}

const tapeElements = document.getElementsByClassName("element");

let estadoActual = "CodigoInstruccion";

let cabezal = 1;

async function start() {
  while (estadoActual !== "Fin" && estadoActual !== "Reject") {
    switch (estadoActual) {
      case "CodigoInstruccion":
        estadoActual = await codigoInstruccion();
        break;
      case "Q1":
        estadoActual = await codigoInstruccion();
        break;
      case "AsignarValor":
        estadoActual = await identificarVariableAsignarValor();
        break;
      case "AsignarValorA":
        estadoActual = await asignarValorA();
        break;
      case "AsignarValorB":
        estadoActual = await asignarValorB();
        break;
      case "AsignarValorC":
        estadoActual = await asignarValorC();
        break;
      case "AsignarVariables":
        estadoActual = await identificarDosVariables();
        break;
      case "CombAB":
        estadoActual = await asignarAB();
        break;
      case "CombAC":
        estadoActual = await asignarAC();
        break;
      case "CombAT":
        estadoActual = await asignarAT();
        break;
      case "CombAA":
        estadoActual = await asignarAA();
        break;
      case "CombBA":
        estadoActual = await asignarBA();
        break;
      case "CombBC":
        estadoActual = await asignarBC();
        break;
      case "CombBT":
        estadoActual = await asignarBT();
        break;
      case "CombBB":
        estadoActual = await asignarBB();
        break;
      case "CombCA":
        estadoActual = await asignarCA();
        break;
      case "CombCB":
        estadoActual = await asignarCB();
        break;
      case "CombCT":
        estadoActual = await asignarCT();
        break;
      case "CombCC":
        estadoActual = await asignarCC();
        break;
      case "CombTA":
        estadoActual = await asignarTA();
        break;
      case "CombTT":
        estadoActual = await asignarTT();
        break;
      case "CombTB":
        estadoActual = await asignarTB();
        break;
      case "CombTC":
        estadoActual = await asignarTC();
        break;
      case "Desplazar":
        estadoActual = await introDesplazar();
        break;
      case "Q217":
        estadoActual = await desplazarDerecha();
        break;
      case "Q500":
        estadoActual = await desplazarIzquierda();
        break;
      case "ComplementoA2":
        estadoActual = await identificarComplemento();
        break;
      case "ComplementoA":
        estadoActual = await complementoA();
        break;
      case "ComplementoB":
        estadoActual = await complementoB();
        break;
      case "ComplementoC":
        estadoActual = await complementoC();
        break;
      case "ComplementoT":
        estadoActual = await complementoT();
        break;
      case "Sumar":
        estadoActual = await identificarSuma();
        break;
      case "SumaAA":
        estadoActual = await sumaAA();
        break;
      case "SumaBB":
        estadoActual = await sumaBB();
        break;
      case "SumaCC":
        estadoActual = await sumaCC();
        break;
      case "SumaBC":
        estadoActual = await sumaBC();
        break;
      case "SumaAB":
        estadoActual = await sumaAB();
        break;
      case "SumaAC":
        estadoActual = await sumaAC();
        break;
      case "InicioRepetir":
        estadoActual = await repetir();
        break;
      case "Q456":
        estadoActual = await repetir();
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  if (estadoActual === "Fin") {
    output.innerHTML = "La Máquina de Turing terminó con éxito";
  }
  if (estadoActual === "Reject") {
    output.innerHTML = "La Máquina de Turing rechazó la cadena";
  }
}

async function codigoInstruccion() {
  const salidas = [
    "Desplazar",
    "Sumar",
    "AsignarValor",
    "AsignarVariables",
    "ComplementoA2",
    "InicioRepetir",
    // "FinRepetir",
    "Fin",
    "Q456",
  ];
  while (!salidas.find((element) => element === estadoActual)) {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let simbolo = tapeElements[cabezal].innerHTML;
    let containerSimbolo = tapeElements[cabezal];

    switch (estadoActual) {
      case "CodigoInstruccion":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q1":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q2";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q5";
        }
        if (simbolo === "F") {
          estadoActual = "Q456";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q2":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q4";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q3";
        }
        break;
      case "Q3":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Desplazar";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Sumar";
        }
        break;
      case "Q4":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "AsignarValor";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "AsignarVariables";
        }
        break;
      case "Q5":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q7";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q6";
        }
        break;
      case "Q6":
        // if (simbolo === "0") {
        //   cabezal++;
        //   colorearCasilla("R");
        //   estadoActual = "FinRepetir";
        // }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Fin";
        }
        break;
      case "Q7":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "ComplementoA2";
        }
        if (simbolo === "1") {
          containerSimbolo.innerHTML = "R";
          cabezal++;
          colorearCasilla("R");
          estadoActual = "InicioRepetir";
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function identificarVariableAsignarValor() {
  const salidas = ["AsignarValorA", "AsignarValorB", "AsignarValorC"];

  while (!salidas.find((element) => element === estadoActual)) {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "AsignarValor":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q8";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q9";
        }
        break;
      case "Q9":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "AsignarValorC";
        }
        break;
      case "Q8":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "AsignarValorA";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "AsignarValorB";
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function asignarValorA() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "AsignarValorA":
        if (simbolo === "0") {
          estadoActual = "Q10";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q13";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q10":
        if (simbolo === "A") {
          estadoActual = "Q11";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "A" || simbolo !== "X") {
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q11":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q12";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q12":
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          estadoActual = "A1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q13":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q14";
        }
        break;

      case "Q14":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q15";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q15":
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          estadoActual = "A1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "A1":
        if (simbolo === "0") {
          estadoActual = "Q16";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q20";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q16":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q17";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q17":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q18";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q18":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q19";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q19":
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          estadoActual = "A2";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q20":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q21";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q21":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q22";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q22":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q23";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q23":
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          estadoActual = "A2";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "A2":
        if (simbolo === "0") {
          estadoActual = "Q24";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q28";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q24":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q25";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q25":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q26";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q26":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q27";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q27":
        if (simbolo === "X") {
          estadoActual = "A3";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q28":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q29";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q29":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q30";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q30":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q31";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q31":
        if (simbolo === "Y") {
          estadoActual = "A3";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "A3":
        if (simbolo === "0") {
          estadoActual = "Q32";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q36";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q32":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q33";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q33":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q34";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q34":
        if (simbolo === "X") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q36":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q37";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q37":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q38";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q38":
        if (simbolo === "Y") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function asignarValorB() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "AsignarValorB":
        if (simbolo === "0") {
          estadoActual = "Q39";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q42";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q39":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q40";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q40":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q41";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q41":
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          estadoActual = "B1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q42":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q43";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q43":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q44";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q44":
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          estadoActual = "B1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "B1":
        if (simbolo === "0") {
          estadoActual = "Q45";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q49";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q45":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q46";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q46":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q47";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q47":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q48";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q48":
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          estadoActual = "B2";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q49":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q50";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q50":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q51";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q51":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q52";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q52":
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          estadoActual = "B2";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "B2":
        if (simbolo === "0") {
          estadoActual = "Q53";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q57";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q53":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q54";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q54":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q55";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q55":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q56";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q56":
        if (simbolo === "X") {
          estadoActual = "B3";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q57":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q58";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q58":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q59";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q59":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q60";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q60":
        if (simbolo === "Y") {
          estadoActual = "B3";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "B3":
        if (simbolo === "0") {
          estadoActual = "Q61";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q64";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q61":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q62";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q62":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q63";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q63":
        if (simbolo === "X") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q64":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q65";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q65":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q66";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q66":
        if (simbolo === "Y") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function asignarValorC() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "AsignarValorC":
        if (simbolo === "0") {
          estadoActual = "Q68";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q71";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q68":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q69";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q69":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q70";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q70":
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          estadoActual = "C1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q71":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q72";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q72":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q73";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q73":
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          estadoActual = "C1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "C1":
        if (simbolo === "0") {
          estadoActual = "Q74";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q78";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q74":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q75";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q75":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q76";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q76":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q77";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q77":
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          estadoActual = "C2";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q78":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q79";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q79":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q80";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q80":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q81";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q81":
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          estadoActual = "C2";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "C2":
        if (simbolo === "0") {
          estadoActual = "Q82";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q86";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q82":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q83";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q83":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q84";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q84":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q85";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q85":
        if (simbolo === "X") {
          estadoActual = "C3";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q86":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q87";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q87":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q88";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q88":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q89";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q89":
        if (simbolo === "Y") {
          estadoActual = "C3";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "C3":
        if (simbolo === "0") {
          estadoActual = "Q90";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q93";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q90":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q91";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q91":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q92";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q92":
        if (simbolo === "X") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "X") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q93":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q94";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q94":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q95";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q95":
        if (simbolo === "Y") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function identificarDosVariables() {
  const salidas = [
    "CombAB",
    "CombAA",
    "CombAC",
    "CombAT",
    "CombBA",
    "CombBC",
    "CombBB",
    "CombBT",
    "CombCT",
    "CombCC",
    "CombCA",
    "CombCB",
    "CombTA",
    "CombTB",
    "CombTC",
    "CombTT",
  ];

  while (!salidas.find((element) => element === estadoActual)) {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "AsignarVariables":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q106";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q116";
        }
        break;
      case "Q106":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q107";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q110";
        }
        break;
      case "Q107":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q108";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q109";
        }
        break;
      case "Q108":
        if (simbolo === "1") {
          containerSimbolo.innerHTML = "Z";
          estadoActual = "CombAB";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "CombAA";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q109":
        if (simbolo === "1") {
          containerSimbolo.innerHTML = "Z";
          estadoActual = "CombAT";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "CombAC";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q110":
        if (simbolo === "1") {
          estadoActual = "Q112";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q111";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q111":
        if (simbolo === "1") {
          estadoActual = "CombBB";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "CombBA";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q112":
        if (simbolo === "1") {
          estadoActual = "CombBT";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "CombBC";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q116":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q114";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q117";
        }
        break;
      case "Q117":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q118";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q119";
        }
        break;
      case "Q118":
        if (simbolo === "1") {
          estadoActual = "CombTB";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "CombTA";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q119":
        if (simbolo === "1") {
          estadoActual = "CombTT";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "CombTC";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q114":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q115";
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
          estadoActual = "Q113";
        }
        break;
      case "Q115":
        if (simbolo === "1") {
          estadoActual = "CombCB";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "CombCA";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q113":
        if (simbolo === "1") {
          estadoActual = "CombCT";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "CombCC";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function asignarAB() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombAB":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q97";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q97":
        if (simbolo === "C") {
          estadoActual = "Q98";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "0") {
          estadoActual = "Q101";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q102";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q101":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q103";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q102":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q104";
          cabezal++;
          colorearCasilla("R");
        }

        break;

      case "Q103":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q105";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q104":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q105";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q105":
        if (simbolo === "0" || simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "B") {
          estadoActual = "Q97";
          cabezal++;
          colorearCasilla("R");
        }

        break;

      case "Q98":
        if (simbolo === "1" || simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q99";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "B") {
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q99":
        if (simbolo !== "Z" && simbolo !== "R") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarAC() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombAC":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q129";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q129":
        if (simbolo === "T") {
          estadoActual = "Q135";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "0") {
          estadoActual = "Q130";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q131";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q130":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q132";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q131":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q133";
          cabezal++;
          colorearCasilla("R");
        }

        break;

      case "Q132":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q134";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q133":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q134";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q134":
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "B" ||
          simbolo === "C"
        ) {
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "X" || simbolo === "Y") {
          estadoActual = "Q129";
          cabezal++;
          colorearCasilla("R");
        }

        break;

      case "Q135":
        if (simbolo === "1" || simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q136";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "B" || simbolo === "C") {
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q136":
        if (simbolo !== "Z" && simbolo !== "R") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarAT() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombAT":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q120";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q120":
        if (simbolo === "S") {
          estadoActual = "Q126";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "0") {
          estadoActual = "Q121";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q122";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q121":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q123";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q122":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q124";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q123":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q125";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q124":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q125";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q125":
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "B" ||
          simbolo === "C"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q120";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q126":
        if (simbolo === "1" || simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q127";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "B" || simbolo === "C" || simbolo === "T") {
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q127":
        if (simbolo !== "Z" && simbolo !== "R") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarAA() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombAA":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q100";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q100":
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function asignarBA() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombBA":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q471";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q471":
        if (simbolo === "B") {
          estadoActual = "Q472";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "0") {
          estadoActual = "Q474";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q475";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q474":
        if (simbolo === "0" || simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "B") {
          estadoActual = "Q476";
          cabezal++;
          colorearCasilla("R");
        }

        break;
      case "Q475":
        if (simbolo === "0" || simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "B") {
          estadoActual = "Q477";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q476":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q478";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q477":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q478";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }

        break;
      case "Q478":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q471";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q472":
        if (simbolo === "1" || simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q473";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q473":
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "B" ||
          simbolo === "C" ||
          simbolo === "T" ||
          simbolo === "S"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarBC() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombBC":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q140";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q140":
        if (simbolo === "T") {
          estadoActual = "Q141";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q142";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q143";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q142":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q144";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q143":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q145";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q144":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q146";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q145":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q146";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q146":
        if (simbolo !== "C") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "C") {
          estadoActual = "Q140";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q141":
        if (simbolo === "1" || simbolo === "0" || simbolo === "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q147";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q147":
        if (simbolo !== "Z" && simbolo !== "R") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarBT() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombBT":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q149";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q149":
        if (simbolo === "S") {
          estadoActual = "Q155";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q150";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q151";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q150":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q152";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q151":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q153";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q152":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q154";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q153":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q154";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q154":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q149";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q155":
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "C" ||
          simbolo === "T"
        ) {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q156";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q156":
        if (simbolo !== "Z" && simbolo !== "R") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarBB() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombBB":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q479";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q479":
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function asignarCA() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombCA":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q158";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q158":
        if (simbolo === "B") {
          estadoActual = "Q164";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "0") {
          estadoActual = "Q159";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q160";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q159":
        if (simbolo !== "C") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "C") {
          estadoActual = "Q161";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q160":
        if (simbolo !== "C") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "C") {
          estadoActual = "Q162";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q161":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q163";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q162":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q163";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q163":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q158";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q164":
        if (simbolo === "1" || simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q165";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q165":
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "B" ||
          simbolo === "C" ||
          simbolo === "T" ||
          simbolo === "S"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarCB() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombCB":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q167";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q167":
        if (simbolo === "C") {
          estadoActual = "Q173";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q168";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q169";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q168":
        if (simbolo !== "C") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "C") {
          estadoActual = "Q170";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q169":
        if (simbolo !== "C") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "C") {
          estadoActual = "Q171";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q170":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q172";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q171":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q172";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("R");
        }
        break;
      case "Q172":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q167";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q173":
        if (simbolo === "1" || simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q174";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q174":
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "C" ||
          simbolo === "T" ||
          simbolo === "S"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarCT() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombCT":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q176";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q176":
        if (simbolo === "S") {
          estadoActual = "Q182";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "0") {
          estadoActual = "Q177";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q178";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q177":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q179";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q178":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q180";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q179":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q181";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q180":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q181";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q181":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q176";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q182":
        if (simbolo === "1" || simbolo === "0" || simbolo === "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q183";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q183":
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "T" ||
          simbolo === "S"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarCC() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombCC":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q185";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q185":
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function asignarTA() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombTA":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q188";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q188":
        if (simbolo === "B") {
          estadoActual = "Q189";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q192";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q193";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q192":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q194";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q193":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q195";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q194":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q196";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q195":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q196";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q196":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q188";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q189":
        if (simbolo === "1" || simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q190";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q190":
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "B" ||
          simbolo === "C" ||
          simbolo === "T" ||
          simbolo === "S"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarTT() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombTT":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q197";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q197":
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function asignarTB() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombTB":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q199";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q199":
        if (simbolo === "C") {
          estadoActual = "Q200";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q203";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q204";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q203":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q205";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q204":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q206";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q205":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q207";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q206":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q207";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q207":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q199";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q200":
        if (simbolo === "1" || simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q201";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q201":
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "C" ||
          simbolo === "T" ||
          simbolo === "S"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function asignarTC() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "CombTC":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q208";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q208":
        if (simbolo === "T") {
          estadoActual = "Q209";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q212";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q213";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q212":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q214";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q213":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q215";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q214":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q216";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q215":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q216";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q216":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q208";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q209":
        if (simbolo === "1" || simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q210";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q210":
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "T" ||
          simbolo === "S"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          containerSimbolo.innerHTML = "1";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          containerSimbolo.innerHTML = "0";
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function introDesplazar() {
  while (estadoActual !== "Q217" && estadoActual !== "Q500") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "Desplazar":
        if (simbolo === "0") {
          estadoActual = "Q251";
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "1") {
          estadoActual = "Q252";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q251":
        if (simbolo === "0") {
          estadoActual = "Q253";
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "1") {
          estadoActual = "Q258";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q252":
        if (simbolo === "0") {
          estadoActual = "Q263";
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "1") {
          estadoActual = "Q268";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q253":
        if (simbolo === "0") {
          estadoActual = "Q254";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "1") {
          estadoActual = "Q256";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q254":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "B") {
          estadoActual = "Q500";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q256":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "A") {
          estadoActual = "Q217";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q258":
        if (simbolo === "0") {
          estadoActual = "Q259";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "1") {
          estadoActual = "Q261";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q259":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "C") {
          estadoActual = "Q500";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q261":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "B") {
          estadoActual = "Q217";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q263":
        if (simbolo === "0") {
          estadoActual = "Q264";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "1") {
          estadoActual = "Q266";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q264":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "T") {
          estadoActual = "Q500";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q266":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "C") {
          estadoActual = "Q217";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q268":
        if (simbolo === "0") {
          estadoActual = "Q269";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "1") {
          estadoActual = "Q271";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q269":
        if (simbolo !== "S") {
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "S") {
          estadoActual = "Q500";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q271":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }

        if (simbolo === "T") {
          estadoActual = "Q217";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function desplazarDerecha() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "Q217":
        if (simbolo === "0") {
          estadoActual = "Q218";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q235";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q218":
        if (simbolo === "0") {
          estadoActual = "Q227";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q219";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q219":
        if (simbolo === "0") {
          estadoActual = "Q220";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q223";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q220":
        if (simbolo === "0") {
          estadoActual = "Q222";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q221";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q221":
      case "Q222":
      case "Q224":
      case "Q225":
      case "Q230":
      case "Q232":
      case "Q231":
      case "Q233":
      case "Q234":
      case "Q240":
      case "Q241":
      case "Q244":
      case "Q245":
      case "Q246":
      case "Q248":
      case "Q249":
        if (simbolo === "X") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo !== "X" && simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q223":
        if (simbolo === "0") {
          estadoActual = "Q224";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q225";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q227":
        if (simbolo === "0") {
          estadoActual = "Q229";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q228";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q228":
        if (simbolo === "0") {
          estadoActual = "Q232";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q230";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q229":
        if (simbolo === "0") {
          estadoActual = "Q231";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q233";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q235":
        if (simbolo === "0") {
          estadoActual = "Q238";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q236";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q236":
        if (simbolo === "0") {
          estadoActual = "Q239";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q237";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q237":
        if (simbolo === "0") {
          estadoActual = "Q240";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q234";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q239":
        if (simbolo === "0") {
          estadoActual = "Q244";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q241";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q238":
        if (simbolo === "0") {
          estadoActual = "Q247";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q243";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q243":
        if (simbolo === "0") {
          estadoActual = "Q246";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q245";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q247":
        if (simbolo === "0") {
          estadoActual = "Q249";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q248";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function desplazarIzquierda() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "Q500":
        if (simbolo === "0") {
          estadoActual = "Q501";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q516";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q501":
        if (simbolo === "0") {
          estadoActual = "Q509";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q502";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q502":
        if (simbolo === "0") {
          estadoActual = "Q503";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q506";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q503":
        if (simbolo === "0") {
          estadoActual = "Q505";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q504";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q504":
      case "Q505":
      case "Q507":
      case "Q508":
      case "Q511":
      case "Q513":
      case "Q514":
      case "Q515":
      case "Q519":
      case "Q522":
      case "Q523":
      case "Q529":
      case "Q530":
      case "Q528":
      case "Q526":
      case "Q527":
        if (simbolo === "X") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo !== "X" && simbolo !== "Y") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q506":
        if (simbolo === "0") {
          estadoActual = "Q507";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q508";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q509":
        if (simbolo === "0") {
          estadoActual = "Q512";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q510";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q510":
        if (simbolo === "0") {
          estadoActual = "Q513";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q511";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q512":
        if (simbolo === "0") {
          estadoActual = "Q514";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q515";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q516":
        if (simbolo === "0") {
          estadoActual = "Q520";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q517";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q517":
        if (simbolo === "0") {
          estadoActual = "Q521";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q518";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q518":
        if (simbolo === "0") {
          estadoActual = "Q522";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q519";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q521":
        if (simbolo === "0") {
          estadoActual = "Q529";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q523";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q520":
        if (simbolo === "0") {
          estadoActual = "Q525";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q524";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q524":
        if (simbolo === "0") {
          estadoActual = "Q528";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q530";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q525":
        if (simbolo === "0") {
          estadoActual = "Q527";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q526";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }
  return estadoActual;
}

async function identificarComplemento() {
  const salidas = [
    "ComplementoA",
    "ComplementoB",
    "ComplementoC",
    "ComplementoT",
  ];

  while (!salidas.find((element) => element === estadoActual)) {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let simbolo = tapeElements[cabezal].innerHTML;
    let containerSimbolo = tapeElements[cabezal];

    switch (estadoActual) {
      case "ComplementoA2":
        if (simbolo === "0") {
          estadoActual = "Q289";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q290";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q289":
        if (simbolo === "0") {
          estadoActual = "ComplementoA";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "ComplementoB";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q290":
        if (simbolo === "0") {
          estadoActual = "ComplementoC";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "ComplementoT";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function complementoA() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "ComplementoA":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q273";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q273":
        if (simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q274";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q275";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q274":
        if (simbolo === "0") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q275";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q275":
        if (simbolo !== "Z" && simbolo !== "R") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function complementoB() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "ComplementoB":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q277";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q277":
        if (simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q278";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q279";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q278":
        if (simbolo === "0") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q279";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q279":
        if (simbolo !== "Z" && simbolo !== "R") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function complementoC() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "ComplementoC":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q281";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q281":
        if (simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q282";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q283";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q282":
        if (simbolo === "0") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q283";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q283":
        if (simbolo !== "Z" && simbolo !== "R") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function complementoT() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "ComplementoT":
        if (simbolo !== "S") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "S") {
          estadoActual = "Q285";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q285":
        if (simbolo === "0") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q286";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q287";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q286":
        if (simbolo === "0") {
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q287";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q287":
        if (simbolo !== "Z" && simbolo !== "R") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function sumaAA() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "SumaAA":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q301";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q301":
        if (simbolo === "0") {
          estadoActual = "Q302";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q302";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q302":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q303";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q303":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "A1";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "A1":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q304";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q304":
        if (simbolo === "Z") {
          estadoActual = "Q305";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q550";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q305":
        if (simbolo === "1") {
          estadoActual = "Q306";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q306";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q306":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q307";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q307":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q308";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q308":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "A2";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q550":
        if (simbolo === "1") {
          estadoActual = "Q309";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q309";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q309":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q310";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q310":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q311";
          cabezal--;
          colorearCasilla("L");
        }

        break;
      case "Q311":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "A2";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "A2":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q312";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q312":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q313";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q313":
        if (simbolo === "Z") {
          estadoActual = "Q314";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q318";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q314":
        if (simbolo === "1") {
          estadoActual = "Q315";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q315";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q315":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q316";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q316":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q317";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q317":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "A3";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q318":
        if (simbolo === "1") {
          estadoActual = "Q319";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q319";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q319":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q320";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q320":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q321";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q321":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "A3";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "A3":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q322";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q322":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q323";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q323":
        if (simbolo === "Z") {
          estadoActual = "Q324";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q327";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q324":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q325";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q325":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q326";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q326":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q330";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q327":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q328";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q328":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q329";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q329":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q330";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q330":
        if (simbolo === "1" || simbolo === "0" || simbolo === "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "R") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function sumaBB() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "SumaBB":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q331";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q331":
        if (simbolo === "0") {
          estadoActual = "Q332";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q332";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q332":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q333";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q333":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "B1";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "B1":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q334";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q334":
        if (simbolo === "Z") {
          estadoActual = "Q335";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q339";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q335":
        if (simbolo === "1") {
          estadoActual = "Q336";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q336";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q336":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q337";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q337":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q338";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q338":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "B2";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q339":
        if (simbolo === "1") {
          estadoActual = "Q340";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q340";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q340":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q341";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q341":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q342";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q342":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "B2";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "B2":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q344";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q344":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q345";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q345":
        if (simbolo === "Z") {
          estadoActual = "Q346";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q350";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q346":
        if (simbolo === "1") {
          estadoActual = "Q347";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q347";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q347":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q348";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q348":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q349";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q349":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "B3";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q350":
        if (simbolo === "1") {
          estadoActual = "Q351";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q351";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q351":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q352";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q352":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q353";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q353":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "B3";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "B3":
        if (simbolo !== "B") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q354";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q354":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q355";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q355":
        if (simbolo === "Z") {
          estadoActual = "Q356";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q359";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q356":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q357";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q357":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q358";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q358":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q362";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q359":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q360";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q360":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q361";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q361":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q362";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q362":
        if (simbolo === "1" || simbolo === "0" || simbolo === "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "R") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function sumaCC() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "SumaCC":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q363";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q363":
        if (simbolo === "0") {
          estadoActual = "Q364";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q364";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q364":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q365";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q365":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "C1";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "C1":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q366";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q366":
        if (simbolo === "Z") {
          estadoActual = "Q367";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q371";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q367":
        if (simbolo === "1") {
          estadoActual = "Q368";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q368";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q368":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q369";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q369":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q370";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q370":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "C2";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q371":
        if (simbolo === "1") {
          estadoActual = "Q372";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q372";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q372":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q373";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q373":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q374";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q374":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "C2";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "C2":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q375";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q375":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q376";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q376":
        if (simbolo === "Z") {
          estadoActual = "Q377";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q381";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q377":
        if (simbolo === "1") {
          estadoActual = "Q378";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q378";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q378":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q379";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q379":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q380";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q380":
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "C3";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q381":
        if (simbolo === "1") {
          estadoActual = "Q382";
          containerSimbolo.innerHTML = "Z";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q382";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q382":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q383";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q383":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q384";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q384":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "C3";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "C3":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q385";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q385":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q386";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q386":
        if (simbolo === "Z") {
          estadoActual = "Q387";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q390";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q387":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q388";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q388":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q389";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q389":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q393";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q390":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q391";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q391":
        if (simbolo !== "T") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "T") {
          estadoActual = "Q392";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q392":
        if (simbolo === "1" || simbolo === "0") {
          estadoActual = "Q393";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q393":
        if (simbolo === "1" || simbolo === "0" || simbolo === "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }

        if (simbolo === "R") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function sumaBC() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "SumaBC":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q394";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q394":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q403";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q395";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q405";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q395":
        if (simbolo === "0" || simbolo === "1") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q396";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q396":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q397";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q398";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q397":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q399";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q399":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Z") {
          estadoActual = "Q401";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaBC";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q401":
        if (simbolo === "T") {
          estadoActual = "SumaBC";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaBC";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q398":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q400";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q400":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Z") {
          estadoActual = "Q402";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q402";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q402":
        if (simbolo === "T") {
          estadoActual = "SumaBC";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaBC";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q403":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q404";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q404":
        if (simbolo === "R") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "S" ||
          simbolo === "B" ||
          simbolo === "C" ||
          simbolo === "T"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q405":
        if (simbolo === "0" || simbolo === "1") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q406";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q406":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q407";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q409";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q407":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q408";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q408":
        if (simbolo === "Z") {
          estadoActual = "SumaBC";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaBC";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q409":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q410";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q410":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Z") {
          estadoActual = "Q411";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaBC";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q411":
        if (simbolo === "T") {
          estadoActual = "SumaBC";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaBC";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function sumaAC() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "SumaAC":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q432";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q432":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q433";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q442";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q435";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q442":
        if (simbolo === "0" || simbolo === "1" || simbolo === "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q443";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q443":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q447";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q444";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q447":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q448";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q448":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Z") {
          estadoActual = "Q449";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAC";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q449":
        if (simbolo === "T") {
          estadoActual = "SumaAC";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAC";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q444":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q445";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q445":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Z") {
          estadoActual = "Q446";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q446";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q446":
        if (simbolo === "T") {
          estadoActual = "SumaAC";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAC";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q433":
        if (simbolo !== "A") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q434";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q434":
        if (simbolo === "R") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "S" ||
          simbolo === "B" ||
          simbolo === "C" ||
          simbolo === "T"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q435":
        if (simbolo === "0" || simbolo === "1" || simbolo === "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q436";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q436":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q437";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q439";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q437":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q438";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q438":
        if (simbolo === "Z") {
          estadoActual = "SumaAC";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAC";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q439":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q440";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q440":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Z") {
          estadoActual = "Q441";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAC";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q441":
        if (simbolo === "T") {
          estadoActual = "SumaAC";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAC";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function sumaAB() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "SumaAB":
        if (simbolo !== "T") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q412";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q412":
        if (simbolo === "0" || simbolo === "1") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q413";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q413":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q422";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q414";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q425";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q414":
        if (simbolo === "0" || simbolo === "1") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q415";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q415":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q416";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q417";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;

      case "Q416":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q418";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q418":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Z") {
          estadoActual = "Q419";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAB";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q419":
        if (simbolo === "T") {
          estadoActual = "SumaAB";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAB";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q417":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q420";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q420":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Z") {
          estadoActual = "Q421";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "Q421";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q421":
        if (simbolo === "T") {
          estadoActual = "SumaAB";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAB";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q422":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "A") {
          estadoActual = "Q423";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q423":
        if (simbolo === "R") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Z") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        if (
          simbolo === "0" ||
          simbolo === "1" ||
          simbolo === "S" ||
          simbolo === "B" ||
          simbolo === "C" ||
          simbolo === "T"
        ) {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "X") {
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "Y") {
          containerSimbolo.innerHTML = "1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q425":
        if (simbolo === "0" || simbolo === "1") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "B") {
          estadoActual = "Q426";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q426":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "Q427";
          containerSimbolo.innerHTML = "X";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q429";
          containerSimbolo.innerHTML = "Y";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q427":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q428";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      case "Q428":
        if (simbolo === "Z") {
          estadoActual = "SumaAB";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAB";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q429":
        if (simbolo !== "S") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "S") {
          estadoActual = "Q430";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q430":
        if (simbolo === "X" || simbolo === "Y") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "Z") {
          estadoActual = "Q431";
          containerSimbolo.innerHTML = "X";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAB";
          containerSimbolo.innerHTML = "Y";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q431":
        if (simbolo === "T") {
          estadoActual = "SumaAB";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0" || simbolo === "1") {
          estadoActual = "SumaAB";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;

      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function identificarSuma() {
  const salidas = ["SumaAB", "SumaAA", "SumaAC", "SumaBC", "SumaBB", "SumaCC"];

  while (!salidas.find((element) => element === estadoActual)) {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "Sumar":
        if (simbolo === "0") {
          estadoActual = "Q291";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q298";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q291":
        if (simbolo === "0") {
          estadoActual = "Q292";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q295";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q292":
        if (simbolo === "0") {
          estadoActual = "Q293";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q294";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q293":
        if (simbolo === "1") {
          containerSimbolo.innerHTML = "Z";
          estadoActual = "SumaAB";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "SumaAA";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q294":
        if (simbolo === "0") {
          estadoActual = "SumaAC";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q295":
        if (simbolo === "1") {
          estadoActual = "Q296";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q297";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q296":
        if (simbolo === "0") {
          estadoActual = "SumaBC";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q297":
        if (simbolo === "1") {
          estadoActual = "SumaBB";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "0") {
          estadoActual = "SumaAB";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q298":
        if (simbolo === "0") {
          estadoActual = "Q299";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q299":
        if (simbolo === "1") {
          estadoActual = "Q300";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "0") {
          estadoActual = "Q551";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q300":
        if (simbolo === "0") {
          estadoActual = "SumaCC";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q551":
        if (simbolo === "0") {
          estadoActual = "SumaAC";
          containerSimbolo.innerHTML = "R";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "SumaBC";
          containerSimbolo.innerHTML = "Z";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

async function repetir() {
  while (estadoActual !== "Q1") {
    await sleep(100);
    estado.innerHTML = estadoActual;
    let containerSimbolo = tapeElements[cabezal];
    let simbolo = tapeElements[cabezal].innerHTML;

    switch (estadoActual) {
      case "InicioRepetir":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q453";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q453":
        if (simbolo === "0") {
          estadoActual = "InicioRepetir";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q454";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q454":
        if (simbolo === "0") {
          estadoActual = "Q455";
          containerSimbolo.innerHTML = "F";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q455":
        if (simbolo !== "C") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q456";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q456":
        if (simbolo === "0") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "1") {
          estadoActual = "Q459";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "T") {
          estadoActual = "Q457";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q457":
        if (simbolo !== "F") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "F") {
          estadoActual = "Q1";
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q459":
        if (simbolo === "0" || simbolo === "1") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Sumar1111";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Sumar1111":
        if (simbolo === "0") {
          estadoActual = "Q460";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q469";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q460":
        if (simbolo === "0") {
          estadoActual = "Q463";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q461";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q461":
      case "Q464":
      case "Q469":
        if (simbolo === "0" || simbolo === "1") {
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "C") {
          estadoActual = "Q470";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q463":
        if (simbolo === "0") {
          estadoActual = "Q467";
          containerSimbolo.innerHTML = "1";
          cabezal--;
          colorearCasilla("L");
        }
        if (simbolo === "1") {
          estadoActual = "Q464";
          containerSimbolo.innerHTML = "0";
          cabezal--;
          colorearCasilla("L");
        }
        break;
      case "Q467":
        if (simbolo === "1") {
          containerSimbolo.innerHTML = "0";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "C") {
          estadoActual = "Q470";
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "B") {
          cabezal++;
          colorearCasilla("R");
        }
        break;
      case "Q470":
        if (simbolo !== "R") {
          cabezal++;
          colorearCasilla("R");
        }
        if (simbolo === "R") {
          estadoActual = "Q1";
          cabezal++;
          colorearCasilla("R");
        }
        break;
      default:
        estadoActual = "Reject";
        break;
    }
  }

  return estadoActual;
}

function colorearCasilla(side) {
  if (side === "R") {
    tapeElements[cabezal].classList.add("bgGreen");
    tapeElements[cabezal - 1].classList.remove("bgGreen");
  }

  if (side === "L") {
    tapeElements[cabezal].classList.add("bgGreen");
    tapeElements[cabezal + 1].classList.remove("bgGreen");
  }
}
