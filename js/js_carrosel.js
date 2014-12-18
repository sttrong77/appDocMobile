$( function() {
				var intervalo;
				var passo;
				var largura;
				var n_imagens;
				var i;
				largura = $(window).width();
				
				//Num imgs
				n_imagens = $('#janela img').length;//numero de janelas
				
				//determinar largura da paginacao
				 $('#paginacao').css('width', largura);
				
				limite = (( largura * n_imagens) + (4.5 * n_imagens)) * -1;//-1 pq roda pela esquerda
				//limite do carrocel
				
				//determinar largura das img
				$('#janela img').css('width',largura).css('height',largura)//atribui largura para as propriedades
				//Criar img no começo
				$('#janela').prepend('<img height="' + largura + '"width="' +largura + '">');//add img no inicio
				$('#janela img:first').attr('src', $('#janela img:last').attr('src'));//pega a ultima img
				
				//Criar img no final
				$('#janela').append('<img height="' + largura + '"width="' +largura + '">');//add img no inicio
				
					
				
				//inserção bulletpoints
				for(j=0; j<n_imagens; j++){
					$('#paginacao').append('<li class="paginas"></li>')
				}
				i=1;
				$('li.paginas:nth-child(' + i + ')').addClass('verde')//define primeira bolinha verde
				
				passo = largura + 4.5//Adequa p tds dispositivos
				//Mover p esquerda 1 foto
				$('#janela').css('left', passo*-1);
				
				function moverFotos(){
					$('#janela').animate({ left:"-=" + passo}, 500, function(){
						
						$('li.paginas:nth-child(' + i + ')').removeClass('verde').addClass('cinza')//troca de cor verde p cinza
						i++
						$('li.paginas:nth-child(' + i + ')').removeClass('cinza').addClass('verde')//troca de cor verde p cinza
						
						if ( $('#janela').position().left < limite){
							  $('#janela').css('left',passo*-1);
							  
							$('li.paginas:last').removeClass('verde').addClass('cinza');//primeira ft cinza
							$('li.paginas:first').removeClass('cinza').addClass('verde');//ultima ft verde
							i=1;
						 }
					});
				}
				intervalo = setInterval(moverFotos,1000)
				//SWIPE
			//	$('#janela').on("swipeleft", swipeEvento);
			//	$('#janela').on("swipeleft", swipeEsquerda);
			//	$('#janela').on("swiperight", swipeDireita);
				
				function swipeEvento(){
					clearInterval(intervalo);//parar setInterval
				}
				function swipeEsquerda(){
					moverFotos();
					intervalo = setInterval(moverFotos, 5000);
				}
				function swipeDireita(){
					$('#janela').animate({ left:"+=" + passo}, 500, function(){
						
						$('li.paginas:nth-child(' + i + ')').removeClass('verde').addClass('cinza')//troca de cor verde p cinza
						i--
						$('li.paginas:nth-child(' + i + ')').removeClass('cinza').addClass('verde')//troca de cor verde p cinza
						
						if ( $('#janela').position().left >=0 ){//gira pro lado diferente
							  $('#janela').css('left',passo*-1);
							  
							  $('#janela').css('left',n_imagens * passo * -1)//ir pra outro lado
							$('li.paginas:last').removeClass('cinza').addClass('verde');//primeira ft cinza
							$('li.paginas:first').removeClass('verde').addClass('cinza');//ultima ft verde
							i=n_imagens;//i - final
						 }
							intervalo = setInterval(moverFotos, 5000);
					});
				}
			});	