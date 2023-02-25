



## Pontuações

- Observe o `:contactId` segmento de URL na sub rota /concact. Os dois pontos (:) têm um significado especial, tornando-o um "segmento dinâmico". Os segmentos dinâmicos corresponderão aos valores dinâmicos (mutáveis) nessa posição do URL, como o ID do contato. Chamamos esses valores na URL de "Parâmetros de URL" ou apenas "params" para abreviar.

😅 Ainda estou confuso por que tudo isso funciona

Quando o usuário clica no botão enviar:

1. <Form>impede o comportamento padrão do navegador de enviar uma nova solicitação POST ao servidor, mas, em vez disso, emula o navegador criando uma solicitação POST com roteamento do lado do cliente

2.  O <Form action="destroy">corresponde à nova rota "contacts/:contactId/destroy"e envia a solicitação.

3.  Após o redirecionamento da ação, o React Router chama todos os carregadores para os dados na página para obter os valores mais recentes (isso é "revalidação"). useLoaderDataretorna novos valores e faz com que os componentes sejam atualizados!
