// configurando arquivos .env
// dotenv eh um modulo do node que vamos usar para amarzenar nossas VARIAVEIS que nao queremos  publicas num repositorio ou subir ele pro online, pois pode conter senhas e etc
const dotEnv = require('dotenv');
dotEnv.config();

// Importando o modulo do node "express"
const express = require('express');
const app = express();

// importando o que fara a conexao do nosso projeto com a mongoDB (database)
// O moongose é quem vai conectar nosso APP a base de dados e modelar nossa base de dados e garantir que os dados que vamos salvar na DB sao realmente da forma que queremos salvar
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING).then(() => { // Repare que eh uma promisse. So 
    //...depois de conectado, ele enviara uma msg falando que conectou e vai emitir o sinal ready. Vamos usar esse
    //... sinal la em (2), falando que somente quando esse sinal for emitido, que comece a escutar a porta
    console.log('conectei a base de dados');
    app.emit('ready');
}).catch(e => console.log(e));

// Criando uma Session
const session = require('express-session'); // As sessoes indentificam o navegador de um cliente durante um determinado tempo (que configuramos la na sessionOptions), assim...
//... podemos logar um usuario por exemplo que ja foi  logado a um tempo.
const MongoStore = require('connect-mongo'); // MongoStore significa que vamos salvar as sessoes na base de dados, para nao consumir tanto recurso do pc do cliente.
const flashMsg = require('connect-flash'); // Cria mensagens temporarias, que somem depois que acessadas 1 vez. Sao boas para enviar mensagens de erro, por exemplo, senha ou login incorretos.


const routes = require('./routes'); // Caminho de cada rotas do app (ex: /home, /sobre, /contatos)
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf'); // Token para evitar que aplicativo ou sites externos nao consigam postar nada pra dentro da nossa aplicacao. No nosso app, cada form tem seu proprio token que sao
//... comparados com o token gerado, e so passa para o proximo passo se esses tokens forem iguais.

// Middlewares
// Middlewares sao funcions que sao executadas NA ROTA. Depois da requisicao, podemos mandar alguma coisa no meio do caminho antes ou depois da resposta (res)
const { middlewareGlobal, outroMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded({ extended: true })); // Permite a postagem de formularios dentro da nossa aplicacao
app.use(express.json()); // Permite o parse de JSON para dentro da nossa aplicacao
app.use(express.static(path.resolve(__dirname, 'public')));

// Configurando a session
const sessionOptions = session({
    secret: 'Qualquer coisa, mas ngm pode saber',
    // store: new MongoStore({ mongooseConnection: mongoose.connection}),
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true // (7 dias em ms)
    }
});
app.use(sessionOptions);
app.use(flashMsg());

// Views
// Views sao os arquivos que a gente renderiza na tela, geralmente arquivos HTML
app.set('views', path.resolve(__dirname, 'src', 'views')); // Configuramos primeiramente o caminho do nossos views
app.set('view engine', 'ejs') // E definimos qual a engine que vamos utilizar para renderizar o HTML. No caso usamos o ejs nesse projeto, por ser muito parecido com HTML. Um exemplo de tag
//... da engine do ejs <%= Imprime na tela da forma que o texto tiver %>  Repare que se parece com html

app.use(csrf());
// Nossos proprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

// app.use(outroMiddleware);

app.use(routes);

app.on('ready', () => { // (2). Como vimos, apenas no sinal 'ready', vamos executar o app.listen
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
})