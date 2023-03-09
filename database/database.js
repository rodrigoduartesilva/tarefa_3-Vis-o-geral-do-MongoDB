const mongoose = require('mongoose');


//Função de conexão do database
//O try/catch mostrará uma msg de sucesso caso a conexão seja ok, ou uma msg de erro, caso a conexão falhe
function connectToDatabase() {

    //Caso apresente erro de conexão negada, uma possivel solução é substituir 'localhost' por '127.0.0.1'.
    //Logo, ficaria dessa forma: mongodb://127.0.0.1:27017/usuarios

    mongoose.connect('mongodb://localhost:27017/usuarios', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('MongoDB Connected');
    }).catch((err) => {
        return console.log(`Erro na conexão com o banco: ${err}`);
    });
}

module.exports = connectToDatabase;