//REALIZAR LOGIN
function listarUsuarios(dados){
//location.reload(); 
	$('#frmLogin').submit(function(e) {
		e.preventDefault();	
		$('.btnAjuda').click(function(){
			window.location.href = "foo.html";
		});
		$.each(dados, function(chave, valor){
			var a = valor.usernameUsuario;
			var b = valor.id;
			var c = valor.pontos;
			//console.log(a);
			var username = $("#username").val();
			var password = $("#password").val();
			var senha ="123456";
		
			if((username=="") || (password=="")){
				$("#popupLogin").popup("open");
			}
			if((username!=a) && (password!=senha)){
				$("#popupErroLogin").popup("open");
				$('#frmLogin').each (function(){
					this.reset();
				});
			}
			else if((username==a) && (password==senha)){
				//alert('Dados validos');
				window.location.href = "#home";
				var usuario = a;
				var id = b;
				var pontos = c;
				//console.log(id);
				//console.log(usuario);
				//console.log(usuario);
				$('#nome').val(usuario);
				//ATRIBUICAO DE ID
				$('#idUsuario').val(id);//Feedbacks
				$('#usuarioID').val(id);//Respostas
				$('#idDOUsuario').val(id);
				
				$('#pontos').val(pontos);
				
				
			//	$('#nome').attr("disabled", true);
			}
		});
	});
	
}
//CARREGAR JSON via JAVASCRIPT PURO
function listarPerguntas(dados){
	var anterior ="";
	var resposta ="";
	var nivel ="";
	//VERIFICACAO SE PERGUNTA FOI RESPONDIDA
	 $.getJSON('http://localhost/appdocWS/ajax/php/listar_respondida.php?callback=?',
		function(data) {
			$.each(data,function(key,value){
				//console.log(value.perguntaID);
				//console.log(value.usuarioID);
				var respondeu = value.respondida;
				$('#respondeu').val(respondeu);
			});
		});
		var isRespondeu = $('#respondeu').val();
	//	console.log(isRespondeu);
		var alteraRespondida = $('#respondeu').val();
		resposta += '<ul data-role="listview" class="ui-icon-alt" data-filter="true" data-filter-placeholder="Filtrar dados">';

	 $.each(dados, function(chave, value){
		nivel = String(value.tipoNivel);
		if(anterior !== nivel){
			resposta+= '<li data-role="list-divider" data-theme="d">' +value.tipoNivel + '</li>'
		}
			anterior = nivel;
			if(value.respondida==0){
				anterior = nivel;
				resposta+='<li class="lipergunta">';
				resposta+='<a href="#detalhe" onclick="mostrarDetalhe(' +value.id +')">';
				resposta+='<img src="'+value.posterPergunta + '"/>';
				resposta+='<h3>'+value.descricaoCategoria+'</h3>';
				resposta+= '<p>' +value.nomePergunta+ '</p>';
				resposta+= '</a>';
				resposta+= '</li>';
			}
		
		});
		resposta += '</ul>';
		
	//	console.log(resposta);
		$('#minhalista').html(resposta);
		//location.reload(); 
} 


function preencherTipo(dados){

	var resposta ="";
	resposta += '<ul data-role="listview" class="ui-icon-alt" data-filter="true" data-filter-placeholder="Filtrar dados">';
   
	 $.each(dados, function(chave, valor){
		resposta+='<li>';
			resposta+='<a href="#detalheTipo" onclick="mostrarDetalheTipo(' +valor.id +')">';
			resposta+='<h3>'+valor.id+'</h3>';
			resposta+= '<p>' +valor.descricao+ '</p>';
			resposta+= '</a>';
			resposta+= '</li>';
			
		});
		resposta += '</ul>';
		//console.log(resposta);
		$('#minhalistafeedback').html(resposta);
}


