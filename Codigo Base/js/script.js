var dataUrl = "dados/menu.json",
    itensHtml = "item-snippet.html",
	itensConteudo = "item-conteudo.html";

function insereHtml(seletor, html) {
  var elemento = document.querySelector(seletor);
  console.log(html);
  elemento.innerHTML = html;
}

function inserePropriedade(template, propName, propValue) {

  var propriedade = "{{" + propName + "}}";

  template = template.replace(new RegExp(propriedade, "g"), propValue);
  return template;
}

function constroiPagina(dados) {
  var htmlFinal = "";
  $ajaxUtils.sendGetRequest(itensHtml, function(itensHtml) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var html = itensHtml,
          titulo = dados[i].titulo;

      html = inserePropriedade(html, "titulo", titulo);
      
      htmlFinal+= html;
    }
    insereHtml("#bs-example-navbar-collapse-1", htmlFinal);
  }, false);
}

function constroiPagina2(dados) {
  var htmlFinal = "";
  $ajaxUtils.sendGetRequest(itensConteudo, function(itensConteudo) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var html = itensConteudo,
          titulo = dados[i].titulo,
		  conteudo = dados[i].Conteudo;

      html = inserePropriedade(html, "titulo", titulo);
      html = inserePropriedade(html, "Conteudo", conteudo);
	  
      htmlFinal+= html;
    }
    insereHtml("#nadinha", htmlFinal);
  }, false);
}

$ajaxUtils.sendGetRequest(dataUrl, constroiPagina);
