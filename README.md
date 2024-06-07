<h2> BLOG - API DE BLOG (POSTS E COMENTÁRIOS) </h2>

<h3> Requisitos que foram feitos com sucesso: </h3>

- Autenticação via JWT-Token para rotas pós login do usuário.

- Criação automático do banco de dados.

- Criação das entidades com suas respectivas PK e FK.
  
- CRUD de usuários com deleção em cascata de Post e Comentários deste usuário

- CRUD de postagens com deleção em cascata dos comentários deste Post

- CRUD de comentários.


<h3>Conteúdo:</h3>

API de um Blog que possui o CRUD de Usuários, Postagens e Comentários, com suas respectivas ligações no banco de dados e autenticação do usuário via JWT Token.

Bibliotecas, aplicações e frameworks utilizados:

- NestJS, framework do Node.js, escolhi por sua facilidade de uso e fácil modularidade para organização de cada funcionalidade.
  
- Typeorm escolhido pela sua simplicidade de criação de repositórios e manipulação de dados e objetos para inserção no banco de dados.
  
- PostgreSQL como banco de dados pela sua facilidade de uso.
  
- Nestjs JWT Passport para a criação do token JWT de uma forma fácil de automatizada, também utilizado de forma a identificar que usuário está logado, já que é um token único para cada autenticação.
  
- Class-validator para validação dos requisitos das entidades nos DTOs.

Funcionalidades:

<h2> IMPORTANTE: Antes de rodar o projeto, criar um arquivo .env para a configuração das variáveis de ambientes utilizadas: </h2>
<blockquote>
  
  DB_NAME = "Nome do banco de dados"
    
  DB_USER = "Usuario do banco de dados"
  
  DB_HOST = "Host do banco de dados"
  
  DB_PORT = "Porta que irá rodar o banco de dados"
  
  DB_PASSWORD = "Senha do banco de dados"

  CONFIGURAÇÕES RECOMENDADAS:
  
  DB_NAME = blogDB
  
  DB_USER = postgres
  
  DB_HOST = localhost 
  
  DB_PORT = 5432
  
  DB_PASSWORD = 12345678

</blockquote>


- Para rodar o projeto, primeiramente instalaremos suas dependências:
   <blockquote>
     
  "npm install"
     
  </blockquote>
- Antes de iniciarmos de vez o projeto, utilize o seguinte script para criar o banco de dados, lembre-se de ja possuir seu arquivo .env configurado -
  <blockquote> 
    
  "npm run prestart"
    
  </blockquote>
- Após todo este processo, bastar rodar o projeto e testar as suas funções (na url localhost:3000)
  <blockquote> 
    
  "npm run start:dev"
    
  </blockquote>



  
<h3> Abaixo está listado as rotas e os bodys em JSON (para as requisições que exigem uma inserção do mesmo) de modo que a requisição seja feita com sucesso para cada requisito (e também para dar trigger em cada exceção/validação que foi criada)</h3>

<h3> - <strong> ROTA USUÁRIOS </strong> </h3>

Inicialmente, a rota usuário só poderá utilizar estas seguintes rotas para criação do usuário e sua autenticação:

<h2> ATENÇÃO! AS PRÓXIMAS REQUISIÇÃO SÃO NECESSÁRIAS PARA QUE SE FAÇA A AUTENTICAÇÃO E CRIE UM TOKEN DE AUTORIZAÇÃO PARA AS DEMAIS REQUISIÇÕES, PRIMEIRO FAÇA ELAS NA SEQUENCIA DE CRIAÇÃO DE USUÁRIO / LOGIN </h2>

<h3> - CRIAÇÃO DE USUÁRIO - ROTA - POST localhost:3000/users/createUser </h3>


- ADICIONAR USUÁRIO COM SUCESSO (para dar trigger numa conta que ja foi criada, apenas requisitar o mesmo post com este mesmo email)

{

    "email" : "default@email.com",
    "name" : "John Doe",
    "password" : "12345678"
    
}

<strong> - RETORNO: Retorna mensagem de sucesso com as informações do usuário criado, junto com seu ID. </strong>

- EXCEÇÃO: CAMPO FALTANDO (pode retirar qualquer dos 3 campos)

{

    "name" : "John Doe",
    "password" : "12345678"
    
}

- EXCEÇÃO: EMAIL NO FORMATO ERRADO

{

    "email" : "defaultemail.com",
    "name" : "John Doe",
    "password" : "12345678"
    
}

- EXCEÇÃO: SENHA COM TAMANHO FORA DO RECOMENDADO (6 CARACTERES)

{

    "email" : "default@email.com",
    "name" : "John Doe",
    "password" : "123"
    
}

<strong> - RETORNO: Erro 400 (BAD REQUEST) informando o usuário dos campos faltantes/mal formatados. </strong>

