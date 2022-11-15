![Alt text](https://i.imgur.com/rbl7Cam.png)

Olá,
Meu nome é Yago Aguiar e falarei nesse read me um pouco sobre mim e sobre essa aplicação. Caso queira apenas saber como utiliza-la ou até mesmo como
avalia-la, siga para a seção "Como usar:".

Quem sou eu:
Meu nome é Yago Aguiar, tinha 28 anos quando desenvolvi essa aplicação (2021), sou Mineiro, mas hoje moro no Rio de Janeiro junto com minha esposa. Sou formado em engenharia mecatrônica pela PUC-MG (2016) e na faculdade conheci um pouco sobre a programação que foi onde eu me apaixonei pela área, mas naquela época ainda não segui carreira, pois voltei pra minha cidade natal após formar para ajudar minha mãe com negócios da família. Em 2019, resolvi comprar alguns cursos da Udemy e seguir forte nessa área de TI, que era o que eu realmente queria. Hoje, estou cursando uma segunda graduação (Ciências da computação) pela UNIP EAD e trabalho como desenvolvedor back-end júnior pela FalifeTec (2022).

Minha motivação para desenvolver essa aplicação:
Desenvolvi essa aplicação web com dois propósitos. O primeiro foi de treinar, fixar e agrupar em um projeto próprio, o conteúdo do curso de javascript/typescript que fiz em 2021 na plataforma da Udemy, lecionado pelo professor Luiz Otávio. O segundo propósito foi de desenvolver uma aplicação web que atende-se as necessidades da minha esposa (fotógrafa) para que ela se livrasse da agenda física e passasse a usar a aplicação como uma agenda onde ela poderia acessa-la até mesmo pelo celular pela web.

Como usar:
Existem duas formas para avaliação da aplicação.

Opção 1:
- A aplicação encontra-se rodando em uma instância AWS no seguinte endereço: http://54.207.137.71/
- Voce pode logar com as credenciais abaixo: 
    usuário: adm@adm.com
    senha: admin

Ou talvez seja melhor você até criar uma conta (De preferência com dados falsos, tudo bem! Não é necessario confirmacao de e-mail) apenas para testes.

Note que caso voce não crie uma conta propria para testes, voce irá ver todos os "ensaios fotograficos" agendados por alguem que ja possa ter testado a aplicação com as credenciais acima.

Opção 2:
Caso queira rodar a aplicação localmente, você pode baixar o código através do meu GitHub. (https://github.com/Yago1792/AgendaFotografo)
- Instalar as dependencias do projeto: npm install
- Criar um arquivo com nome ".env" na pasta raiz do projeto. Copiar e colar o código abaixo dentro do arquivo e salva-lo (String de conexão com MongoDB):
    CONNECTIONSTRING = 'mongodb+srv://adminAgenda:adminAgenda@agendafotografia.yupolef.mongodb.net/?retryWrites=true&w=majority'!
    
![Alt text](https://i.imgur.com/B0HLODf.png)

- Iniciar um server local com npm start. 
- Agora é so acessar o seu http://localhost:3000 e se divertir!
- Você poderá fazer o login na aplicação com as seguintes credenciais:
    usuário: adm@adm.com
    senha: admin

Talvez seja melhor você até criar uma conta (De preferência com dados falsos, tudo bem! Não é necessario confirmacao de e-mail) apenas para testes.

Novamente: Note que caso voce nao crie uma conta propria para testes, voce irá ver todos os "ensaios fotograficos" agendados por alguem que ja possa ter testado a aplicação com as credenciais acima.

- Pronto, agora é só preencher os campos para cadastrar um novo ensaio, editar, ou excluir um ensaio ja cadastrado.
Dica: Faça testes de adicionar dados sem preencher todos os campos. Edite ensaios ja cadastrados. Limpe os campos de inserção de dados do ensaio com o botão clear. Exclua ensaios ou delete todos (Delete all) os ensaios cadastrados, etc, enfim, obrigado por estar aqui e espero que tenha uma boa experiência com a aplicação.

Tecnologias:
Esse projeto não possui tecnologias populares como Angular, Vue, React por ser um projeto de início de curso, e foi desenvolvido todo com Javascript Vanilla, HTML e CSS puro. 
Caso tenha interesse, tenho também no meu Github um projeto bem básico de cadastros de alunos em uma escola feito com React onde faço um CRUD de alunos através de uma API tambem disponivel para download no Github.

- Front end: https://github.com/Yago1792/Projeto_escola_frontend
- Back end: https://github.com/Yago1792/api_rest_escola_backend

