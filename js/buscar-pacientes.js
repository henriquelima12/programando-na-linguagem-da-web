var botaoBuscar = document.querySelector("#buscar-pacientes");
botaoBuscar.addEventListener("click", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
    xhr.addEventListener("load", function () {
        var erro = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            erro.classList.add("invisivel");
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);
            pacientes.forEach(paciente => {
                adicionarPacienteNaTabela(paciente);
            });
        }else{
            erro.classList.remove("invisivel");
        }
    });
    xhr.send();
});