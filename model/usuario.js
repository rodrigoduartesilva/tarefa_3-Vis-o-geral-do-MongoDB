//Criação do modelo de usuário para o banco

const mongoose = require('mongoose');

//Definição do schema para usuario, onde instanciamos o mongoose.Schema, informando as entradas de dados e seus respectivos tipos
const usuarioSchema = new mongoose.Schema({
    cpf: { type: String, unique: true, required: true },
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    idade: { type: Number, required: true },
    statusSistema: { type: String }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;