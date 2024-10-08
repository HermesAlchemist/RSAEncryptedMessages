# **RSA Encrypted Messages / Um Teste de RSA**

**RSA Encrypted Messages** é uma aplicação web desenvolvida em Next.js que permite aos usuários gerar chaves RSA, criptografar e descriptografar mensagens. O projeto foi criado com o intuito de explorar e demonstrar o funcionamento do algoritmo RSA de criptografia assimétrica.

---

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)
- [Agradecimentos](#agradecimentos)
- [Notas Adicionais](#notas-adicionais)
- [Desenvolvimento Futuro](#desenvolvimento-futuro)
- [Troubleshooting](#troubleshooting)
- [Imagens do Projeto](#imagens-do-projeto)
- [Observações](#observações)
- [Fim do Documento](#fim-do-documento)

---

## Visão Geral

O **GH Msg** oferece uma interface intuitiva para geração de chaves RSA, permitindo aos usuários:

- Gerar novas chaves públicas e privadas.
- Inserir chaves existentes manualmente.
- Salvar e carregar chaves do banco de dados.
- Criptografar mensagens usando a chave pública.
- Descriptografar mensagens usando a chave privada.
- Excluir chaves armazenadas no banco de dados.

---

## Funcionalidades

- **Autenticação de Usuário**: Proteção por senha para acesso às funcionalidades da aplicação.
- **Geração de Chaves RSA**: Os usuários podem gerar chaves de diferentes tamanhos.
- **Inserção Manual de Chaves**: Permite a inserção de chaves públicas e privadas existentes.
- **Gerenciamento de Chaves**:
  - **Salvar Chaves**: Armazenar chaves no banco de dados para uso futuro.
  - **Carregar Chaves**: Listar e carregar chaves armazenadas.
  - **Excluir Chaves**: Remover chaves do banco de dados quando não forem mais necessárias.
- **Criptografia de Mensagens**: Criptografa mensagens usando a chave pública.
- **Descriptografia de Mensagens**: Descriptografa mensagens usando a chave privada.
- **Interface Amigável**: Design limpo e responsivo para melhor experiência do usuário.
- **Footer Profissional**: Inclui um rodapé com informações de direitos autorais.

---

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento web.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **JavaScript (ES6+)**: Linguagem de programação principal.
- **CSS Inline Styling**: Estilização dos componentes diretamente nos elementos.
- **Node.js**: Ambiente de execução para o backend.
- **API Routes do Next.js**: Para criação de rotas de API.
- **SQLite**: Banco de dados leve para armazenamento das chaves.
- **Criptografia RSA**: Implementação do algoritmo RSA para criptografia e descriptografia.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 14 ou superior)
- **NPM** (gerenciador de pacotes do Node.js)

---

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/HermesAlchemist/RSAEncryptedMessages.git
   ```

2. **Navegue até o diretório do projeto**:

   ```bash
   cd "raiz do projeto"
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```

---

## Uso

### Executando o Projeto Localmente

1. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

2. **Acesse o aplicativo no navegador**:

   Abra `http://localhost:3000` para ver o aplicativo.

### Interagindo com a Aplicação

#### 1. **Cadastrar Senha**

- Ao acessar pela primeira vez, cadastre uma senha para proteger o acesso à aplicação.

#### 2. **Autenticação**

- Faça login utilizando a senha cadastrada para acessar as funcionalidades.

#### 3. **Obter Chave**

- **Gerar Nova Chave**:
  - Escolha o tamanho da chave (em bits).
  - Clique em "Gerar Chaves".
  - As chaves pública e privada serão exibidas.
  - **Salvar Chave no Banco de Dados** (opcional):
    - Clique em "Salvar Chave no Banco de Dados" para armazenar a chave pública e privada.

- **Inserir Chave Existente**:
  - Insira os valores de `e`, `n` para a chave pública.
  - Insira os valores de `d`, `n` para a chave privada.
  - Clique em "Usar Chaves Inseridas".

- **Carregar Chave do Banco de Dados**:
  - Clique em "Listar Chaves do Banco de Dados".
  - Selecione uma chave da lista e clique em "Usar esta Chave".
  - **Excluir Chave** (opcional):
    - Clique em "Excluir esta Chave" para remover a chave do banco de dados.

#### 4. **Criptografar Mensagem**

- Insira a mensagem que deseja criptografar.
- Clique em "Criptografar".
- A mensagem criptografada será exibida.

#### 5. **Descriptografar Mensagem**

- Insira a mensagem criptografada.
- Clique em "Descriptografar".
- A mensagem original será exibida.

---

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

### Passos para contribuir:

1. **Faça um fork do projeto**.

   No GitHub, clique em "Fork" no canto superior direito da página do repositório.

2. **Clone o repositório forkado**:

   ```bash
   git clone https://github.com/HermesAlchemist/RSAEncryptedMessages.git
   ```

3. **Crie uma nova branch**:

   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

4. **Commit suas mudanças**:

   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```

5. **Envie para o seu fork no GitHub**:

   ```bash
   git push origin feature/nova-funcionalidade
   ```

6. **Abra um pull request**:

   - No GitHub, vá até o seu fork e clique em "Compare & Pull Request".

---

## Licença

OpenSource

---

## Contato

- **Nome**: Heitor Magalhães Lemos
- **Email**: heitorlemos@gmail.com
- **GitHub**: [HermesAlchemist](https://github.com/HermesAlchemist)

---

## Agradecimentos

Agradeço a todos os colaboradores e usuários que ajudam a melhorar o **RSA Encrypted Messages**.

---

## Notas Adicionais

- **Segurança**:
  - As chaves privadas são informações sensíveis. Recomenda-se não armazená-las em locais públicos ou compartilhados.
  - O aplicativo permite a exclusão de chaves do banco de dados para maior segurança.
- **Uso Educacional**:
  - Este projeto foi desenvolvido com fins educacionais para demonstrar o funcionamento do algoritmo RSA.
  - Não deve ser utilizado em ambientes de produção ou para fins que exijam alto nível de segurança criptográfica.

---

## Desenvolvimento Futuro

- **Melhorias na Segurança**:
  - Implementar hashing de senhas e armazenamento seguro.
  - Remover o armazenamento de chaves privadas no banco de dados.
- **Interface de Usuário**:
  - Melhorar a responsividade para dispositivos móveis.
  - Implementar temas claros e escuros.
- **Funcionalidades Adicionais**:
  - Permitir exportação e importação de chaves em formatos padrão.
  - Adicionar suporte a outros algoritmos de criptografia.

---

## Troubleshooting

Se você encontrar problemas ao executar o aplicativo, tente as seguintes etapas:

- **Erro ao Instalar Dependências**:
  - Certifique-se de que está utilizando a versão correta do Node.js e NPM.
  - Exclua a pasta `node_modules` e o arquivo `package-lock.json`, e execute `npm install` novamente.
- **Porta em Uso**:
  - Se a porta 3000 já estiver em uso, especifique uma porta diferente ao iniciar o servidor:
    ```bash
    npm run dev -- -p 3001
    ```
- **Problemas com a Autenticação**:
  - Certifique-se de que o backend está funcionando corretamente.
  - Verifique se as rotas de API estão configuradas corretamente.

---

## Observações

- Este projeto foi desenvolvido para fins de aprendizado e demonstração.
- Não nos responsabilizamos por quaisquer perdas ou danos decorrentes do uso deste aplicativo.

---

## Fim do Documento

Obrigado por utilizar o **RSA Encrypted Messages**!
```