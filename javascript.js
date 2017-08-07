// JavaScript Document

$(document).bind( "mobileinit", function() {
$.support.cors = true;
$.mobile.allowCrossDomainPages = true;
});

$(document).on('pagecreate', function(){
/*
$('.cerrar').click(function(){
	if(navigator.app){
		navigator.app.exitApp();
	}
	else if(device){
		device.exitApp();
	};
});

$(document).on('pageinit', function(){
*/

//arrays que guardan todos los datos posibles de los personajes para el cuento
var imgpers=new Array();
var pers=new Array();
var persdescrip=new Array();

//arrays que guardan todos los txt posibles de los lugares y finales para el cuento
var arraytxtlugar=new Array();
var arraytxtfinal=new Array();

//variables donde se guardaran las opciones elegidas para el cuento
var perselegido="";
var descripelegida="";
var lugarelegido="";
var finalelegido="";

var cuento;

//PAGINA PERSONAJES**************************************************************************
function mostrar_imgdibu(){
	//$.getJSON("http://localhost/capricho/app/traer_img_dibu.php", function(rutadibu, iddibu){		
	$.getJSON("http://www.capricholucero.xyz/app/traer_img_dibu.php", function(rutadibu,iddibu){
	
		$.each(rutadibu, function(i, campos){

		//creo dinamicamente el div de la grilla a o b segun si el nro de vuelta si es par o impar
		if (i % 2 == 0){
		$('#grillapersonajes').append("<div class='ui-block-a' id="+i+"></div>");
	
		}
			else{
			$('#grillapersonajes').append("<div class='ui-block-b' id="+i+"></div>");
			}

		//coloco adentro dinamicamente la imagen de los personajes en la grilla con el vinculo para el popup 
		var idpers='#'+i;
		$(idpers).append('<div><a href="#poppersonaje'+i+'" data-rel="popup" data-position-to="window" data-transition="fade" data-inline="true"><img class="popphoto" src="http://www.capricholucero.xyz/app/img/'+campos.rutadibu+'"></a></div>');
		
		//guardo en un array cada ruta en cada vuelta del bucle cada posicion de este array tiene el nombre del id que viene de la base de datos	
			var posruta=campos.iddibu;
			imgpers[posruta]=campos.rutadibu;
			var cantpos=imgpers.length-1;
	
		
		
		});/*cierre $.each*/
	
	});/*cierre $.getJSON*/	
};/*cierre funcion*/	
mostrar_imgdibu();

//********************************

function llenar_popup_pers(){
//coloco el nombre de los personajes a los popup	
	//$.getJSON("http://localhost/capricho/app/traer_nombre_dibu.php", function(nombredibu,iddibu){	
	$.getJSON("http://www.capricholucero.xyz/app/traer_nombre_dibu.php", function(nombredibu,iddibu){
		$.each(nombredibu, function(i, campos){
		
			var idpop='#poppersonaje'+i;
			$(idpop).append('<a href="#lugares" data-rel="back" class="ui-btn-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">close</a><h3>'+campos.nombredibu+"</h3>");

			//guardo en un array cada nombre en cada vuelta del bucle cada posicion de este array tiene el nombre del id que viene de la base de datos	
			var posnombre=campos.iddibu;
			pers[posnombre]=campos.nombredibu;
		
		});/*cierre $.each*/

			//coloco la descripcion de los personajes a los popup	
			//$.getJSON("http://localhost/capricho/app/traer_descrip_dibu.php", function(descripdibu,iddibu){
			$.getJSON("http://www.capricholucero.xyz/app/traer_descrip_dibu.php", function(descripdibu,iddibu){

				//alert (descripciondibu.length);		
				$.each(descripdibu, function(i, campos){
					var idpop='#poppersonaje'+i;
					$(idpop).append('<h4>'+ campos.descripdibu +'</h4>');

		//guardo en un array cada descripcion en cada vuelta del bucle cada posicion de este array tiene el nombre del id que viene de la base de datos	
					var posdescrip=campos.iddibu;
					persdescrip[posdescrip]=campos.descripdibu;
	
			});/*cierre $.each*/
		

					
					//coloco la imagen de los personajes y el boton de confirmar personaje a los popup	
							
					//$.getJSON("http://localhost/capricho/app/traer_img_dibu.php", function(rutadibu,iddibu){	
					$.getJSON("http://www.capricholucero.xyz/app/traer_img_dibu.php", function(rutadibu,iddibu){			
					$.each(rutadibu, function(i, campos){
					var idpop='#poppersonaje'+i;
					var btnpers='btnpersonaje'+i;		
					$(idpop).append('<div><div><img src="http://www.capricholucero.xyz/app/img/'+campos.rutadibu+'"></div><a href="#lugares"  class="ui-btn ui-btn-corner-all confirmar" data-transition="flip" id='+btnpers+'>confirmar personaje</a></div>');

 					var idbtnpers='#'+btnpers;
					
							$(idbtnpers).click(function(){
							posnombre=campos.iddibu;
							perselegido=pers[posnombre];
							//alert(perselegido);
							localStorage.setItem('nombrepersonaje',perselegido);
								
			
							posdescrip=campos.iddibu;
							descripelegida=persdescrip[posdescrip];
							//alert(descripelegida);
					
							//guardar offline
							localStorage.setItem('descripcionpersonaje',descripelegida);
					
							});			
			
	
				});/*cierre $.each*/
		});/*cierre $.getJSON*/
		});/*cierre $.getJSON*/
			});/*cierre $.getJSON*/
};/*cierre funcion*/

llenar_popup_pers();

//PAGINA LUGARES*************************************************************************



function mostrar_imglugar(){
//$.getJSON("http://localhost/capricho/app/traer_img_lugar.php", function(rutalugar){		
$.getJSON("http://www.capricholucero.xyz/app/traer_img_lugar.php", function(rutalugar){
	$.each(rutalugar, function(i, campos){

//creo dinamicamente el div de la grilla a o b segun si el nro de vuelta si es par o impar
	if (i % 2 == 0){
	$('#grillalugares').append('<div class="ui-block-a" id="lugar'+i+'"></div>');
	
	}
		else{
		$('#grillalugares').append('<div class="ui-block-b" id="lugar'+i+'"></div>');
		}
//coloco adentro dinamicamente la imagen de los lugares en la grilla con el vinculo para el popup 
		var lugar='#lugar'+i;
		
		$(lugar).append('<div><a href="#poplugar'+i+'" data-rel="popup" data-position-to="window" data-transition="fade" data-inline="true"><img class="popphoto" src="http://www.capricholucero.xyz/app/img/'+campos.rutalugar+'"></a></div>');
			
});/*cierre $.each*/
});	/*cierre $.getJSON*/
};/*cierre funcion*/
mostrar_imglugar();

//*******************************************************************************************
function llenarpopuplugar(){
	
//coloco el nombre de los LUGARES a los popup	
	//$.getJSON("http://localhost/capricho/app/traer_nombre_lugar.php", function(nombrelugar){	
	$.getJSON("http://www.capricholucero.xyz/app/traer_nombre_lugar.php", function(nombrelugar){
			$.each(nombrelugar, function(i, campos){
			var idpoplugar='#poplugar'+i;
			$(idpoplugar).append('<a href="#finales" data-rel="back" class="ui-btn-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">close</a><h3>'+campos.nombrelugar+'</h3>');
			});/*cierre $.each*/



	//coloco la descripcion de los lugares a los popup	
	//$.getJSON("http://localhost/capricho/app/traer_descrip_lugar.php", function(descriplugar){
	$.getJSON("http://www.capricholucero.xyz/app/traer_descrip_lugar.php", function(descriplugar){
		
		$.each(descriplugar, function(i, campos){
		var idpoplugar='#poplugar'+i;
		$(idpoplugar).append('<h4>'+ campos.descriplugar +'</h4>');
		});/*cierre $.each*/
		
	
		
	//coloco la imagen de los lugares y el boton de confirmar a los popup			
	//$.getJSON("http://localhost/capricho/app/traer_img_lugar.php", function(rutalugar, idlugar){	
	$.getJSON("http://www.capricholucero.xyz/app/traer_img_lugar.php", function(rutalugar, idlugar){
					
			$.each(rutalugar, function(i, campos){
				var idpoplugar='#poplugar'+i;	
				var btnlugar='btnlugar'+i;	
				
			$(idpoplugar).append('<img src="http://www.capricholucero.xyz/app/img/'+campos.rutalugar+'"><a href="#finales" class="ui-btn ui-btn-corner-all confirmar" data-transition="flip" id='+btnlugar+'>confirmar lugar</a>');


 							var idbtnlugar='#'+ btnlugar;
					
							$(idbtnlugar).click(function(){							
							poslugar=campos.idlugar;
							lugarelegido=arraytxtlugar[poslugar];
							
							localStorage.setItem('lugarseleccionado',lugarelegido);								
							});	/*cierre evento click*/



			});/*cierre $.each*/
			
			//traigo todos los txt lugares y los guardo en el array*******************************
			//$.getJSON("http://localhost/capricho/app/traer_txt_lugar.php", function(txtlugar,idlugar){	
			$.getJSON("http://www.capricholucero.xyz/app/traer_txt_lugar.php", function(txtlugar,idlugar){	
			$.each(txtlugar, function(i, campos){
	
			//guardo en un array todos los lugares de los cuentos, cada posicion tiene el nombre del id de la base de datos
				var poslugar=campos.idlugar;
				arraytxtlugar[poslugar]=campos.txtlugar;								
			})/*cierre $.each*/

});/*cierre $.getJSON*/
});/*cierre $.getJSON*/	
});/*cierre $.getJSON*/
});/*cierre $.getJSON*/		
};/*cierre funcion*/
llenarpopuplugar();

//PAGINA FINALES************************************************
function mostrar_imgfinal(){
//$.getJSON("http://localhost/capricho/app/traer_img_final.php", function(rutafinal){	
$.getJSON("http://www.capricholucero.xyz/app/traer_img_final.php", function(rutafinal){
	$.each(rutafinal, function(i, campos){
//creo dinamicamente el div de la grilla a o b segun si el nro de vuelta si es par o impar

	if (i % 2 == 0){
	$('#grillafinales').append("<div class='ui-block-a' id='final"+i+"'></div>");
	
	}
		else{
		$('#grillafinales').append("<div class='ui-block-b' id='final"+i+"'></div>");
		}
//coloco adentro dinamicamente la imagen de los finales en la grilla con el vinculo para el popup 
		var idfinal='#final'+i;
		
		$(idfinal).append('<div><a href="#popfinal'+i+'" data-rel="popup" data-position-to="window" data-transition="fade" data-inline="true"><img class="popphoto" src="http://www.capricholucero.xyz/app/img/'+campos.rutafinal+'"></a></div>');
	});/*cierre each*/	
	});	/*cierre $.getJSON*/
};/*cierre funcion*/
mostrar_imgfinal();

function llenar_popup_final(){
	//coloco el nombre de los finales a los popup	
	//$.getJSON("http://localhost/capricho/app/traer_nombre_final.php", function(nombrefinal){	
	$.getJSON("http://www.capricholucero.xyz/app/traer_nombre_final.php", function(nombrefinal){
		
		$.each(nombrefinal, function(i, campos){
			var idpopfinal='#popfinal'+i;
			$(idpopfinal).append('<a href="#finales" data-rel="back" class="ui-btn-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">close</a><h3>Final '+campos.nombrefinal+"</h3>");
		});/*cierre $.each*/
		
			//coloco la imagen de los finales a los popup			
				//$.getJSON("http://localhost/capricho/app/traer_img_final.php", function(rutafinal, idfinal){	
				$.getJSON("http://www.capricholucero.xyz/app/traer_img_final.php", function(rutafinal){			
					$.each(rutafinal, function(i, campos){
						
		var idpopfinal='#popfinal'+i;	
		var btnfinal='btnfinal'+i;	
					
			$(idpopfinal).append('<div><img src="http://www.capricholucero.xyz/app/img/'+campos.rutafinal+'"></div><a href="#cuento" class="ui-btn ui-btn-corner-all confirmar" data-transition="flip" id='+btnfinal+'>confirmar final</a>');


 				var idbtnfinal='#'+ btnfinal;
					
							$(idbtnfinal).click(function(){							
							posfinal=campos.idfinal;
							finalelegido=arraytxtfinal[posfinal];
							localStorage.setItem('finalseleccionado',finalelegido);	
							$('#elcuento').empty();		
							mostrar_cuento();					
							});


			
		});/*cierre $.each*/
		
		//$.getJSON("http://localhost/capricho/app/traer_txt_final.php", function(txtfinal,idfinal){	
	$.getJSON("http://www.capricholucero.xyz/app/traer_txt_final.php", function(txtfinal,idfinal){
		$.each(txtfinal, function(i, campos){
		//guardo en un array todos los finales de los cuentos, cada posicion tiene el nombre del id de la base de datos
			var posfinal=campos.idfinal;
			arraytxtfinal[posfinal]=campos.txtfinal;
			
		});/*cierre $.each*/
		
		});/*cierre $.getJSON*/	
		});/*cierre $.getJSON*/	
		});/*cierre $.getJSON*/	
};/*cierre funcion*/	
llenar_popup_final();

//***************** CUENTO**********************************
function mostrar_cuento(){
	
			var perselegidofinal=localStorage.getItem('nombrepersonaje');
			var descripelegidafinal=localStorage.getItem('descripcionpersonaje');
			var lugarelegidofinal=localStorage.getItem('lugarseleccionado');
			var finalelegidofinal=localStorage.getItem('finalseleccionado');
			
			cuento='Un animalito llamado '+perselegidofinal+' caminaba siempre '+descripelegidafinal+'. Un día encontró un globo que volaba divertido haciendo piruetas por el aire y comenzó a seguirlo hasta que '+ lugarelegidofinal+ " " + finalelegidofinal;

			$('#elcuento').append('<p>'+cuento+'</p>');	
	
						

};/*cierre funcion*/	

$('#otrocuento').click(function(){							
$('#elcuento').empty();					
});

$('#suscribir').click(function(){							
$.mobile.changePage("#cuento");				
});
/*
function quedaencuento(){
location.href = "http://localhost/capricho/app/index.html";	
}
*/
//agregar boton de cerrar navigator.app.exitApp();  es de cordova usar jquey para el evento


});/*cierre $(document).ready*/



