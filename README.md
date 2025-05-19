# PUBLIC TRANSPORT ETL


Projeto criado com a finalidade de aprendizado sobre processos de ETL

Possui pipeline de Extract Transform Load


Tecnologias usadas ->
 - Node.js 
 - Cron
 - Prisma



## Para rodar o projeto:

Instale as depedências com:
```bash
npm install
```
Crie uma pasta prisma e coloque dentro dela o arquivo schema.prisma com 
```markdown
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
  output   = "prisma/client"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model delay_per_line{
  id String @id @default(uuid())
  line String 
  time_of_delay Int
  date_processed DateTime @default(now())
}

model metrics_each_processing{
  id String @id @default(uuid())
  biggest_delay_processed Int
  total_average_delay Int
  date_processed DateTime @default(now())
}
```

Crie um env com a DATABASE_URL, rode npx prisma migrate dev e depois:

```bash
node --watch main.js
```

