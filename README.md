# Consumindo SignalR no Ionic 3
No exemplo abaixo irei explicar uma forma simples de consumir os recursos do SignalR no Ionic 3.

## Serviço SignalR
O exemplo será montado se baseando em um serviço criado em uma Api SelfHost que expoem o SignalR através de uma url parecida com está abaixo:

http://{dominio}.com.br:8080/signalr/hubs

Ao chamar a url do serviço em um browser, teremos um resultado parecido como este.

```sh
/*!
 * ASP.NET SignalR JavaScript Library v2.2.0
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies['analiseOperacionalHub'] = this.createHubProxy('analiseOperacionalHub'); 
        proxies['analiseOperacionalHub'].client = { };
        proxies['analiseOperacionalHub'].server = {
            atualizarAnaliseOperacional: function (resumosAnaliseOperacional, nomeGrupo) {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["AtualizarAnaliseOperacional"], $.makeArray(arguments)));
             },

            criarAnaliseOperacional: function (resumosAnaliseOperacional, nomeGrupo) {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["CriarAnaliseOperacional"], $.makeArray(arguments)));
             },

            deletarAnaliseOperacional: function (resumosAnaliseOperacional, nomeGrupo) {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["DeletarAnaliseOperacional"], $.makeArray(arguments)));
             },

            iniciarAnaliseOperacional: function (idConfigGlobalbus, idUsuario, tipoAnalise) {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["IniciarAnaliseOperacional"], $.makeArray(arguments)));
             },

            joinCargaInicialAnaliseOperacionalDinamica: function () {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["JoinCargaInicialAnaliseOperacionalDinamica"], $.makeArray(arguments)));
             },

            joinGroup: function (idConfigGlobalbus, idUsuario) {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["JoinGroup"], $.makeArray(arguments)));
             },

            joinIntegracaoAnaliseOperacional: function () {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["JoinIntegracaoAnaliseOperacional"], $.makeArray(arguments)));
             },

            leaveGroup: function (idConfigGlobalbus, idUsuario) {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["LeaveGroup"], $.makeArray(arguments)));
             },

            listarAnaliseOperacional: function (resumosAnaliseOperacional, nomeGrupo, tipoAnalise) {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["ListarAnaliseOperacional"], $.makeArray(arguments)));
             },

            listarAnaliseOperacionalDaUnidade: function (resumosAnaliseOperacional, nomeGrupo, tipoAnalise) {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["ListarAnaliseOperacionalDaUnidade"], $.makeArray(arguments)));
             },

            obterAnaliseOperacionalDaUnidade: function (idConfigGlobalbus, idUsuario, idUnidadeOperacional, tipoAnalise) {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["ObterAnaliseOperacionalDaUnidade"], $.makeArray(arguments)));
             },

            obterIdsUsuarios: function () {
                return proxies['analiseOperacionalHub'].invoke.apply(proxies['analiseOperacionalHub'], $.merge(["ObterIdsUsuarios"], $.makeArray(arguments)));
             }
        };

        proxies['notificacaoHub'] = this.createHubProxy('notificacaoHub'); 
        proxies['notificacaoHub'].client = { };
        proxies['notificacaoHub'].server = {
            enviarNotificacao: function (notificacao, idConfigGlobalbus) {
                return proxies['notificacaoHub'].invoke.apply(proxies['notificacaoHub'], $.merge(["EnviarNotificacao"], $.makeArray(arguments)));
             },

            enviarNotificacaoBackup: function (mensagem) {
                return proxies['notificacaoHub'].invoke.apply(proxies['notificacaoHub'], $.merge(["EnviarNotificacaoBackup"], $.makeArray(arguments)));
             },

            joinGroup: function (groupName) {
                return proxies['notificacaoHub'].invoke.apply(proxies['notificacaoHub'], $.merge(["JoinGroup"], $.makeArray(arguments)));
             },

            leaveGroup: function (groupName) {
                return proxies['notificacaoHub'].invoke.apply(proxies['notificacaoHub'], $.merge(["LeaveGroup"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));
```


## Configurando nosso projeto em Ionic 3
Para configurar o SignalR de uma forma fácil em seu projeto Ionic, siga os passos abaixo:

### Passo 1 - Montando o ambiente
Instale o NodeJS, logo em seguida abra seu prompt de comando e instale o Ionic e o cordova em um escopo global, desta forma abaixo:

```sh
$ npm install -g ionic cordova

```
### Passo 2 - Criando o projeto
O projeto sitado no exemplo usa um template side menu, para isso execute o comando abaixo em seu prompt de comando.

Crie uma pasta e acesse a mesma para que o projeto seja criado dentro da pasta desejada.

Para criar o projeto execute o comando abaixo:

```sh
$ ionic start MyIonicProject sidemenu

```
O projeto em Ionic será criado no final do processo.

