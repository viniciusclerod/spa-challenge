# Desafio Arquiteto Frontend

<!-- Atuar como arquiteto de frontend exige também habilidades técnicas para que novas soluções possam ser validadas, antes de seguirem para produção.
Esse desafio busca trazer uma necessidade técnica que precisa ser solucionada, e precisamos validar uma ideia antes de implementá-la no sistema. -->

## Problema 1:
O que precisamos é uma solução para melhorar a performance no filtro de um campo de busca, o servidor é lento e precisamos diminuir a quantidade de requisições feitas pela aplicação enquanto o usuário está digitando no input.

Essa solução precisa atender os seguintes critérios:

- Precisa utilizar React.
- Precisa utilizar RXJS para controle do input e da requisição.
- Precisa que esse input seja testado utilizando testing-library.

Simule a resposta do servidor

### Solução:

1. Através de um Custom Hook **useDebounceInput(time, defaultValue)** é possível desacoplar a lógica da digitação, sendo possível aplicar o mesmo comportamento a outros _inputs_. Para esse hook, foi utilizado o padrão de projeto _Observer_ com arquitetura _Pipe and Filter_, dentro do paradigma da Programação Reativa com RxJS. Assim, é possível criar _streams_ de dados a partir do objeto _observable$_, bem como realizar o mapeamento do evento do input para valor, configurar um tempo de _debouce_, e considerar somente novos valores. O estado do valor a ser considerado é controlado a partir do React Hook _useState()_, e assinatura/desassinatura do _subject_ é controlada a partir do React Hook _useEffect()_, levando em consideração também alterações de tempo do _debouce_.

2. O componente **InputSearch** possui a lógica _onChange_ desacoplada, bem como o comportamento de _loading_ quando definido verdadeiro. Já  o componente **Results** recebe os dados dos usuários a serem exibidos e, através de uma função de mapeamento, retorna uma lista de nomes e sobrenomes mapeados pelo id, bem como exibe a mensagem adequada quando não há dados a serem listados.

3. O componente **Search** é responsável pela manipulação da lógica, bem como configuração das propriedades dos componentes filhos. Sendo assim, a cada mudança realizada ao digitar do _input_ de busca, é disparado o evento de alteração de termos de busca, gerenciado assim o stream de dados pelo hook _useDebounceInput()_, que considera o intervalo de tempo entre o digitar dos caracteres, quando resolvido (acima de 800ms), o estado dos termos de busca são alterados para o ultimo da fila de mudanças; disparando assim o hook de efeito, que irá realizar requisição para o servidor (nesse caso representado pelo serviço _mock_ **UserService**), bem como controlar o estado de carregamento, e atualizar a lista de dados de usuários que considera o filtro da busca.

4. Todos os componentes (App, Search, InputSearch e Results) possuem testes escritos através da biblioteca **testing-library**, verificando tanto a carga do componente, quando as reespectivas interfaces (_props_). No caso do Custom Hook (useDebounceInput), que também possui suite de teste, foram levados em consideração a interface do _hook_, as respostas, o tempo, e o enfileiramento de valores. Uma observação especial aos testes de componentes, é que, eles estão considerando o carregamento dinâmico bem como suspenção dos mesmos.

## Problema 2:
Em um sistema SPA, os arquivos de script costumam ficar muito grandes, e precisamos que a primeira tela do sistema carregue mais rapidamente.
Não é possível fazer um SSR, precisamos controlar tudo no lado do cliente. 

Essa solução precisa atender os seguintes critérios:

- Precisa utilizar React.
- Precisa melhorar a forma como a aplicação consome os scripts, diminuindo o tamanho dos arquivos.

### Solução:

1. Como não pode ser considerado SSR/SSG, apenas assets interpretados pelo lado browser, o projeto leva em consideração o CRA (Create React App) como estrutura base, em contraponto do Next.js e Gatsby. Assim, serão gerados todos os assets em estrutura SPA dentro de uma pasta de _build_. Os mesmos são minificados objetivando a redução do tamanho dos arquivos, assim como todos os outros _assets_ são otimizados, buscando o mesmo objetivo. Dentre outras alternativas podemos citar uma configuração customizada com [webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/), [Parcel](https://parceljs.org/), [Brunch](https://github.com/brunch/terser-brunch) ou [Browserify](http://browserify.org/).

2. Há dois fatores extremamente importantes que precisam ser considerados durante a programação. O primeiro é o que chamamos de Divisão de Código (_Code Splitting_), tendo em vista que a maioria das aplicações são empacotadas (_bundling_) através de ferramentas, estes mesmos consideram a distribuição de pacotes através dos exports/imports na geração dos arquivos de _build_, sendo assim, é extremamante importante que o código mantenha sempre um baixo acomplamento e uma alta coesão. O segundo fator são as importações dinâmicas (_Lazy loading_), que considera um carregamento do tipo promessa, quando este é realizado pela primeira vez, é armazenado em uma instãncia referente ao componente, e renderizado dentro de um outro componente (_Suspense_) que controla o carregamento dinâmico enquanto exibe um conteúdo provisório (através da propriedade _fallback_). Assim, a combinação desses dois fatores impactam diretamente no carregamento dos scripts tanto no aspecto da concorrência (através do carregamento dinâmico) quanto pela geração de várias pequenas _builds_ otimizadas e carregadas sob demanda (através do comando `yarn build`), em contraponto de outras aplicações que empacotam em uma única _fat build_.

3. Outros pequenos fatores que foram levados em consideração, e que também impactam nos tamanhos da build são: JavaScript Pure Functions, Function/Stateless Components, Hooks, Fragments, Debouncing Events, key maps e Spreading props. Outras técnicas que poderiam ser utilizadas são: Reselect com Redux e Memoize React Components.

<!-- Entregue essas provas de conceito em um repositório do git, no README escreva como foi feito a resolução dos problemas. -->
