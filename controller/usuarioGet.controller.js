const usuarioService = require('../service/usuario.service');
const mongoose = require('mongoose');

//import a função de autenticação do login
const authService = require('../service/auth.service');

//import do jwt
const jwt = require('jsonwebtoken');

//senha para o jwt gerar uma hash
const secret = 'ql5svhls57';

//find localiza um usuário especifico atraves de um id passado como parametro na url.
const find = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        let found = false;

        const usuario = await usuarioService.findByIdUsuario(id);

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
        const findAllUsers = await usuarioService.findAllUsuario();

        if (findAllUsers.length === 0) {
            return res.status(404).send('Esta base de dados está vazia.');
        }

        return res.status(200).send(findAllUsers);
    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send('erro no servidor, tente novamente mais tarde.');
    }
}

//Testa o formato do token criado no ato do login
const testeTokenUsuario = (req, res) => {
    try {
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
    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send('erro no servidor, tente novamente mais tarde.');
    }
}

module.exports = {
    find,
    findAllUsuarios,
    testeTokenUsuario
}