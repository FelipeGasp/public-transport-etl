import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

export default async function loadDataIntoDb(biggestDelayTime, totalAverageDelayTime, delayPerLine){
    console.log("Saving metrics into the database...");

    await prisma.metrics_each_processing.create({
        data:{
            biggest_delay_processed: biggestDelayTime.tempoAtraso,
            total_average_delay: totalAverageDelayTime
        }
    })
    
    for (const data of delayPerLine) {
        await prisma.delay_per_line.create({
            data: {
                line: data.linha,
                time_of_delay: data.tempoAtraso,
            }
        })
    }
    console.log("Metrics saved sucessfully in the database");
}