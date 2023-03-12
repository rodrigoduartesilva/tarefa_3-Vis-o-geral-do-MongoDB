const usuarioService = require('../service/usuario.service');
const mongoose = require('mongoose');

//deleta um usuário de acordo com o parametro id passado na url
const deleteUsuario = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        let found = false;

        const usuario = await usuarioService.findByIdUsuario(id);

        if (usuario != null) {
            found = true;
        }

        if (!found) {
            return res.status(404).send({ message: `O usuário com o id ${id} não foi encontrado.` });
        }

        return res.status(200).send(await usuarioService.deleteUsuario(id));
    } catch (err) {
        console.log(`erro: ${err}`);
        return res.status(500).send('erro no servidor, tente novamente mais tarde.');
    }
}

module.exports = {
    deleteUsuario
}