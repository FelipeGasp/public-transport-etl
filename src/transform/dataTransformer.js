import metricsHandler from "./metrics.js";

function dataTransformer(viagem){
    console.log("Transforming data...");
    var transformedData = [];
    viagem.forEach(row => {
        transformedData.push({
            linha: row[0],
            ponto_partida: row[1],
            ponto_chegada: row[2],
            hora_prevista: row[3],
            hora_real: row[4],
            data_viagem: row[5],
        })
    });
    
    var transformedDataByNewestDate = rankByNewestDate(transformedData);
    transformedData = transformedDataByNewestDate;

    var transformedDataWithDateInfo = transformStringtoDateLocaleString(transformedData);
    transformedData = transformedDataWithDateInfo;
    console.log("Ended transforming data, total rows: ", transformedData.length);
    console.log("Starting calculation of statistics...");
    metricsHandler(transformedData);
}

function transformStringtoDateLocaleString(viagemTransformed){
    console.log("Transforming string to date BR locale string...")
    viagemTransformed.forEach(row => {
        row.data_viagem = new Date(row.data_viagem).toLocaleDateString('pt-BR');  
    });
    return viagemTransformed;
}

function rankByNewestDate(viagemTransformed){  
    console.log("Ranking data by newest date...")
    viagemTransformed.sort((a,b) =>{
        const dateOriginalA = a.data_viagem
        const dateOriginalB = b.data_viagem
        var [dia, mes, ano] = dateOriginalA.split("/");
        var [diaB, mesB, anoB] = dateOriginalB.split("/");
        const dateStringA = `${ano}-${mes}-${dia}`;
        const dateStringB = `${anoB}-${mesB}-${diaB}`;
        const dateA = new Date(dateStringA);
        const dateB = new Date(dateStringB);
        return dateB - dateA;
    })
    return viagemTransformed;
}

export default dataTransformer;