<h3> - LOGIN DE USUÁRIO - ROTA - POST localhost:3000/users/login </h3>


- LOGAR USUÁRIO COM SUCESSO: Insira as credenciais de um usuário já criado no banco de dados

{

    "email" : "default@email.com",
    "password" : "12345678"
    
}

- RETORNO: Retorna o campo access_token com um Token JWT no formato correto para ser inserido no Header.
- EXCEÇÃO: Caso o usuário não exista no banco de dados ou não tenha sua senha e email correspondentes, retornará o erro 401: Unauthorized.

<h2> ATENÇÃO! AS PRÓXIMAS REQUISIÇÃO SÃO NECESSÁRIAS QUE O TOKEN RETORNADO NA AUTENTICAÇÃO COM SUCESSO ESTEJA NO HEADER "Authorization", CASO CONTRÁRIO, O ACESSO SERÁ NEGADO E RETORNARÁ UMA EXCEÇÃO/ERRO 401! </h2>

<h3> USUÁRIOS </h3>

A rota usuários (pós autenticação) possui as seguintes rotas:

<blockquote> 
  
  - GET - LISTAGEM DE TODOS OS USUÁRIOS -"localhost:3000/users" 
  - GET - LISTAGEM DE UM USUÁRIO VIA ID -"localhost:3000/users/_id_do_usuário_"
  - DELETE - DELEÇÃO DE UM USUÁRIO - "localhost:3000/users/deleteUser/_id_do_usuário_"
  - POST - UPDATE DE UM USUÁRIO - "localhost:3000/users/updateUser/_id_do_usuário_"
    
</blockquote>

<h3> - LISTAGEM DE TODOS OS USUÁRIOS - ROTA - GET localhost:3000/users </h3>


- RETORNO: Retorna o todos os usuários no banco de dados com as informações ID, Nome, Email e Senha, em formato de Array [ ].
- EXCEÇÃO: Caso o header Authorization não seja existente, retornara erro 401.
  

<h3> - LISTAGEM DE UM USUÁRIO VIA ID - ROTA - GET localhost:3000/users/_id_do_usuário_ </h3>


- RETORNO: Retorna o usuário com as informações ID,Nome, Email e Senha caso ele exista na base de dados.
- EXCEÇÃO:
  - Retorna uma mensagem de erro 404 caso o usuário não exista.
  - Caso o header Authorization não seja existente, retornara erro 401.

<h3> - DELEÇÃO DE UM USUÁRIO - ROTA - DELETE localhost:3000/users/deleteUser/_id_do_usuário_ </h3>

<h4> ESTA DELEÇÃO É FEITA EM CASCATA, OU SEJA, TODOS OS POSTS E COMENTÁRIOS QUE ESTIVEREM ATRELADOS E ESTE USUÁRIO VIA FOREIGN KEY SERÃO DELETADOS TAMBÉM </h4>

<h4> IMPORTANTE: Para a deleção ocorrer corretamente, o usuário logado precisa ser o dono da conta, ou seja, o token de autorização no header precisa ser correspondente ao token do usuário que é dono da conta do ID inserido, se estiver em outra conta, chame a rota login novamente com as credenciais do usuário que deseja manipular e mude o token retornado no Header</h4>

- RETORNO: Retorna mensagem de sucesso com o usuário que foi deletado.
- EXCEÇÕES:
  - Retorna uma mensagem de erro 404 caso o usuário não exista.
  - Retorna uma mensagem de erro 400 caso um usuário diferente do dono da conta tente deletar.
  - Caso o header Authorization não seja existente, retornara erro 401.

<h3> - ATUALIZAÇÃO DE UM USUÁRIO - ROTA - PUT localhost:3000/users/updateUser/_id_do_usuário_ </h3>

<h4> IMPORTANTE: Para a atualização ocorrer corretamente, o usuário logado precisa ser o dono da conta, ou seja, o token de autorização no header precisa ser correspondente ao token do usuário que é dono da conta do ID inserido, se estiver em outra conta, chame a rota login novamente com as credenciais do usuário que deseja manipular e mude o token retornado no Header</h4>

- BODY DE REQUISIÇÃO TESTE:  você pode atualizar qualquer campo que julgue necessário, podendo deixar qualquer um vazio, lembre-se que estes campos ainda passam pelas validações necessárias.
  
{

    "email" : "default2@email.com",
    "password" : "12345678"
    
}

- RETORNO: Retorna mensagem de sucesso com o usuário atualizado com suas informações novas
- EXCEÇÕES:
  - Retorna uma mensagem de erro 404 caso o usuário não exista.
  - Retorna uma mensagem de erro 400 caso um usuário diferente do dono da conta tente atualizar.
  - Caso o header Authorization não seja existente, retornara erro 401.
 

