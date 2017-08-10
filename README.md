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
exemplos\src\assets\_js
