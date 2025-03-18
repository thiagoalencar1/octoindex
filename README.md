# Octoindex

## Visão Geral
Bem-vindo ao Octoindex! Este aplicativo permite o cadastro de perfis do Github através de scraping de informações. Este README fornece uma visão geral da configuração, uso e comandos necessários para desenvolvimento e testes do projeto.

![octoindex](https://github.com/user-attachments/assets/1b89463c-1b1b-4127-94ff-0d63d50daeed)
<br />
*(aguarde enquanto o gif é carregado)*


## Descrição
Esse projeto faz uso de webscraping para obter informações de um perfil do GitHub a partir da URL ou nome de usuário. O recurso de webscraping foi desenvolvido usando a gem Faraday para fazer requisições HTTP e da gem Nokogiri para selecionar informações da página usando seletores css.
O projeto foi dividido em uma API backend escrita em Ruby on Rails e uma interface web em React.js. A escolha por proceder dessa forma foi feita para explorar melhor os conhecimentos nessas duas tecnologias.

## Features
- Cadastrar um perfil do Github, usando sua url ou nome de usuário (por exemplo: https://github.com/octocat ou simplesmente octocat).
- Usa recursos de webscrapping para obter informações do perfil informado.
- Ao adicionar um perfil, o mesmo é encurtado usando o tinyurl.
- Visualiza e editar perfis adicionados.
- Rescan os perfis cadastrados para atualizar informações.
- Pesquisa:
  - Pesquisa por perfis cadastrados. A pesquisa é feita por meio da barra de pesquisa na página inicial.
  - A pesquisa é feita simultaneamente pelos campos de nome, nome do usuário, organização e localização.
  - A página inicial exibe os perfis cadastrados e ao buscar.
- Um job é executado para resetar a base de dados a cada 24 horas. Remove toda a base e adiciona apenas alguns perfis de exemplo.

## Como executar este projeto (Docker)
### 1. Clone o repositório e dentro do diretório execute o comando:
```bash
docker compose build
```

### 2. Renomeie o .env.example para .env
```bash
mv .env.example .env
```

### 3. Inicie o projeto
```bash
make up
```
Após essa sequência, aplicação estará disponível no endereço http://localhost/.

### 4. Execute os testes
Em outro terminal digite:
```bash
make test
```
## Tecnologias
- Ruby on Rails 8
- Ruby 3.4
- ReactJS 18
- PostgreSQL 16
- Docker
- Redis
- Sidekiq
- TailwindCSS + daisyUI

## Arquitetura
- O projeto contem duas partes uma *API, em Ruby on Rails* e uma aplicação *frontend em ReactJS*.
- A API é responsável por gerenciar os perfis do github, fazendo *webscraping* no Github e armazenando os dados no banco de dados.
- A aplicação frontend é responsável por exibir os dados dos perfis e permitir a busca por perfis.
- Um job que é executado a cada 24 horas para resetar a base de dados e adicionar alguns perfis de exemplo.
- O job descrito acima é feito usando o *Sidekiq* e *Redis*.

### Decisões de Arquitetura
- Ruby on Rails: familiaridade com a linguagem e framework.
- ReactJS: me desafiei um pouco desenferrujando um pouco minhas habilidades com ReactJS.
- Docker: para facilitar o desenvolvimento e deploy.
- Sidekiq e Redis: Apenas para fins didáticos.
- TailwindCSS + daisyUI: o Tailwind já facilita o desenvolvimento e a utilização de uma biblioteca de componentes como o daisyUI deixa as coisas ainda mais simples.

## Lista de Melhorias
Uma lista de melhorias que podem ser feitas no projeto:
- Adicionar paginação para a lista de perfis. [front+back]
- Melhorar exibição das informações dos perfis com ícones. [front]
- Tornar a interface 100% mobile first. [front]
- Opção de ordenação de perfis (por nome, nome de usuário, organização e localização). [front]
- Adicionar testes para aplicação de front-end. [front]
- Internacionalização da aplicação. [front+back]
- Usar uma gem como Ransak para otimizar a busca. [back]
- Aprimoramento das configurações de containerização CI/CD. [SRE]
- O controller principal da API tem funções que poderiam ser dividido outros controllers ou services (como o search, por exemplo). [back, refactor]
- O model do perfil pode ser melhorado sendo dividido em outros models (como um model para cuidar de usuário e url e outro para os demais detalhes). [back, refactor]
- Conforme item anterior, a aplicação pode ser modularizada para lidar com outras fontes de dados como Twitter, por exemplo. [back]
- O sistema de encurtamento de urls também pode ser melhorado permitindo que o usuário escolha o encurtador que deseja usar. [back]

## Acesso ao APP
[Experimente a aplicação aqui](http://3.145.73.162/)

## Contato
Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:
- **Nome:** Thiago Alencar
- **Github:** [thiagoalencar1](https://github.com/thiagoalencar1)
- **Linkedin:** [linkedin.com/in/thiagoalencar1](https://www.linkedin.com/in/thiagoalencar1)
