## 📄 `README.md` (Repositório do Front-end)

# 🖥️ Front-end: Interface de Gerenciamento

Este projeto contém a interface web (Front-end) para interagir com a **LaudosVeet**. Foi desenvolvido utilizando apenas **HTML, CSS** e **JavaScript** para demonstrar a comunicação assíncrona com o Back-end.


## 🚀 Como Executar

A execução desta parte do projeto é extremamente simples, pois não requer instalação de pacotes.

### 1. Pré-requisito

Para que o Front-end funcione corretamente, a **API (Back-end)** deve estar rodando em segundo plano.

**Certifique-se de que a API esteja ativa no endereço configurado (ex: `http://localhost:5000`).**

### 2. Inicialização

Basta fazer o download do projeto (ou clonar o repositório) e abrir o arquivo principal no seu navegador:

1.  Localize o arquivo **`index.html`**.
2.  Clique duas vezes nele ou abra-o diretamente no seu navegador de preferência (Chrome, Firefox, Edge).

### 3. Funcionalidades de Interface

O Front-end permite:

* **Cadastro de Tutores:** Formulário para adicionar novos tutores.
* **Cadastro de Pets:** Formulário que se popula com a lista de tutores (via API) para vincular o pet.
* **Listagem de Pets:** Tabela dinâmica que exibe todos os pets, incluindo *tooltip* com o telefone do tutor e botões de exclusão.
* **Listagem de Tutores:** Modal (`<dialog>`) para visualizar todos os tutores cadastrados.