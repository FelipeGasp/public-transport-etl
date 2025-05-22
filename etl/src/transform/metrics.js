import loadDataIntoDb from "../load/loader.js";
import delayCalculatorHandle from "./delayCalculator.js";

export default function metricsHandler(transformedData){
    console.log("Calculating statistics...(at metricsHandler)");
    var totalAverageDelayTime = calculateAverageDelayTime(transformedData);
    console.log("Total average delay time: " + totalAverageDelayTime);
    var biggestDelayTime = calculateBiggestDelayTime(transformedData);
    var delayPerLine = delayCalculatorHandle(transformedData);
    loadDataIntoDb(biggestDelayTime, totalAverageDelayTime, delayPerLine);
}

        


function calculateBiggestDelayTime(transformedData){
    console.log("Calculating biggest delay time...")
    var biggestDelayTime = 0;
    for (let index = 0; index < transformedData.length; index++) {
        let row = transformedData[index];
        var horaPrevista = row.hora_prevista;
        var horaReal = row.hora_real;
        var [horaPrevistaH, horaPrevistaM] = horaPrevista.split(":");
        var [horaRealH, horaRealM] = horaReal.split(":");
        var horaPrevistaOnlyH = parseInt(horaPrevistaH);
        var horaPrevistaOnlyM = parseInt(horaPrevistaM);
        var horaRealOnlyH = parseInt(horaRealH);
        var horaRealOnlyM = parseInt(horaRealM);
        var horaPrevistaInMinutes = (horaPrevistaOnlyH * 60) + horaPrevistaOnlyM;
        var horaRealInMinutes = (horaRealOnlyH * 60) + horaRealOnlyM;
        if(horaPrevistaInMinutes < horaRealInMinutes){
            var delayTime = horaRealInMinutes - horaPrevistaInMinutes;
            if(delayTime > biggestDelayTime){
                biggestDelayTime = 
                {
                 "tempoAtraso" : delayTime, 
                 "linha": row.linha, 
                 "dataViagem" :row.data_viagem
                };
            }
        }
    }
    console.log("The biggest delay was: " +biggestDelayTime.tempoAtraso + " minutes");
    console.log("On the line: " + biggestDelayTime.linha);
    console.log("On the date: " + biggestDelayTime.dataViagem);
    return biggestDelayTime;
}


function calculateAverageDelayTime(transformedData){
    console.log("Calculating average delay time...")
    var totalDelayTimeInMinutes = 0;
    transformedData.forEach(row => {
        let horaPrevista = row.hora_prevista;
        let horaReal = row.hora_real;
        let [horaPrevistaH, horaPrevistaM] = horaPrevista.split(":");
        let [horaRealH, horaRealM] = horaReal.split(":");
        let horaPrevistaOnlyH = parseInt(horaPrevistaH);
        let horaPrevistaOnlyM = parseInt(horaPrevistaM);
        let horaRealOnlyH = parseInt(horaRealH);
        let horaRealOnlyM = parseInt(horaRealM);
        let horaPrevistaInMinutes = (horaPrevistaOnlyH * 60) + horaPrevistaOnlyM;
        let horaRealInMinutes = (horaRealOnlyH * 60) + horaRealOnlyM;

        if(horaPrevistaInMinutes < horaRealInMinutes){
            let delayTime = horaRealInMinutes - horaPrevistaInMinutes;
            totalDelayTimeInMinutes += delayTime;
        }
    });
    console.log("Total delay time in minutes: " + totalDelayTimeInMinutes);

    var averageDelayTime = totalDelayTimeInMinutes / transformedData.length;
    console.log("Average delay time in minutes: " + averageDelayTime);
    return averageDelayTime;
}