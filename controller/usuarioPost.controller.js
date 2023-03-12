const usuarioService = require('../service/usuario.service');

//import a função de autenticação do login
const authService = require('../service/auth.service');

//senha para o jwt gerar uma hash
const secret = 'ql5svhls57';

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

        return res.status(201).send(await usuarioService.createUsuario(usuario));
    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send('erro no servidor, tente novamente mais tarde.');
    }
}

//Realiza login do usuário
const loginUsuario = async (req, res) => {
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
}

module.exports = {
    createUsuario,
    loginUsuario,
}