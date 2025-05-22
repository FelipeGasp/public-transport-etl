export default function delayCalculatorHandle(transformedData) {
  console.log("Calculating statistics...(at delayCalculatorHandle)");
  var delayTimePerLine = calculateDelayTimePerLine(transformedData);
  return delayTimePerLine;
}

function calculateDelayTimePerLine(transformedData) {
  console.log("Calculating delay time per line...");
  var delayPerLine = [];
  transformedData.forEach((row) => {
    let horaPrevista = row.hora_prevista;
    let horaReal = row.hora_real;
    let linha = row.linha;
    console.log("Calculating delay time for line: " + linha);
    let [horaPrevistaH, horaPrevistaM] = horaPrevista.split(":");
    let [horaRealH, horaRealM] = horaReal.split(":");
    let horaPrevistaOnlyH = parseInt(horaPrevistaH);
    let horaPrevistaOnlyM = parseInt(horaPrevistaM);
    let horaRealOnlyH = parseInt(horaRealH);
    let horaRealOnlyM = parseInt(horaRealM);
    let horaPrevistaInMinutes = horaPrevistaOnlyH * 60 + horaPrevistaOnlyM;
    let horaRealInMinutes = horaRealOnlyH * 60 + horaRealOnlyM;
    if (horaRealInMinutes >= horaPrevistaInMinutes) {
        let delayTime = horaRealInMinutes - horaPrevistaInMinutes;
        let existingLine = delayPerLine.find((row) => row.linha == linha);
        if (existingLine){
            existingLine.tempoAtraso += delayTime;
        }else{
            delayPerLine.push({
                linha: linha,
                tempoAtraso: delayTime
            });
        }
    }
  });
  console.log("Delay time per line calculated!");
  return delayPerLine;
}
