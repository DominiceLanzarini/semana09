# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command



Resuminho pra não se perder:

1. TypeORM é uma biblioteca (lib) e não um framework. Ele é um ORM (Object-Relational Mapper) para TypeScript e JavaScript, usado para interagir com bancos de dados de forma orientada a objetos.

Características do TypeORM:
✅ Suporte a Active Record e Data Mapper
✅ Funciona com MySQL, PostgreSQL, SQLite, MariaDB, SQL Server, MongoDB, entre outros
✅ Suporte a migrações e relações entre entidades
✅ Integração com decorators do TypeScript (@Entity(), @Column(), @PrimaryGeneratedColumn(), etc.)
✅ Muito usado em frameworks como NestJS, mas pode ser usado em qualquer projeto Node.js


2. reflect-metadata é um pacote do TypeScript que adiciona suporte a metadados de reflexão em tempo de execução. Ele é frequentemente usado em conjunto com decorators para fornecer informações adicionais sobre classes, métodos, propriedades e parâmetros. Recurso do TS.


3. express() é uma função do Express.js, um framework minimalista para Node.js usado para construir aplicações web e APIs. A função express() inicializa o servidor e permite configurar rotas e middlewares.


4. cors() é uma função do middleware CORS da biblioteca cors usada no Express.js para permitir ou restringir requisições entre origens diferentes (Cross-Origin Resource Sharing - CORS).
Quando usar cors()?
✅ Se sua API será acessada por um frontend em um domínio diferente
✅ Se precisa restringir ou liberar acessos específicos
✅ Se quer evitar erros de bloqueio de CORS no navegador

5. process.env => process é o processo do sistema operacional que roda a app (gerenciador de tarefas - processos), o env é .env