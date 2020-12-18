
function exibiraagentes(){
    fetch("http:localhost:8080/agentesordenados")
    .then(res => res.json())
    .then(res => preenchercombo(res))
    

    var usuariostr = localStorage.getItem("userlogado");

    if(usuariostr==null){
        window.location="login.html";
    }
    else{
        var usuariojson = JSON.parse(usuariostr);
        document.getElementById("dados").innerHTML =
        "Seja bem vindo, <b>" + usuariojson.nome + "!<br>";
        
        document.getElementById("foto").innerHTML= 
        "<img alt'Não existe imagem' width='80px' height='80px 'src=images/" + usuariojson.foto + ">";
    }
}

function preenchercombo(lista){
    var tabela ="<table class='table'>" +
    "<thead class='thead-dark'>"+
    "<tr>" +
    "<th>Parceiro</th>" +
    "<th style='text-align:center'>Volume Transacional (R$)</th>" +
    "</tr>"+
    "</thead>";
   
   var saida = "<option value=''>Selecione</option>";
   for (contador=0; contador< lista.length; contador++){
       saida+=
       "<option value='" + lista[contador].id_agente + "'>" + lista[contador].nome_agente + "</option>";

       var valor = (lista[contador].volume_transacional).toLocaleString(
        undefined, // leave undefined to use the browser's locale,
                   // or use a string like 'en-US' to override it.
        { minimumFractionDigits: 2 }
      );
       tabela +=
        "<tbody>"+
        "<tr>" +
        "<td>"+ lista[contador].nome_agente+"</td>" +
        "<td align='center'>"+ valor+"</td>" +
        "</tr>"+
        "</tbody>";

   }
   document.getElementById("cmbagentes").innerHTML=saida;
   tabela+= "</table>";
   document.getElementById("top10").innerHTML=tabela;
}

function getAgenteId(){
    fetch("http://localhost:8080/agente/"+document.getElementById("cmbagentes").value)
    .then(res => res.json())
    .then (res => {
        window.location="dashboard.html"
        localStorage.setItem("pacote", JSON.stringify(res))
    }
        )

}

function getTransacoes(){
    var agentestr = localStorage.getItem("pacote");
    var agentejson = JSON.parse(agentestr);

    document.getElementById("total").innerHTML = agentejson.volume_transacional;

    document.getElementById("parceiro").innerHTML = agentejson.nome_agente;
    
    fetch("http://localhost:8080/totalsucesso/"+agentejson.id_agente)
    .then(res => res.json())
    .then(res => {
        document.getElementById("sucesso").innerHTML = 
        res});


    fetch("http://localhost:8080/totalfalha/"+agentejson.id_agente)
    .then(res => res.json())
    .then(res => {
        document.getElementById("falha").innerHTML = 
        res});

    fetch("http://localhost:8080/totalfraude/"+agentejson.id_agente)
    .then(res => res.json())
    .then(res => {
        document.getElementById("fraude").innerHTML = 
        res});
    //17/12/2020
}


