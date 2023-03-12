const usuarioService = require('../service/usuario.service');
const mongoose = require('mongoose');

//atualiza um usuario de acordo com a id passada como paramentro na url
//se algum dos dados estiverem faltando, uma msg de erro será retornada informando qual dado falta
const updateUsuario = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const usuario = req.body;
        const usuarioId = await usuarioService.findByIdUsuario(id);


        if (Object.keys(usuario).length === 0) {
            return res.status(400).send({ message: "O corpo da mensagem está vazio." });
        }

        if (!usuario.cpf) {
            return res.status(400).send({ message: "O campo 'cpf' não foi informado." });
        }

        if (!usuario.nome) {
            return res.status(400).send({ message: "O campo 'nome' não foi informado." });
        }

        if (!usuario.sobrenome) {
            return res.status(400).send({ message: "O campo 'sobrenome' não foi informado." });
        }

        if (!usuario.idade) {
            return res.status(400).send({ message: "O campo 'idade' não foi informado." });
        }

        if (!usuario.email) {
            return res.status(400).send({ message: "O campo 'e-mail' não foi informado." });
        }

        if (!usuario.senha) {
            return res.status(400).send({ message: "O campo 'senha' não foi informado." });
        }

        if (!usuario.statusSistema) {
            return res.status(400).send({ message: "O campo 'statusSistema' não foi informado." });
        }

        //usuarioId verifica se uma id retorna algo, caso o retorno seja null, ela apresenta uma msg de erro
        if (usuarioId === null) {
            return res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
        }

        return res.status(200).send(await usuarioService.updateUsuario(id, usuario));
    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send('erro no servidor, tente novamente mais tarde.');
    }
}


module.exports = {
    updateUsuario
}