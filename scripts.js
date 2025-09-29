/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de tutores do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
function popularTutoresNoSelect() {
  const selectTutor = document.getElementById('petTutorSelect');
  selectTutor.innerHTML = '<option value="">Lista de tutores cadastrados</option>';

  fetch('http://localhost:5000/tutores')
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(alert("Erro ao carregar lista de tutores."));
        });
      }
      return response.json();
    })
    .then(data => {
      const tutores = data.tutores || [];

      if (tutores.length === 0) {
        console.warn('Nenhum tutor encontrado.');
        return;
      }

      tutores.forEach(tutor => {
        const option = document.createElement('option');
        option.value = tutor.id;
        option.textContent = tutor.nome;
        selectTutor.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Falha ao carregar a lista de tutores:', error.message);
      const errorOption = document.createElement('option');
      errorOption.textContent = `ERRO: ${error.message}`;
      errorOption.value = "";
      errorOption.disabled = true;
      selectTutor.appendChild(errorOption);
    });
}



/*
  --------------------------------------------------------------------------------------
  Função para exibir a listagem de pets cadastrados
  --------------------------------------------------------------------------------------
*/
function exibirPetsNaTabela() {
  const tabelaBody = document.getElementById('listaPetsBody');

  tabelaBody.innerHTML = '<tr><td colspan="5">Carregando...</td></tr>';

  fetch('http://localhost:5000/pets')
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(alert("Erro ao carregar a tabela de pets."));
        });
      }
      return response.json();
    })
    .then(data => {
      const pets = data.pets || [];
      tabelaBody.innerHTML = '';

      if (pets.length === 0) {
        tabelaBody.innerHTML = '<tr><td colspan="5">Nenhum pet cadastrado.</td></tr>';
        return;
      }

      pets.forEach(pet => {
        const row = tabelaBody.insertRow();

        row.insertCell().textContent = pet.nome;
        row.insertCell().textContent = pet.especie;
        row.insertCell().textContent = pet.raca;

        const tutorCell = row.insertCell();
        tutorCell.textContent = pet.tutor_nome;
        const telefoneTexto = `Telefone: ${pet.tutor_telefone}`;
        tutorCell.setAttribute('title', telefoneTexto);

        const acoesCell = row.insertCell();
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remover';

        deleteBtn.onclick = () => deletarPet(pet.id);

        acoesCell.appendChild(deleteBtn);
      });
    })
    .catch(error => {
      console.error('Falha na busca de pets:', error.message);
      tabelaBody.innerHTML = `<tr><td colspan="5" style="color: red;">Erro ao carregar a tabela de pets: ${error.message}</td></tr>`;
    });
}


/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
window.onload = exibirPetsNaTabela;
popularTutoresNoSelect();

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um tutor via requisição POST
  --------------------------------------------------------------------------------------
*/
function cadastrarNovoTutor() {
  const inputNome = document.getElementById('tutorNomeInput').value;
  const inputTelefone = document.getElementById('tutorTelefoneInput').value;

  if (!inputNome || !inputTelefone) {
    alert("Preencha todos os campos.");
    return;
  }

  const tutorPayload = {
    nome: inputNome,
    telefone: inputTelefone
  };

  fetch('http://localhost:5000/tutor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tutorPayload)
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(alert("Erro ao cadastrar tutor."));
        });
      }
      return response.json();
    })
    .then(data => {
      alert(`Tutor ${data.nome} cadastrado com sucesso!`);

      document.getElementById('tutorNomeInput').value = '';
      document.getElementById('tutorTelefoneInput').value = '';

      popularTutoresNoSelect();
    })
    .catch(error => {
      console.error('Erro ao cadastrar tutor:', error);
      alert(`Falha no cadastro: ${error.message}`);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um pet via requisição POST
  --------------------------------------------------------------------------------------
*/
function cadastrarNovoPet() {
  const nome = document.getElementById('petNomeInput').value;
  const especie = document.getElementById('petEspecieSelect').value;
  const raca = document.getElementById('petRacaInput').value;
  const tutor_id = document.getElementById('petTutorSelect').value;

  if (!nome || !especie || !tutor_id) {
    alert("Por favor, preencha o nome, a espécie e selecione um tutor.");
    return;
  }

  const petData = {
    nome: nome,
    especie: especie,
    raca: raca,
    tutor_id: parseInt(tutor_id)
  };

  fetch('http://localhost:5000/pet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(petData)
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(alert("Erro ao cadastrar o pet."));
        });
      }
      return response.json();
    })
    .then(data => {
      alert(`Pet '${data.nome}' cadastrado com sucesso!`);

      document.getElementById('petNomeInput').value = '';
      document.getElementById('petEspecieSelect').value = '';
      document.getElementById('petRacaInput').value = '';

      exibirPetsNaTabela();
    })
    .catch(error => {
      console.error('Erro ao cadastrar pet:', error);
      alert(`Falha no cadastro: ${error.message}`);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/

/**
 * @param {number} petId - O ID do pet a ser removido.
 */
function deletarPet(petId) {
  fetch(`${'http://localhost:5000/pet'}?id=${petId}`, {
    method: 'DELETE'
  })
    .then(data => {
      alert('Pet removido da tabela.');
      exibirPetsNaTabela();
    })
    .catch(error => {
      alert('Falha na exclusão do pet.');
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para trazer a listagem de tutores no modal
  --------------------------------------------------------------------------------------
*/
function preencherTabelaTutores() {
  const tabelaBody = document.getElementById('listaTutoresBody');
  tabelaBody.innerHTML = '<tr><td colspan="4">Carregando tutores...</td></tr>';

  fetch('http://localhost:5000/tutores')
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.mesage || `Erro ao listar tutores: Status ${response.status}`);
        });
      }
      return response.json();
    })
    .then(data => {
      const tutores = data.tutores || [];
      tabelaBody.innerHTML = '';

      if (tutores.length === 0) {
        tabelaBody.innerHTML = '<tr><td colspan="4">Nenhum tutor encontrado.</td></tr>';
        return;
      }

      tutores.forEach(tutor => {
        const row = tabelaBody.insertRow();
        row.insertCell().textContent = tutor.id;
        row.insertCell().textContent = tutor.nome;
        row.insertCell().textContent = tutor.telefone;
        row.insertCell().textContent = tutor.total_pets;
      });
    })
    .catch(error => {
      console.error('Falha ao carregar tutores:', error.message);
      tabelaBody.innerHTML = `<tr><td colspan="4" style="color: red;">Erro: ${error.message}</td></tr>`;
    });
}

function abrirListagemTutores() {
  const modal = document.getElementById('modalListagemTutores');

  preencherTabelaTutores();
  modal.showModal();
}