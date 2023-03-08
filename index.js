//import do express
const express = require("express");

//definindo uma variável onde o express será 'armazenado' para que seus métodos sejam usados.
const app = express();

//definindo uma variavel 'usuario' para que esta possa acessar as rotas da api
const usuario = require('./router/usuario.router');

//definição da porta que será usada na rota.
const port = 3000;

//app.use reconhecerá o express.json() como um arquivo json.
app.use(express.json());

//definindo a rota usuário
app.use('/usuario', usuario);

//console.log com msg mostrando que a porta está sendo escutada e exibindo o endereço de acesso local.
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});