Abra o seu projeto no seu editor desejado para que possamos edita-lo. Se você usar Visual Studio Code, basta digitar "code ." que o Visual Studio Code já irá abrir o projeto aberto na pasta correta.

### Passo 3 - Aplicando libs externas no Ionic
Para aplicar uma lib externa no ionic é simples, baixe aqui mesmo em nosso gitHub a lib que se encontra na pasta
https://github.com/pauloanalista/Consumindo-SignalR-no-Ionic/tree/master/src/assets/_js

É necessário colocar nossa lib na pasta assets, devido o ionic processar os arquivos e gerar um arquivo final que será interpretado pelo browser, que fica na pasta www de seu projeto. Essa pasta nunca é versionada, pois toda mudança feita em seu projeto, essa pasta é renovada com novos arquivos.

Após colocar os js do jquery e jquery do signalr em seu projeto, basta referenciar esses arquivos no seu index.html.

```sh
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="UTF-8">
  <title>Ionic App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="format-detection" content="telephone=no">
  <meta name="msapplication-tap-highlight" content="no">



  <link rel="icon" type="image/x-icon" href="assets/icon/favicon.ico">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#4e8ef7">

  <!-- cordova.js required for cordova apps -->
  <script src="cordova.js"></script>

  <!-- un-comment this code to enable service worker
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('service worker installed'))
        .catch(err => console.error('Error', err));
    }
  </script>-->

  <link href="build/main.css" rel="stylesheet">

</head>

<body>

  <!-- Ionic's root component and where the app will load -->
  <ion-app></ion-app>

  <script src="assets/_js/jquery/jquery-2.1.4.js"></script>
  <script src="assets/_js/SignalR/jquery.signalR-2.1.2.js"></script>
  <script src="http://signalr.samich.com.br:8080/signalr/hubs"></script>


  <!-- The polyfills js is generated during the build process -->
  <script src="build/polyfills.js"></script>

  <!-- The vendor js is generated during the build process
       It contains all of the dependencies in node_modules -->
  <script src="build/vendor.js"></script>

  <!-- The main bundle js is generated during the build process -->
  <script src="build/main.js"></script>

  
</body>

</html>

```
### Passo 4 - Configurando nossa página para ouvir o SignalR

Depois que fizer isso é só abrir o arquivo ts da página que você deseja receber as notificações do SignalR. 

```sh

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

```

#### Explicação
Como já sabemos o TypeScript é um superset do javascript, ou seja, escrevemos em TypeScript e após a transpilação é gerado um JS final que será interpretado pelo browser.
Como eu não achei nenhum pacote NPM que me ajudasse a trabalhar com o SignalR, eu resolvi utilizar o JavaScript direto no meu TypeScript, afinal ele funciona tanto com código TypeScript como Javascript.

Para que o TypeScript reconheça minhas libs precisei usar este código:

```sh
const win = window as any;
const $ = win.$;

```

Eu pego o escopo Javascript windows e jogo em uma variável win e logo em seguida eu pego o jquery que está dentro do windows através da variável win e jogo no $, uma variavel que eu criei para acessar o jQuery.

Sabemos que o próprio jQuery funciona com $, porém ele não reconhece, por isso eu faço essa jogado.

Antes mesmo de criar nosso componente eu configuro nossa conexão:

```sh
// CONECTA NA URL GERADA PELO SERVI�O DO SIGNALR
$.connection.hub.url = "http://signalr.samich.com.br:8080/signalr";

//CRIO UMA CONEXAO COM O HUB CRIADO LA NO C#
const conexao = $.connection.notificacaoHub;

```

Depois que a página é carregada no ionic eu conecto no SignalR e dou join em algum channel de minha escolha que esteja disponível.

```sh
ionViewDidLoad() {
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

```

Isso já é o suficiente para receber as notificações.

Você pode enviar uma notificação desta forma

```sh

enviar() {
    //ATENCAO -> TODOS OS CLIENTES IRÃO VER ESTA NOTIFICACAO
    conexao.server.enviarNotificacao({Titulo: "TESTE PAULO", Mensagem: "DESCONSIDERE ESTA MENSAGEM", TipoNotificacao: "success", CodigoLinhaGPS: "143M"}, "6"); 
  }
  
``` 

#### Observação
Lembre-se o exemplo foi montado baseado no resultado que foi montado pelo o SignalR que estou consumindo, ou seja, o Hub de seu SignalR pode ter outro nome e os métodos de enviar e receber notificações também podem ser diferentes.



# VEJA TAMBÉM
## Cursos baratos!
- [Meus cursos](https://olha.la/udemy)

## Novidades, cupons de descontos e cursos gratuitos
https://olha.la/ilovecode-receber-cupons-novidades

