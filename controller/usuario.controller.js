const Usuario = require('../model/usuario');
const mongoose = require('mongoose');


//find localiza um usuário especifico atraves de um id passado como parametro na url.
const find = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        let found = false;

        const usuario = await Usuario.findById(id);

        //se a variavel usuário for vazia, ele retorna um null
        if (usuario != null) {
            found = true;
        }

        //com o retorno de null em usuario, o found permanece como false entrando no if abaixo
        if (!found) {
            return res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
        }

        return res.status(200).send(usuario);

    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send('erro no servidor, tente novamente mais tarde.');
    }
}

//findAllUsuarios localiza todos os cadastros dentro da base de dados. Caso o banco esteja vazio, ele retorna um aviso
const findAllUsuarios = async (req, res) => {
    try {
        const findAllUsers = await Usuario.find();

        if (findAllUsers.length === 0) {
            return res.status(404).send('Esta base de dados está vazia.');
        }

        return res.status(200).send(await Usuario.find());
    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send('erro no servidor, tente novamente mais tarde.');
    }
}


//cria um usuario de acordo com os dados passados na requisição do body
//caso seja passado algum dado vazio, será retornado uma msg informando qual o dado faltante
const createUsuario = async (req, res) => {
    try {
        const usuario = req.body;

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

        if (!usuario.statusSistema) {
            return res.status(400).send({ message: "O campo 'statusSistema' não foi informado." });
        }

        return res.status(201).send(await Usuario.create(usuario));
    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send('erro no servidor, tente novamente mais tarde.');
    }
}

//atualiza um usuario de acordo com a id passada como paramentro na url
//se algum dos dados estiverem faltando, uma msg de erro será retornada informando qual dado falta
const updateUsuario = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const usuario = req.body;
        const usuarioId = await Usuario.findById(id);

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

        if (!usuario.statusSistema) {
            return res.status(400).send({ message: "O campo 'statusSistema' não foi informado." });
        }

        //usuarioId verifica se uma id retorna algo, caso o retorno seja null, ela apresenta uma msg de erro
        if (usuarioId === null) {
            return res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
        }

        return res.status(200).send(await Usuario.findByIdAndUpdate(id, usuario, { returnDocument: "after" }));
    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send('erro no servidor, tente novamente mais tarde.');
    }
}

//deleta um usuário de acordo com o parametro id passado na url
const deleteUsuario = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        let found = false;

        const usuario = await Usuario.findById(id);

        if (usuario != null) {
            found = true;
        }

        if (!found) {
            return res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
        }

        return res.status(200).send(await Usuario.findByIdAndRemove(id));
    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send('erro no servidor, tente novamente mais tarde.');
    }
}

module.exports = {
    find,
    findAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}