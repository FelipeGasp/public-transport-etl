import fs from 'fs';
import {parse} from 'csv-parse';
import dataTransformer from '../transform/dataTransformer.js';

async function parseCsv(){
    const data = [];
    const header = 1;
    let rowCount = 0
    console.log("Parsing CSV file...");
    await fs.createReadStream('src/data/data.csv')
    .pipe(parse({ delimiter:';'}))
    .on('data', (row)=>{
        rowCount++;
        if(rowCount === 1){
            console.log('Header: ' + row);
        }else{
            if(rowCount < 10 && rowCount > 1){
                console.log(row);
            }
            data.push(row);
        }
    })
    .on('end',()=>{
        console.log('Ended csv parsing, total rows: ' + (rowCount-header));
        console.log("Passing -----> 'transformer' ")
        dataTransformer(data)
    })
}


export default parseCsv;