<h1 align="center">
  SUPPORT-CHAT-SOCKET-IO
</h1>

<h3 align="center">
  Simulação de um chat de suporte em tempo real com socket.io
</h3>

---

## Sobre o projeto
Este projeto foi construído durante a quinta edição do evento nlw promovido pela Rocketseat, o mesmo busca simular um sistema de chat de suporte onde o cliente e o atendente podem trocar mensagens em tempo real.

Além das funcionalidades de de envio e troca de mensagens, é possível cadastrar usuários, tanto de forma prévia como no ato do envio de uma mensagem, criar e editar as configurações desse usuário, o que permite habilitar e desabilitar o chat com o suporte.

Ha três pastas na riz do projeto, a pasta client armazena arquivos .http que documentam as rotas da api e podem ser usadas para testar as mesmas, a pasta src armazena todos os dados do servidor, por fim a pasta web armazena os arquivos das páginas web usadas para interagir com o servidor, os arquivos css e html da pasta web foram fornecidos pelos organizadores do evento.

## Get Started
Para executar o projeto siga as instruções descritas abaixo

- Acesse a pasta do projeto por meio do terminal
- Execute o comando `yarn install` para instalar as dependências do projeto
- Execute o comando `yarn typeorm migration:run` para criar a base de dados
- Execute o comando `yarn dev` para iniciar o projeto
- Acesse as páginas [http://localhost:3333/pages/client](http://localhost:3333/pages/client) ou [http://localhost:3333/pages/admin](http://localhost:3333/pages/admin) para ter acesso as visões de cliente e administrados respetivamente

## Testando as rotas da api
Você pode realizar os testes das rotas rest deste projeto usando qualquer ferramenta de sua preferência. Caso esteja usando a IDE VsCode, pode instalar a extensão REST Client e realizar as consultas diretamente de sua IDE utilizando os arquivos .http fornecidos no diretório client do projeto.

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

by Mauricio Redmerski André