function mostrarRespostas(id){
	$('#detalhe_respostas').remove("ul"); // limpa memoria cache do ul
	 $.getJSON('http://localhost/appdocWS/ajax/php/detalhar_respostas.php?cod=' + id + '&callback=?',
	function(data) {
		//console.log(data.nomeUsuario);
		var info_resposta='';
		

		info_resposta+='<h3> Respostas desta pergunta(' + data[0].length + ')</h3>'; //mostra qtd de comentarios
		info_resposta+='<ul>';
		$.each(data[0], function(i, valor) { // varre toda a data
			//console.log(valor[0].nomeUsuario);
			info_resposta += '<li class="janela_resposta">';
			//info_resposta += '<time>' + valor.DATA_COMENTARIO + '</time>';//data
			info_resposta += '<h4>' + valor.nomeUsuario + '</h4>'; // nome da pessoa
			info_resposta += '<h5>' + valor.nomePergunta + '</h5>'; // nome da pessoa
			info_resposta += '<p>' + valor.resultadoResposta + '</p>';//nome do comentário
			info_resposta += '</li>';
		});
		info_resposta+='</ul>';
		
	
		
		
		$('#detalhe_respostas').html(info_resposta);
	});
}
function mostrarFeedbacks(id){
	$('#detalhe_feedbacks').remove("ul"); // limpa memoria cache do ul
	 $.getJSON('http://localhost/appdocWS/ajax/php/detalhar_feedbacks.php?cod=' + id + '&callback=?',
	function(data) {
		//console.log(data);
		var info_feedback='';
		info_feedback+='<h3> Feedbacks desta categoria(' + data[0].length + ')</h3>'; //mostra qtd de comentarios
		info_feedback+='<ul>';
		$.each(data[0], function(i, valor) { // varre toda a data
			//console.log(valor[0].nomeUsuario);
			info_feedback += '<li class="janela_feedback">';
			//info_resposta += '<time>' + valor.DATA_COMENTARIO + '</time>';//data
			info_feedback += '<h4>' + valor.tituloFeedback + '</h4>'; // nome da pessoa
			info_feedback += '<h5>' + valor.tipoDescricao + '</h5>'; // nome da pessoa
			info_feedback += '<p>' + valor.descricaoFeedback + '</p>';//nome do comentário
			info_feedback += '</li>';
		});
		info_feedback+='</ul>';
		
		
		$('#detalhe_feedbacks').html(info_feedback);
	});
}

function mostrarDetalhe(id){//consulta via json personalizado
	var respostaRB="";
	var saida = '';
	$('#detalhe_pergunta').empty();//excluir o cache do json dps acessa novamente
	$("#respostaRB").empty();
	
	
	$.getJSON('http://localhost/appdocWS/ajax/php/detalhar_perguntas.php?cod=' + id +'&callback=?',
	function(data) {
			
		saida+='<img src="' +  data[0][0].posterPergunta + '" class="imagemdetalhe">';
		saida+='<h2>' + data[0][0].descricaoCategoria + '</h2>';
		saida+='<p>'+ data[0][0].nomePergunta + '</p>';
		$('#detalhe_pergunta').html(saida);
		
		respostaRB+='<fieldset data-role="controlgroup">';
		respostaRB+='<legend>Escolha a resposta:</legend>';
		respostaRB+='<input type="radio" name="respostaRB" id="resposta1" value="1"/>';
		respostaRB+='<label for="resposta1">'+data[0][0].resposta1 +'</label>';
		respostaRB+='<br/>';
		respostaRB+='<input type="radio" name="respostaRB" id="resposta2" value="2"  />';
		respostaRB+='<label for="resposta2">'+data[0][0].resposta2 +'</label>';
		respostaRB+='<br/>';
		respostaRB+='<input type="radio" name="respostaRB" id="resposta3" value="3"  />';
		respostaRB+='<label for="resposta3">'+data[0][0].resposta3 +'</label>';
		respostaRB+='<br/>';
		respostaRB+='<input type="radio" name="respostaRB" id="resposta4" value="4"  />';
		respostaRB+='<label for="resposta4">'+data[0][0].resposta4 +'</label>';
		respostaRB+='</fieldset>';
		$("#respostaRB").html(respostaRB);	
		
		dica = data[0][0].dica;
		$(".msgdica").text(dica);
	});
	//$('#perguntaID').attr('value',id)//altera para ID vindo do BD
	$('#perguntaID').attr('value',id);//altera para ID vindo do BD
	mostrarRespostas(id);
	
	
}

