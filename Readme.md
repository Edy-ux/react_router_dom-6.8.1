



## Pontuações

- Observe o `:contactId` segmento de URL na sub rota /concact. Os dois pontos (:) têm um significado especial, tornando-o um "segmento dinâmico". Os segmentos dinâmicos corresponderão aos valores dinâmicos (mutáveis) nessa posição do URL, como o ID do contato. Chamamos esses valores na URL de "Parâmetros de URL" ou apenas "params" para abreviar.

😅 Ainda estou confuso por que tudo isso funciona

Quando o usuário clica no botão enviar:

1. <Form>impede o comportamento padrão do navegador de enviar uma nova solicitação POST ao servidor, mas, em vez disso, emula o navegador criando uma solicitação POST com roteamento do lado do cliente

2.  O <Form action="destroy">corresponde à nova rota "contacts/:contactId/destroy"e envia a solicitação.

3.  Após o redirecionamento da ação, o React Router chama todos os carregadores para os dados na página para obter os valores mais recentes (isso é "revalidação"). useLoaderDataretorna novos valores e faz com que os componentes sejam atualizados!

## Dependecias 

- match-sorter - npm: 


## Definições

URL - O URL na barra de endereço. Muitas pessoas usam o termo "URL" e "rota" de forma intercambiável, mas esta não é uma rota no React Router, é apenas uma URL.

Localização - Este é um objeto específico do React Router baseado nowindow.locationobjeto do navegador integrado. Representa "onde o usuário está". É principalmente uma representação de objeto da URL, mas tem um pouco mais do que isso.

Estado do local - Um valor que persiste com um local que não está codificado na URL . Muito parecido com hash ou parâmetros de pesquisa (dados codificados na URL), mas armazenados de forma invisível na memória do navegador.

Pilha de Histórico - À medida que o usuário navega, o navegador rastreia cada local em uma pilha. Se você clicar e segurar o botão Voltar em um navegador, poderá ver a pilha de histórico do navegador ali mesmo.

Roteamento do lado do cliente (CSR) - Um documento HTML simples pode ser vinculado a outros documentos e o navegador lida com a própria pilha de histórico . O roteamento do lado do cliente permite que os desenvolvedores manipulem a pilha de histórico do navegador sem fazer uma solicitação de documento ao servidor.

History - Um objeto que permite que o React Router assine alterações na URL , além de fornecer APIs para manipular a pilha de histórico do navegador programaticamente.

**Ação do histórico** - Um dosPOP,PUSHouREPLACE. Os usuários podem chegar a um URL por um desses três motivos. Um push quando uma nova entrada é adicionada à pilha do histórico (normalmente um clique no link ou o programador forçou uma navegação). Uma substituição é semelhante, exceto que substitui a entrada atual na pilha em vez de inserir uma nova. Por fim, um pop acontece quando o usuário clica nos botões Voltar ou Avançar no Chrome do navegador.

Segmento - As partes de um URL ou padrão de caminho entre os/caracteres. Por exemplo, "/users/123" tem dois segmentos.

**Padrão de caminho** - Parecem URLs, mas podem ter caracteres especiais para corresponder URLs a rotas, como segmentos dinâmicos ("/users/:userId") ou segmentos em estrela ("/docs/*"). Eles não são URLs, são padrões que o React Router irá corresponder.

Segmento dinâmico - Um segmento de um padrão de caminho que é dinâmico, o que significa que pode corresponder a qualquer valor no segmento. Por exemplo, o padrão/users/:userIdcorresponderá a URLs como/users/123

Parâmetros de URL — Os valores analisados ​​do URL que correspondem a um segmento dinâmico .

Roteador - Componente stateful de nível superior que faz com que todos os outros componentes e ganchos funcionem.

Route Config - Uma árvore de objetos de rotas que serão classificados e combinados (com aninhamento) em relação ao local atual para criar uma ramificação de correspondências de rota .

Rota - Um objeto ou elemento de rota geralmente com uma forma de{ path, element }ou<Route path element>. Opathé um padrão de caminho. Quando o padrão de caminho corresponder ao URL atual, o elemento será renderizado.

Elemento de Rota - Ou<Route>. As props deste elemento são lidas para criar uma rota por<Routes>, mas não fazem nada.

Rotas aninhadas - como as rotas podem ter filhos e cada rota define uma parte da URL por meio de segmentos , uma única URL pode corresponder a várias rotas em uma "ramificação" aninhada da árvore. Isso permite o aninhamento automático de layout por meio de outlet , links relativos e muito mais.

Links relativos - Os links que não começam com/herdarão a rota mais próxima na qual são renderizados. Isso facilita o link para URLs mais profundos sem a necessidade de conhecer e criar todo o caminho.

Match - Um objeto que contém informações quando uma rota corresponde à URL, como os parâmetros de url e o nome do caminho correspondentes.

Correspondências - Uma matriz de rotas (ou ramificação da configuração de rota ) que corresponde ao local atual . Essa estrutura permite rotas aninhadas .

Rota principal - Uma rota com rotas secundárias.

Outlet —Um componente que renderiza a próxima correspondência em um conjunto de correspondências .

Rota de índice - Uma rota filha sem caminho que renderiza na saída do pai no URL do pai .

Rota de Layout - Uma rota pai sem caminho, usada exclusivamente para agrupar rotas filhas dentro de um layout específico.