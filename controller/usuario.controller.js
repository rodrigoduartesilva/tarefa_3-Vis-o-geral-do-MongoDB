const usuarios = require('../usuarios');

const find = (req, res) => {
    const id = req.params.id;
    let found = false;

    usuarios.map(function (valor) {
        if (valor.id == id) {
            found = true;
            return res.send(valor);
        }
    });

    if (!found) {
        res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
    }
}

const findAllUsuarios = (req, res) => {
    res.send(usuarios);
}

const createUsuario = (req, res) => {
    const usuario = req.body;
    let found = false;

    if (Object.keys(usuario).length === 0) {
        return res.status(400).send({ message: "O corpo da mensagem está vazio." });
    }

    if (!usuario.id) {
        return res.status(400).send({ message: "O campo 'id' não foi informado." });
    }

    if (usuario.id) {
        usuarios.map(function (valor) {
            if (valor.id == usuario.id) {
                return found = true;
            }
        });
    }

    if (found) {
        return res.status(400).send({ message: `O usuário com o id ${usuario.id} já consta em nossa base de dados.` });
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


    usuario.statusSistema = "ativo";
    usuarios.push(usuario);
    res.status(201).send(usuarios);
}

const updateUsuario = (req, res) => {
    const id = req.params.id;
    const usuario = req.body;
    let found = false;

    if (Object.keys(usuario).length === 0) {
        return res.status(400).send({ message: "O corpo da mensagem está vazio." });
    }

    if (!usuario.id) {
        return res.status(400).send({ message: "O campo 'id' não foi informado." });
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

    usuarios.map(function (valor, index) {
        if (valor.id == id) {
            found = true;
            usuarios[index] = usuario;
            return res.send(usuarios[index]);
        }
    });

    if (!found) {
        res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
    }
}

const deleteUsuario = (req, res) => {
    const id = req.params.id;
    let found = false;

    usuarios.map(function (valor, index) {
        if (valor.id == id) {
            found = true;
            usuarios.splice(index, 1);
            return res.send(valor);
        }
    });

    if (!found) {
        res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
    }
}

module.exports = {
    find,
    findAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}