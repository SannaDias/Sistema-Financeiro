# 📊 Sistema de Controle de Gastos Residenciais

Este repositório contém a implementação de um sistema de controle de gastos residenciais, desenvolvido com foco em boas práticas, clareza de código e aderência às regras de negócio propostas.

O sistema permite o gerenciamento de pessoas, categorias e transações financeiras, além da geração de relatórios consolidados.

## 🧱 Arquitetura da Solução

A solução foi estruturada seguindo a separação de responsabilidades entre Back-end e Front-end:

Back-end (Web API)
Responsável pelas regras de negócio, persistência de dados e exposição de endpoints REST.

Front-end (Aplicação Web)
Responsável pela interface do usuário, validações básicas e consumo da API.

A comunicação entre as camadas ocorre via HTTP (REST API).

## 🛠️ Tecnologias Utilizadas
- Back-end

C#

.NET Web API

Persistência de dados (com manutenção dos dados após reinicialização)

Padrão REST

- Front-end

React

TypeScript

React Router DOM

Fetch API

CSS puro (sem frameworks externos)

## ⚙️ Funcionalidades Implementadas
### 👤 Cadastro de Pessoas

Criação de pessoas

Listagem de pessoas

Exclusão de pessoas

Exclusão em cascata: ao excluir uma pessoa, todas as suas transações são removidas

Campos:

Identificador (gerado automaticamente)

Nome

Idade

### 🗂️ Cadastro de Categorias

Criação de categorias

Listagem de categorias

Campos:

Identificador (gerado automaticamente)

Descrição

Finalidade:

Receita

Despesa

Ambas

### 💰 Cadastro de Transações

Criação de transações

Listagem de transações

Exclusão de transações

Campos:

Identificador (gerado automaticamente)

Descrição

Valor (decimal positivo)

Tipo (Receita ou Despesa)

Categoria

Pessoa vinculada

### 🧠 Regras de Negócio

As seguintes regras de negócio foram implementadas conforme especificação:

Pessoas menores de 18 anos podem registrar apenas transações do tipo despesa

A categoria selecionada deve ser compatível com o tipo da transação:

Transações do tipo Receita não aceitam categorias com finalidade Despesa

Transações do tipo Despesa não aceitam categorias com finalidade Receita

Campos obrigatórios são validados antes do envio

O usuário recebe feedback visual em operações de sucesso ou erro

### 📊 Relatórios
Totais por Pessoa

Lista todas as pessoas cadastradas

Exibe para cada pessoa:

Total de receitas

Total de despesas

Saldo (receitas − despesas)

Exibe ao final:

Total geral de receitas

Total geral de despesas

Saldo geral consolidado

### 🧭 Navegação da Aplicação

A aplicação é organizada em páginas distintas, acessíveis por um menu fixo:

Pessoas

Categorias

Transações

Relatório por Pessoa

O menu permanece visível em todas as páginas, garantindo melhor experiência de navegação.

### ▶️ Como Executar o Projeto
🔹 Back-end

Abrir o projeto no Visual Studio

Restaurar as dependências

Executar a aplicação

A API será iniciada em uma porta local (ex: http://localhost:5000)

🔹 Front-end

Acessar a pasta do front-end

Instalar as dependências:

npm install


Executar a aplicação:

npm run dev


Acessar no navegador:

http://localhost:5173


👨‍💻 Autor:  Sanna Dias
