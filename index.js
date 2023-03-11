//import do express
const express = require("express");

//import a função de conexão com database
const connectToDatabase = require("./database/database");

//import a função de autenticação do login
const authService = require('./service/auth.service');

//import do jwt
const jwt = require('jsonwebtoken');

//definindo uma variável onde o express será 'armazenado' para que seus métodos sejam usados.
const app = express();

//definindo uma variavel 'usuario' para que esta possa acessar as rotas da api
const usuario = require('./router/usuario.router');

connectToDatabase();

//definição da porta que será usada na rota.
const port = 3000;

//senha para o jwt gerar uma hash
const secret = 'ql5svhls57';

//app.use fará a interpretação para o formato de um arquivo json.
app.use(express.json());

//definindo a rota usuário
app.use('/usuario', usuario);

app.get('/', (req, res) => {
    res.send('Hello World')
})

//rota para realização do login
app.post('/usuario/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await authService.loginService(email);

        if (!user) {
            return res.status(400).send({ message: 'Usuário não encontrado, tente novamente.' });
        }

        if (senha != user.senha) {
            return res.status(400).send({ message: 'Senha inválida' });
        }

        const token = authService.generateToken(user, secret);

        res.status(200).send({
            user,
            token
        });

    } catch (err) {
        console.log(`erro: ${err}`);
    }
});

app.get('/usuario/teste-token', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: 'O token não foi informado.' })
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).send({ message: 'Token inválido.' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ message: 'Token com formato inválido.' });
    }

    jwt.verify(token, secret, (err, decoded) => {

        if (err) {
            console.log(`erro: ${err}`);
            return res.status(500).send({ message: 'erro interno, tente novamente.' })
        }

        console.log(decoded);
        res.send(decoded);
    });
});

//console.log com msg mostrando que a porta está sendo escutada e exibindo o endereço de acesso local.
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});