var buttonAdd = document.querySelector("#adicionar-paciente");
buttonAdd.addEventListener("click", function(event){
    event.preventDefault()

    var formulario = document.querySelector("#form-adiciona");

    var paciente = getValueForm(formulario);

    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        exibeErros(erros);
        return;
    }

    adicionarPacienteNaTabela(paciente);

    formulario.reset();

    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";
});

function adicionarPacienteNaTabela(paciente){
    var pacienteTR = montaTr(paciente);
    var table = document.querySelector("#tabela-pacientes");
    table.appendChild(pacienteTR);
}

function getValueForm(formulario){
    var paciente = {
        nome: formulario.nome.value,
        peso: formulario.peso.value,
        altura: formulario.altura.value,
        gordura: formulario.gordura.value,
        imc: calculaIMC(formulario.peso.value, formulario.altura.value)
    } 

    return paciente;
}

function montaTr(paciente){
    var novoPaciente = document.createElement("tr");
    novoPaciente.classList.add("paciente");

    novoPaciente.appendChild(montaTd(paciente.nome, "info-nome"));
    novoPaciente.appendChild(montaTd(paciente.peso, "info-peso"));
    novoPaciente.appendChild(montaTd(paciente.altura, "info-altura"));
    novoPaciente.appendChild(montaTd(paciente.gordura, "info-gordura"));
    novoPaciente.appendChild(montaTd(paciente.imc, "info-imc"));
    
    return novoPaciente;
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {
    var erros = [];

    if(paciente.nome.length == 0) erros.push("O nome não pode ser vazio");

    if(paciente.peso.length == 0) erros.push("O peso não pode ser vazio");

    if(paciente.altura.length == 0) erros.push("A altura não pode ser vazia");

    if(paciente.gordura.length == 0) erros.push("A gordura não pode ser vazia");

    if (!validaPeso(paciente.peso)) erros.push("Peso inválido");

    if (!validaAltura(paciente.altura)) erros.push("Altura inválida");
    
    return erros;
}

function exibeErros(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li)
    });
}