function mostrarDetalheTipo(id){//consulta via json personalizado
	//console.log(id);
	$('#detalhe_tipo').empty();//excluir o cache do json dps acessa novamente	
	$.getJSON('http://localhost/appdocWS/ajax/php/detalhar_tipos.php?cod=' + id +'&callback=?',
	function(data) {
		//console.log(data);
		//console.log('Chegou aqui');
		var saida = '';
		saida+='<h2>' + data[0][0].id + '</h2>';
		saida+='<p>'+ data[0][0].descricao + '</p>';
		$('#detalhe_tipo').html(saida);
	});
	$('#tipo_id').attr('value',id);//altera para ID vindo do BD
	mostrarFeedbacks(id);
}
$(function(a){
	$('#inserirFeedback').submit(function(e) {
		e.preventDefault();
		
		if(($("#titulo").val()=='') || ($("#descricao").val() =='')){
			$("#popupTitulo").popup("open");
			$("#titulo").focus();
		}
		//if(($("#descricao").val()=='')){
	//		$("#popupDescricao").popup("open");
	//		$("#descricao").focus();
	//	}
		else{
		var feedback='';
		feedback += '<li class="janela_feedback">';
		feedback += '<time>enviando...</time>';
		feedback += '<h4>' + $('#titulo').val() + '</h4>';
		feedback += '<p>' + $('#descricao').val() + '</p>';
		
		//resposta += $('#perguntaID').attr('value',id);
		feedback += '</li>';
		$('#detalhe_feedbacks ul').prepend(feedback);	
	   
	    // adicionar no banco
		var formulario = $(this);
		$.ajax({
			type:	formulario.attr("method"),
			data:	formulario.serialize(),
			url:	'http://localhost/appdocWS/ajax/php/inserir_feedback.php'
		}).done(function(msg) {
			var agora = new Date();
			var hora = agora.getHours() + ":" + agora.getMinutes()
			$('#detalhe_feedbacks li:first time').html("Enviada a " + hora )
		}).fail(function(msg) {
			$('#detalhe_feedbacks li:first time').html("erro")
		}).always(function() {
			$('#titulo').attr('value','');
			$('#descricao').attr('value','');
			//$('#perguntaID').attr('value','');
		});
		}
		$('#inserirFeedback').each (function(){
			this.reset();
		});
    });

});

$(function(e) {
	var respondida = 0;
	respondida =1;
	$('#respondida').val(respondida);
	
	
	$('#inserirResposta').submit(function(e) {
		e.preventDefault();
		var valor="";
		var texto = "";
		//VERIFICA o RB selecionado
	  $('input:radio[name=respostaRB]').each(function() {
         if ($(this).is(':checked'))
			valor = ($(this).val()); //pega o value
			texto = $('input[name=respostaRB]:checked + label').text()
       })
      // alert(valor);
	 //  alert(texto);
	   $("#resposta").val(texto);
		
		var isChecked = jQuery("input[name=respostaRB]:checked").val();
			 
		 if (!isChecked) {
			$("#popupInfo").popup("open");
			('#n_respondeu').val("0");
		} else{
		var resposta='';
		resposta += '<li class="janela_resposta">';
		resposta += '<time>enviando...</time>';
		resposta += '<h4>' + $('#nome').val() + '</h4>';
		resposta += '<p>' +$('#resposta').val()+ '</p>';
		
		//console.log(resposta);
		
		//resposta += $('#perguntaID').attr('value',id);
		resposta += '</li>';
		$('#detalhe_respostas ul').prepend(resposta);	
	   
	    
		
			var formulario = $(this);
			$.ajax({
				type:	formulario.attr("method"),
				data:	formulario.serialize(),
				url:	'http://localhost/appdocWS/ajax/php/inserir_resposta.php'
			}).done(function(msg) {
				var agora = new Date();
				var hora = agora.getHours() + ":" + agora.getMinutes()
				$('#detalhe_respostas li:first time').html("Enviada a " + hora )

			}).fail(function(msg) {
				$('#detalhe_respostas li:first time').html("erro")
			}).always(function() {
			//	$('#nome').attr('value','');
				$('#resposta').attr('value','');
				//$('#perguntaID').attr('value','');
				
			});
		}
		var formulario = $(this);
		$.ajax({
			type:	formulario.attr("method"),
			data:	formulario.serialize(),
			url:	'http://localhost/appdocWS/ajax/php/altera_pontos.php'
		});
		var formulario = $(this);
		$.ajax({
			type:	formulario.attr("method"),
			data:	formulario.serialize(),
			url:	'http://localhost/appdocWS/ajax/php/inserir_respondida.php'
		});
		
		
		var respostaCorreta="";
		var respondeuPergunta="";
		var id = $("#perguntaID").val();
		$.getJSON('http://localhost/appdocWS/ajax/php/detalhar_perguntas.php?cod=' + id +'&callback=?',
		function(data) {
			
			respostaCorreta = data[0][0].respostaCerta;
			respondeuPergunta = data[0][0].respondida;
			
			var pontos = "";
			//var validarResposta =1;
			console.log(valor);
			$.getJSON('http://localhost/appdocWS/ajax/php/listar_perguntas.php?&callback=?',
			function(dados) {
				$.each(dados,function(chave,value){
				//console.log(value);
				if ((valor !== respostaCorreta)&&(valor!=0)){
					$("#popupErro").popup("open");
					$("#acertouTotal").val("0");
					//window.location.href = "#pergunta";
					//listarPerguntas(dados);
					//listarPerguntas(dados);
					//location.reload();
				} 
				
				else if (valor === respostaCorreta){
					$("#popupAcerto").popup("open");
					$("#acertouTotal").val("1");
					//window.location.href = "#pergunta";
					
				//	listarPerguntas(dados);
				//	window.location.href = "#pergunta";
					
				}
				
			});
			});
			//}
		});
	 
	});
	//PONTUACAO
	var pontos = "";
	var acertou = "";
	var errou = "";
	$("#enviar").click(function(){
		acertou = $("#acertouTotal").val();
		//errou = $("#errou").val();
		if(acertou =="1"){
			pontos++;
			console.log(pontos);
			$("#pontos").val(pontos);
		}
	
		
	});
	
	$("#dica").click(function(){
		$("#popupDica").popup("open");
	});
	
});

