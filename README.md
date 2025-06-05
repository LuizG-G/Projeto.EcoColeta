# Projeto EcoFG 🌿

## Descrição

O Projeto EcoFG é uma interface web front-end desenvolvida para promover a conscientização ecológica e facilitar o cálculo de valores de materiais recicláveis. A plataforma inclui funcionalidades de autenticação de usuário (simuladas, prontas para integração com backend), uma calculadora de reciclagem, dicas ecológicas e informações interativas sobre coleta seletiva.

Este projeto foi estruturado com HTML, CSS e JavaScript puros, com foco na separação de responsabilidades e organização de arquivos para facilitar a manutenção e futuras integrações, como a implementação de um banco de dados e API.

## Funcionalidades Implementadas (Front-end)

* **Autenticação de Usuário:**
    * Tela de Login (`login.html`)
    * Tela de Cadastro (`cadastro.html`)
    * Tela de Recuperação de Senha (`recuperar-senha.html`)
    * Tela de Definição de Nova Senha (`nova-senha.html`)
    * *Observação: Atualmente, a autenticação é simulada no front-end e está pronta para ser conectada a um backend.*
* **Página Principal (`tela-principal.html`):**
    * Navegação intuitiva entre seções e páginas.
    * **Calculadora de Reciclagem:** Permite ao usuário selecionar um tipo de material e inserir a quantidade em kg para obter um valor estimado.
    * **Dicas Ecológicas:** Seção com informações e dicas para práticas sustentáveis.
    * **Lixeiras da Coleta Seletiva Interativas:** Exibe as lixeiras padrão da coleta seletiva e, ao passar o mouse, informa quais materiais devem ser descartados em cada uma.
* **Design Responsivo:** Interface adaptada para visualização em diferentes tamanhos de tela (desktop, tablets e mobile).
* **Código Organizado:** HTML, CSS e JavaScript separados em arquivos e pastas dedicadas para melhor manutenibilidade.

## Tecnologias Utilizadas

* HTML5 (Estrutura semântica)
* CSS3 (Estilização, Flexbox, Grid, Transições, Responsividade)
* JavaScript (ES6+) (Manipulação do DOM, tratamento de eventos, lógica de formulários e cálculos)

## Estrutura de Arquivos do Projeto

/ (raiz do projeto)
├── login.html
├── cadastro.html
├── recuperar-senha.html
├── nova-senha.html
├── tela-principal.html
│
├── css/
│   ├── login.css
│   ├── cadastro.css
│   ├── recuperar-senha.css
│   ├── nova-senha.css
│   └── principal.css
│
└── js/
    ├── login.js
    ├── cadastro.js
    ├── recuperar-senha.js
    ├── nova-senha.js
    └── principal.js

## Como Executar o Projeto (Front-end)

1.  Clone este repositório ou baixe os arquivos.
2.  Certifique-se de que todos os arquivos e pastas estejam na estrutura descrita acima.
3.  Abra qualquer um dos arquivos `.html` (por exemplo, `tela-principal.html` ou `login.html`) diretamente em um navegador web moderno (Chrome, Firefox, Edge, etc.).

## Próximos Passos (Integração com Backend)

Este front-end está preparado para a integração com uma API e um banco de dados. As seguintes áreas são pontos chave para a implementação do backend:

* **Autenticação de Usuários:** Os formulários de login, cadastro, recuperação de senha e definição de nova senha precisarão ser conectados a endpoints de API para:
    * Validar credenciais de usuários.
    * Registrar novos usuários no banco de dados.
    * Gerenciar o processo de recuperação de senha (ex: envio de tokens por e-mail, validação de tokens).
    * Atualizar senhas no banco de dados.
    * Atualmente, os dados de usuário e a lógica de validação são simulados nos arquivos `.js` correspondentes (ex: `js/login.js`).
* **Calculadora de Reciclagem:** Os valores por kg dos materiais recicláveis estão atualmente fixos no `js/principal.js`. Estes poderiam ser obtidos de um banco de dados através de uma API para permitir atualizações dinâmicas.
* **Persistência de Dados:** Outras informações, como dicas ecológicas, poderiam ser gerenciadas através de um CMS ou banco de dados e carregadas via API.

---
