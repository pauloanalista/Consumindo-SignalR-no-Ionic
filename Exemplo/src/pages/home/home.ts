import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

const win = window as any;
const $ = win.$;

// CONECTA NA URL GERADA PELO SERVI�O DO SIGNALR
$.connection.hub.url = "http://signalr.samich.com.br:8080/signalr";

//CRIO UMA CONEXAO COM O HUB CRIADO LA NO C#
const conexao = $.connection.notificacaoHub;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {

    //console.log($);
    //console.log($.connection);

    console.log(conexao);

    // RECEBE AS MENSAGENS
    conexao.client.notificar = function (msg, id) {
      console.log(msg, id);
    };

    // INICIA UMA CONEXAO AO CARREGAR UMA PAGINA
    $.connection.hub.start().done(function () {

      //ENTRO NO GRUPO ABC
      conexao.server.joinGroup(6);
    });

  }

  enviar() {
    //ATENCAO -> TODOS OS CLIENTES IRÃO VER ESTA NOTIFICACAO
    conexao.server.enviarNotificacao({Titulo: "TESTE TRACKBUS", Mensagem: "DESCONSIDERE ESTA MENSAGEM", TipoNotificacao: "success", CodigoLinhaGPS: "143M"}, "6"); 
  }
}
