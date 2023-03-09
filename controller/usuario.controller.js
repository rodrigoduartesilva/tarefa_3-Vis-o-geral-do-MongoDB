const Usuario = require('../model/usuario');

const find = async (req, res) => {
    const id = req.params.id;
    //let found = false;

    return res.status(200).send(await Usuario.findById(id));

    /* if (!found) {
        res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
    } */
}

const findAllUsuarios = async (req, res) => {
    return res.status(200).send(await Usuario.find());
}

const createUsuario = async (req, res) => {
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
}

const updateUsuario = async (req, res) => {
    const id = req.params.id;
    const usuario = req.body;
    //let found = false;

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

    return res.status(200).send(await Usuario.findByIdAndUpdate(id, usuario, { returnDocument: "after" }));
    /* if (!found) {
        res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
    } */
}

const deleteUsuario = async (req, res) => {
    const id = req.params.id;
    //let found = false;

    return res.status(200).send(await Usuario.findByIdAndRemove(id));

    /* if (!found) {
        res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
    } */
}

module.exports = {
    find,
    findAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}