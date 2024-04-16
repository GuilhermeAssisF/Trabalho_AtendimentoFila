// Crie uma instância da fila
let minhaFila = new FilaCircular(5);

// Função para adicionar um elemento à fila
function adicionarElemento() {
  // Obter nome e CPF do formulário
  let nome = document.getElementById("txtnovoNome").value; // Aqui é onde estamos tentando obter o valor do nome
  let cpf = document.getElementById("txtnovoCpf").value;

  // Gerar data atual
  let data = obterDataAtual();

  // Gerar hora atual
  let hora = obterHoraAtual();

  // Criar uma instância da classe Atendimento com os dados obtidos
  let novoAtendimento = new Atendimento(nome, cpf, data, hora);

  // Adicionar o novo atendimento à fila
  if (minhaFila.enqueue(novoAtendimento)) {
      // Atualizar a exibição da fila
      atualizarFila();

      // Limpar campos do formulário
      document.getElementById("txtnovoNome").value = "";
      document.getElementById("txtnovoCpf").value = "";
  } else {
      console.log("A fila está cheia. Não é possível adicionar mais pessoas.");
  }
}
//--------------------------------------------------------------------------------------------
// Função para remover o primeiro elemento da fila
function removerElemento() {
  // Verificar se a fila não está vazia
  if (!minhaFila.isEmpty()) {
    // Remover o primeiro elemento da fila
    let pessoaAtendida = minhaFila.dequeue();

    // Obter a hora de saída
    let horaSaida = obterHoraAtual();

    // Calcular o tempo que a pessoa passou na fila
    let tempoFila = calcularDiferencaHoras(pessoaAtendida.hora, horaSaida);

    // Exibir mensagem de remoção com os detalhes do atendimento
    mostrarMensagemRemocao(pessoaAtendida, horaSaida, tempoFila);

    // Atualizar a exibição da fila
    atualizarFila();
  } else {
    console.log("A fila está vazia. Não há pessoas para atender.");
  }
}
//--------------------------------------------------------------------------------
function buscarCpf() {
  let cpfBusca = document.getElementById("txtnovoCpf").value;

    // Percorrer a fila e verificar se o CPF corresponde a algum atendimento
    let atendimentoEncontrado = null;
    for (const atendimento of minhaFila) {
        if (atendimento.cpf === cpfBusca) {
            atendimentoEncontrado = atendimento;
            break;
        }
    }

    // Exibir mensagem de resultado da busca
    if (atendimentoEncontrado) {
        let mensagem = `Atendimento encontrado para o CPF ${cpfBusca}:<br/>`;
        mensagem += `Nome: ${atendimentoEncontrado.nome}<br/>`;
        mensagem += `Data: ${atendimentoEncontrado.data}<br/>`;
        mensagem += `Hora: ${atendimentoEncontrado.hora}<br/>`;
        document.getElementById("mensagem-remocao").innerHTML = mensagem;
    } else {
        document.getElementById("mensagem-remocao").innerHTML = `Não foi encontrado nenhum atendimento para o CPF ${cpfBusca}.`;
    }
}
//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(pessoaAtendida, horaSaida, tempoFila) {
  let mensagem = `Atendimento para ${pessoaAtendida.nome} foi concluído.<br/>`;
  mensagem += `Hora de entrada: ${pessoaAtendida.hora}<br/>`;
  mensagem += `Hora de saída: ${horaSaida}<br/>`;
  mensagem += `Tempo na fila: ${tempoFila}`;
  
  document.getElementById("mensagem-remocao").innerHTML = mensagem;
} 
//--------------------------------------------------------------------------------------------
// Função para atualizar a exibição da fila
function atualizarFila() {
  let listaFila = document.getElementById("listFila");
    listaFila.innerHTML = ""; // Limpar a lista antes de atualizá-la

    // Percorrer a fila e adicionar cada elemento à lista
    for (const atendimento of minhaFila) {
        let itemLista = document.createElement("li");
        itemLista.textContent = `${atendimento.nome} - ${atendimento.data} - ${atendimento.hora}`;
        listaFila.appendChild(itemLista);
    }

    // Atualizar mensagem de status da fila
    let mensagemStatus = minhaFila.isEmpty() ? "Fila vazia!" : "Pessoas na fila:";
    document.getElementById("lblPessoasFila").textContent = mensagemStatus;
}
//--------------------------------------------------------------------------------------------
// funcao data
function obterDataAtual() {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
  let ano = dataAtual.getFullYear();
  // Formata a data como "dd/mm/aaaa"
  let dataFormatada = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${ano}`;
  return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, "0");
  const minuto = data.getMinutes().toString().padStart(2, "0");
  const segundo = data.getSeconds().toString().padStart(2, "0");
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(":").map(Number);
  const [h2, m2, s2] = hora2.split(":").map(Number);

  const diferencaSegundos =
    h2 * 3600 + m2 * 60 + s2 - (h1 * 3600 + m1 * 60 + s1);

  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
}