<h3> POSTAGENS </h3>

A rota postagens (pós autenticação) possui as seguintes rotas:

<blockquote> 

  - GET - LISTAGEM DE TODAS AS POSTAGENS -"localhost:3000/posts"
  - GET - LISTAGEM DE UMA POSTAGEM VIA ID -"localhost:3000/posts/_id_do_posts_"
  - POST - CRIAÇÃO DE UMA POSTAGEM - "localhost:3000/posts/createPost"
  - DELETE - DELEÇÃO DE UMA POSTAGEM - "localhost:3000/users/deletePost/_id_do_post_"
  - POST - UPDATE DE UMA POSTAGEM - "localhost:3000/users/updatePost/_id_do_post_"
    
</blockquote>

<h3> - CRIAÇÃO DE UMA POSTAGEM - ROTA - POST - localhost:3000/posts/createPost </h3>


{

    "title" : "Default Title",
    "description" : "Default Description",
    
}

- RETORNO: Retorna mensagem de sucesso com a postagem criada e suas informações.
- EXCEÇÕES:
  - Caso houver algum campo faltante, retornará mensagem alertando isto.
  - Caso o header Authorization não seja existente, retornara erro 401.


<h3> - LISTAGEM DE TODAS AS POSTAGENS - ROTA - GET localhost:3000/posts </h3>


- RETORNO: Retorna o todas postagens no banco de dados com as informações ID, ID do criador do Post (e suas informações), Título e Descrição, em formato de Array [ ].
- EXCEÇÃO: Caso o header Authorization não seja existente, retornara erro 401.
  

<h3> - LISTAGEM DE UM POST VIA ID - ROTA - GET localhost:3000/posts/_id_do_post_ </h3>


- RETORNO: Retorna o post com as informações ID, ID do criador do Post (e suas informações), Título e Descrição caso ele exista na base de dados.
- EXCEÇÃO:
  - Retorna uma mensagem de erro 404 caso o post não exista.
  - Caso o header Authorization não seja existente, retornara erro 401.

<h3> - DELEÇÃO DE UM POST - ROTA - DELETE localhost:3000/posts/deletePost/_id_do_post_ </h3>

<h4> ESTA DELEÇÃO É FEITA EM CASCATA, OU SEJA, TODOS OS COMENTÁRIOS QUE ESTIVEREM ATRELADOS E ESTE POST VIA FOREIGN KEY SERÃO DELETADOS TAMBÉM </h4>

<h4> IMPORTANTE: Para a deleção ocorrer corretamente, o usuário logado precisa ser o dono do post (o ID do usuário criador do post está como FOREIGN KEY na postagem) , ou seja, o token de autorização no header precisa ser correspondente ao token do usuário que é dono do post do ID inserido, se estiver em outra conta, chame a rota login novamente com as credenciais do usuário que é dono do post e mude o token retornado no Header</h4>

- RETORNO: Retorna mensagem de sucesso com o post que foi deletado.
- EXCEÇÕES:
  - Retorna uma mensagem de erro 404 caso o post não exista.
  - Retorna uma mensagem de erro 400 caso um usuário diferente do dono do post tente deletar.
  - Caso o header Authorization não seja existente, retornara erro 401.

<h3> - ATUALIZAÇÃO DE UM POST - ROTA - PUT localhost:3000/posts/updatePost/_id_do_post_ </h3>

<h4> IMPORTANTE: Para a atualização ocorrer corretamente, o usuário logado precisa ser o dono do post (o ID do usuário criador do post está como FOREIGN KEY na postagem), ou seja, o token de autorização no header precisa ser correspondente ao token do usuário que é dono do post do ID inserido, se estiver em outra conta, chame a rota login novamente com as credenciais do usuário que é dono do post e mude o token retornado no Header</h4>

- BODY DE REQUISIÇÃO TESTE:  você pode atualizar qualquer campo que julgue necessário, podendo deixar qualquer um vazio, lembre-se que estes campos ainda passam pelas validações necessárias.
  
{

    "title" : "Default Title 2",
    "description" : "Default Description",
    
}

- RETORNO: Retorna mensagem de sucesso com o post atualizado com suas informações novas
- EXCEÇÕES:
  - Retorna uma mensagem de erro 404 caso o post não exista.
  - Retorna uma mensagem de erro 400 caso um usuário diferente do dono da conta tente atualizar.
  - Caso o header Authorization não seja existente, retornara erro 401.
 

<h3> COMENTÁRIOS </h3>

A rota comentários (pós autenticação) possui as seguintes rotas:

<blockquote> 

  - GET - LISTAGEM DE TODOS COMENTÁRIOS -"localhost:3000/comments"
  - GET - LISTAGEM DE UM COMENTÁRIO VIA ID -"localhost:3000/comments/_id_do_comentário_"
  - POST - CRIAÇÃO DE UM COMENTÁRIO - "localhost:3000/comments/createComment/_id_do_post"
  - DELETE - DELEÇÃO DE UM COMENTÁRIO - "localhost:3000/comments/deleteComment/_id_do_comentário_"
  - POST - UPDATE DE UM COMENTÁRIO - "localhost:3000/comments/updateComment/_id_do_comentário_"
    
</blockquote>

<h3> - ADICIONAR COMENTÁRIO - ROTA - POST localhost:3000/comments/createComment/_id_do_post </h3>

<h4> PARA ADICIONAR COMENTÁRIO AO POST, LEMBRE-SE DE ADICIONAR O ID DO POST QUE DESEJA ADICIONAR O COMENTÁRIO, RECOMENDO UTILIZAR DA ROTA GET DA POSTAGEM PARA RETORNAR TODOS OS POSTS E VER SEUS IDS </h4>

{

    "description" : "Default Description",
    
}

- RETORNO: Retorna mensagem de sucesso com o comentário criado e suas informações.
- EXCEÇÕES:
  - Caso não houver nenhuma postagem com o ID inserido, retornará mensagem alertando isto e um erro 404.
  - Caso houver algum campo faltante, retornará mensagem alertando isto.
  - Caso o header Authorization não seja existente, retornara erro 401.


<h3> - LISTAGEM DE TODOS OS COMENTÁRIOS - ROTA - GET localhost:3000/comments </h3>


- RETORNO: Retorna o todas postagens no banco de dados com as informações ID, ID do criador do Post (e suas informações), ID do Post (E suas informações) e Descrição do comentário, em formato de Array [ ].
- EXCEÇÃO: Caso o header Authorization não seja existente, retornara erro 401.
  

<h3> - LISTAGEM DE UM COMENTÁRIO VIA ID - ROTA - GET localhost:3000/comments/_id_do_comentário_ </h3>


- RETORNO: Retorna o usuário com as informações ID, ID do criador do Post (e suas informações), ID do Post (E suas informações) e Descrição do comentário caso ele exista na base de dados.
- EXCEÇÃO:
  - Retorna uma mensagem de erro 404 caso o comentário não exista.
  - Caso o header Authorization não seja existente, retornara erro 401.

<h3> - DELEÇÃO DE UM COMENTÁRIO - ROTA - GET localhost:3000/comments/deleteComment/_id_do_comentário_ </h3>


<h4> IMPORTANTE: Para a deleção ocorrer corretamente, o usuário logado precisa ser o dono do post OU do comentário (o ID do usuário criador do post está como FOREIGN KEY na postagem e o ID do usuário criador do comentário está como FOREIGN KEY no comentário) , ou seja, o token de autorização no header precisa ser correspondente ao token do usuário que é dono do post do ID inserido ou dono do comentário, se estiver em outra conta, chame a rota login novamente com as credenciais do usuário que é dono do post o do comentário e mude o token retornado no Header</h4>

- RETORNO: Retorna mensagem de sucesso com o comentário que foi deletado.
- EXCEÇÕES:
  - Retorna uma mensagem de erro 404 caso o comentário não exista.
  - Retorna uma mensagem de erro 400 caso um usuário diferente do dono do post ou do comentário tente deletar.
  - Caso o header Authorization não seja existente, retornara erro 401.

<h3> - ATUALIZAÇÃO DE UM COMENTÁRIO - ROTA - PUT localhost:3000/comments/updateComment/_id_do_comentário_ </h3>

<h4> IMPORTANTE: Para a atualização ocorrer corretamente, o usuário logado precisa ser o dono do post OU do comentário (o ID do usuário criador do post está como FOREIGN KEY na postagem e o ID do usuário criador do comentário está como FOREIGN KEY no comentário) , ou seja, o token de autorização no header precisa ser correspondente ao token do usuário que é dono do post do ID inserido ou dono do comentário, se estiver em outra conta, chame a rota login novamente com as credenciais do usuário que é dono do post ou do comentário e mude o token retornado no Header</h4>

- BODY DE REQUISIÇÃO TESTE:  você pode atualizar qualquer campo que julgue necessário, podendo deixar qualquer um vazio, lembre-se que estes campos ainda passam pelas validações necessárias.
  
{

    "title" : "Default Title 2",
  
    
}

- RETORNO: Retorna mensagem de sucesso com o comentário atualizado com suas informações novas
- EXCEÇÕES:
  - Retorna uma mensagem de erro 404 caso o comentário não exista.
  - Retorna uma mensagem de erro 400 caso um usuário diferente do dono da conta tente atualizar.
  - Caso o header Authorization não seja existente, retornara erro 401.
  


  
