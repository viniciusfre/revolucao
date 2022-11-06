sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("revolucao.controller.Main", {
            onInit: function () {
                var ImageList = {
                    Images: [
                        {
                            title: "Google",
                            url: "https://www.google.com"
                        }
                    ]
                };

                var ImageModel = new JSONModel(ImageList);
                this.getView().setModel(ImageModel,"ModeloImagem");
            },
            onPressBuscar: function(){
                //alert("começou a revolução do sap fiori");
                var oInputBusca = this.byId("inpBusca");
                var sQuery = oInputBusca.getValue();
                //alert(sQuery);

                $.ajax({
                    //cabecalho
                    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    jsonCallback: "getJSON",
                    contentType: "application/json",
                    headers: {
                        "X-RapidAPI-Key": "906a751f76mshe11fe4dd3e612aap1b35d5jsn80101f262631",
		                "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    },
                    //corpo
                    data: {
                        "q": sQuery,
                        "pageNumber": 1,
                        "pageSize": 30,
                        "autoCorrect": true,
                        "safeSearch": true

                    },
                    //retorno em caso de sucesso
                    success : function(data, textStatus){
                        var oImageModel = this.getView().getModel("ModeloImagem");
                        var oDadosImage = oImageModel.getData();

                        oDadosImage = {
                            Images: []


                        };
                        oImageModel.setData(oDadosImage);
                        debugger;

                        var listaResultados = data.value;
                        var newItem;

                        for(var i =0;i<listaResultados.length;i++){
                            newItem = listaResultados[i];
                            oDadosImage.Images.push(newItem);

                        };

                        oImageModel.refresh();


                    }.bind(this),
                    //retorno em caso de erro
                    error: function(){

                    }.bind(this)

                });
            }
        });
    });
