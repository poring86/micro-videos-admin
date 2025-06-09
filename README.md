# Micro Videos Admin

Sistema de administração do catálogo de vídeos da aplicação **Micro Videos**, desenvolvido com foco em arquitetura escalável, testes e mensageria assíncrona.

## 🧱 Arquitetura

Este projeto adota os princípios de:

- **Domain-Driven Design (DDD)**: separação clara entre camadas de domínio, aplicação e infraestrutura.
- **Clean Architecture**: desacoplamento das regras de negócio de frameworks, banco de dados e interfaces externas.
- **Camadas bem definidas**:
  - `domain`: entidades e regras de negócio puras
  - `application`: casos de uso (application services)
  - `infra`: repositórios, controllers, filas e banco de dados

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** (ou outro framework HTTP leve)
- **RabbitMQ**: mensageria assíncrona entre serviços
- **Docker & Docker Compose**
- **PostgreSQL** (ou MySQL)
- **Jest** + **Supertest**: testes automatizados (unitários e de integração)
- **ESLint** + **Prettier**: padronização de código
- **CI/CD-ready**: estrutura preparada para integração contínua
- **DTOs**, validações e testes com alto grau de cobertura

## 📂 Estrutura do projeto (resumida)

## 📦 Funcionalidades

- CRUD de vídeos e categorias
- Upload e gestão de arquivos de vídeo
- Publicação de eventos via RabbitMQ
- Integração com microsserviços consumidores
- Camada de domínio isolada e testável

## 🧪 Testes

- Testes de unidade para regras de negócio
- Testes de integração com repositórios e filas
- Cobertura automatizada com `jest --coverage`

## 🛠️ Como rodar

```bash
git clone https://github.com/poring86/micro-videos-admin.git
cd micro-videos-admin

# Instale dependências
npm install

# Suba containers (db, rabbitmq, etc.)
docker-compose up -d

# Execute os testes
npm test

# Inicie a aplicação
npm run dev
```
