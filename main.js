import cron, { getTasks } from 'node-cron';
import  parseCsv  from './src/extract/parser.js';

var counter = 1;


var etlJob = cron.schedule('30 * * * *',()=>{
    console.log("Running cron job number: " + counter);
    counter++;
    mainHandler();
})

etlJob.start();

function mainHandler(){
     parseCsv()
}
