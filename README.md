#  **API E-commerce D`BRAS**

API E-commerce D`BRAS é uma API RESTful desenvolvida com NestJS que implementa funcionalidades essenciais de um e-commerce, incluindo autenticação JWT, gestão de produtos, categorias, usuários e um sistema de carrinho de compras.


---


#  **Arquitetura**

## 🚀 Tecnologias Utilizadas

- **Ambiente de Nuvem da plataforma Railway**
- **Banco de dados PostgreSQL 15.12**
- **Linguagens Node.js e Typescript**
- **Docker (opcional, para rodar o banco de dados)**
- **Protocolo REST sobre HTTPS**
- **Postman v11.36.3, para testes de API**


## 🚀 Frameworks

- **Nest 10.1.11, para back end**
- **Class-validator 0.14.1, para validação de dados**
- **Class-transformer 0.5.1**
- **Swagger 7.4.2, para documentação da API**
- **nestjs/jwt 11.0.0, para segurança**
- **Prisma ORM 6.4.1, para persistência de dados**
- **Jest 29.5.0, para testes unitários** 


---


#  **Estrutura do projeto**

O projeto está estruturado conforme representado abaixo:

```
src
    |_ modules
        |_ configs
            |_ database
            |_ filters
                |_ exceptions
            |_ interceptors
                |_ logs
                |_ responses
            |_ security
                |_ bycript
                |_ jwt
            |_ message.ts

        |_ usecases
            |_ auth
            |_ carts
            |_ categories
            |_ orders
            |_ products
            |_ users

        tests
            |_ unitary
            |_ functional
```


## Pacote usecases

O pacote "usecases" contém os casos de uso da aplicação, ou seja, o código que corresponde os serviços que atendem por domínios específicos do negócio:

- auth: Código que trata da autenticação dos usuários do e-commerce;
- carts: Código que trata dos carrinhos de compra dos usuários;
- categories: Código que trata das categorias de produtos;
- orders: Código que trata das compras realizadas pelos usuários;
- products: Código que trata dos produtos comercializados no e-commerce;
- users: Código que trata dos usuários do e-commerce.


## Pacote configs

O pacote "configs" contém todo código comum ao projeto, sendo compartilhado entre todos os casos de uso, tal como código de infraestrutura e segurança:

- database: Código que trata da conexão com o banco de dados em todas as operações da aplicação;
- filters: Código de todos os filters utilizados na aplicação;
- interceptor: Código de todos os interceptors utilizados na aplicação;
- security: Código de todos os mecanismos de segurança da aplicação;
- message.ts: Arquivo com mensagens de retorno padrão da aplicação.


## Pacote tests

- unitary: Testes unitários da aplicação.
- functional: Testes funcionais da aplicação, que podem ser acionados a partir do Postman.

Detalhes mais adiante sobre testes.


---


# **Filters e Interceptors**

A aplicação utiliza alguns patterns para realizar tratamentos padronizados e facilitar a manutenção do código, conforme abaixo:

- Filter para Exceptions: Este filter captura e trata de forma adequada e padronizada todas as exceptions lançadas durante a execução do código, tanto provenientes de regras de negócio quanto erros não tratados. O objetivo é garantir o log padronizado de todas as exceptions e também um retorno padrão para o usuário da aplicação.

- Interceptors de Requests e Responses: Captura o fluxo de execução, garantido tratamento padronizado do request/response e permitindo fazer log detalhado. Essa técnica é muito útil para troubleshooting, permitindo a coleta de informação para desvendar erros e bugs mais complexos. O log detalhado pode ser ligado e desligado de acordo com o nível (debug, info, etc.). Permite ainda criar mecanismos de segurança, tais como impedir SQL injection (porém, não foi implementado).


---


# **Design Patterns**


- **DTO:** O Data Transient Object é um pattern utilizado para transportar os dados dados entre as camadas da aplicação e, nesta aplicação, é usado também para comportar as annotations de validação de dados na entrada (input);
  
- **Presenter:** Pattern utilizado para transporte de dados na camada mais externa da aplicação que levará os dados até o requisitante. Ou seja, é o pattern para transporte de dados na resposta (output).
 
- **Service:** Representa um serviço interno desta aplicação e serve para fazer o isolamento entre camadas.
 
- **Controller:** Pattern utilizado nesta aplicação para receber as requisições (input) e interagir com as camadas internas da aplicação a fim de gerar o resultado e enviar uma resposta ao requisitante.

- **Repository:** Patters utilizado para fazer o trabalho de persistência de dados, interagindo com a camada de banco de dados.


---


# Instalação e Configuração  

##  **Pré-requisitos**

Antes de iniciar, certifique-se de ter instalado:
- [Node](https://nodejs.org/pt)
- [Nest JS](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (Opcional)


## **Ambientes de Desenvolvimento**

### 📥 **Clonando o repositório**
```sh
git clone https://github.com/maxwelllbarboza/api_ecommerce-desafio.git
```

### 📥 **Entrando no diretório**
```sh
cd api_ecommerce-desafio
```

### 📥 **Rodar Docker Compose**
```sh
docker-compose up -d
```

### Executa o script para instalar o projeto
```bash
Set-ExecutionPolicy Unrestricted -Scope Process
.\setup.ps1
```

---

# **Documentação da API**

A documentação da API foi construída por meio do framework Swagger, muito utilizado pelo mercado para esta finalidade. Ele permite não só conhecer as especificações técnicas e funcionais da API, mas também executar testes online de forma interativa. Acesse a documentação completa por este [link.](https://api-ecommerce-desafio-tecnico-production.up.railway.app/docs)




---


# **Testes Unitários**

Na nossa aplicação, utilizamos o Jest para escrever e executar testes unitários. O Jest é uma ferramenta poderosa e fácil de usar que integra bem com o NestJS, permitindo testar as funcionalidades de cada componente de maneira isolada.



# **Testes de API**

Para uma experiência interativa e fácil de testar os endpoints, você pode importar a Postman Collection. A collection contém todos os endpoints documentados, com exemplos de requisição e resposta. Basta importar a collection para sua instância do Postman e utilizar os exemplos de JSON para testar as requisições diretamente na ferramenta.

[Collection Postman](https://github.com/maxwelllbarboza/api-ecommerce-desafio-tecnico/blob/main/test/functional)


---


## 📝 **Licença**
Este projeto está sob a licença **MIT**.

---

👨‍💻 **Desenvolvido por [Maxwell R Barboza](https://github.com/maxwelllbarboza)**