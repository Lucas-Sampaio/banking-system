<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


### 🛠 Objetivo

O objetivo consiste na criação de uma carteira financeira em que os usuários possam realizar 
transferência de saldo.

#### Fluxo do projeto
![Alt text](/Assets/diagramaProjeto.png?raw=true "Fluxo")

#### Swagger Endpoints
![image](https://github.com/user-attachments/assets/fab3ddcc-eb23-44c5-be16-a9b72c44bb11)

### 🛠 Como usar
 1. Tenha o docker instalado e baixe o projeto
 2. Execute o comando no powershell na pasta raiz do projeto -> ```docker compose up --build -d```
 isso irá subir os serviços necessario pro projeto api e banco de dados e criar as tabelas.
 4. O projeto gera a documentação da api automatica pelo swagger e pode ser acessado pelo url http://localhost:3000/api

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [.Node 23.10.0](https://nodejs.org/pt)
- [Prisma ORM](https://www.prisma.io/docs)
- [Nest JS](https://nestjs.com/)
- [Postgres](https://www.postgresql.org/download/)
- [Autenticacao JWT]
- [dto validations(https://docs.nestjs.com/techniques/validation)]

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