function listarRankings(dados){
	var montaTabela="";
	montaTabela+='<h3 align="center">Ranking AppDoc</h3>';
	montaTabela+='<table data-role="table" data-mode="columntoggle" class="ui-responsive table-stroke table-stripe" id="minha-tabela" data-column-btn-text="Colunas..." data-column-btn-theme="b" data-column-btn-icon="delete">';
	montaTabela+='<thead>';
		montaTabela+='<tr>';
		montaTabela+='<th width="10%" data-priority="3">ID</th>';
		montaTabela+='<th width="40%">Usuários</th>';
		montaTabela+='<th width="10%" data-priority="1">Pontos</th>';
		montaTabela+='<th width="30%" data-priority="2">Email</th>';
		
		
		montaTabela+='</tr>';
	montaTabela+='</thead>';
	$.each(dados, function(chave, valor){
		montaTabela+='<tbody>';	
		montaTabela+='<tr>';
		montaTabela+='<td>'+valor.id+'</td>';
		
		montaTabela+='<td>'+valor.usernameUsuario+'</td>';
		montaTabela+='<td>'+valor.pontos+'</td>';
		montaTabela+='<td>'+valor.emailUsuario+'</td>';
	});
	montaTabela+='</tr>';
	montaTabela+='</tbody>';
	montaTabela+='</table>';
	$("#table_ranking").html(montaTabela);
		
}

$(function(z){
	$('#responderQuestionario').submit(function(e) {
		e.preventDefault();
		
		var pergunta1= jQuery("input[name=pergunta1]:checked").val();
		var pergunta2= jQuery("input[name=pergunta2]:checked").val();
		var pergunta3= jQuery("input[name=pergunta3]:checked").val();
		//REGRAS DE VALIDACAO
		if (!pergunta1) {
			$('#popupQuestionario1').popup("open");
			//alert('clicou 1');
		} else if(!pergunta2){
			$('#popupQuestionario2').popup("open");
			//alert('clicou 2');
		}else if(!pergunta3){
			$('#popupQuestionario3').popup("open");
		}else{ //LOGICA PARA INSERCAO DOS DADOS NO BD
			$('input:radio[name=pergunta1]').each(function() {
				if ($(this).is(':checked')){
					var valorPergunta1 = ($(this).val()); //pega o value
					$('#design').val(valorPergunta1);
				}
			});
			
			$('input:radio[name=pergunta2]').each(function() {
				if ($(this).is(':checked')){
					var valorPergunta2 = ($(this).val()); //pega o value
					$('#indicacao').val(valorPergunta2);
				}
			});
			
			$('input:radio[name=pergunta3]').each(function() {
				if ($(this).is(':checked')){
					var valorPergunta3 = ($(this).val()); //pega o value
					$('#nota').val(valorPergunta3);
				}
			});
			
			$('#popupQuestionarioConcluido').popup("open");
			
			//INSERIR NO BD
			var formulario = $(this);
			$.ajax({
				type:	formulario.attr("method"),
				data:	formulario.serialize(),
				url:	'http://localhost/appdocWS/ajax/php/responder_questionario.php'
			}).done(function(msg) {
				//var agora = new Date();
				//var hora = agora.getHours() + ":" + agora.getMinutes()
				//$('#detalhe_feedbacks li:first time').html("Enviada a " + hora )
			}).fail(function(msg) {
				//$('#detalhe_feedbacks li:first time').html("erro")
			}).always(function() {
			//	$('#titulo').attr('value','');
			//	$('#descricao').attr('value','');
				//$('#perguntaID').attr('value','');
			});
			
			$('#responderQuestionario').each (function(){
				this.reset();
			});
		}
		
    });

});
