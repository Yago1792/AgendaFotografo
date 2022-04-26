const Cadastro = require("../models/HomeModel");

module.exports.paginaInicial = async (req, res) => {
    if (!req.session.user) return res.redirect('/login/index')
    const cadastro = new Cadastro(req.body, req.session.user.email)
    const ensaios = await cadastro.buscaEnsaios();
    res.render('index', { ensaios });
}

exports.registraEnsaio = async (req, res) => {
    try {
        const cadastro = new Cadastro(req.body, req.session.user.email);
        await cadastro.registra();

        if (cadastro.errors.length > 0) {
            req.flash('errors', cadastro.errors);
            req.session.save(() => res.redirect(`/`));
            return;
        }
        req.flash('success', 'Ensaio registrado com sucesso.');
        req.session.save(() => res.redirect(`/`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}

exports.edit = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const ensaio = await Cadastro.procuraPorId(req.params.id);
    res.render('edit', { ensaio });
}

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const ensaio = await Cadastro.deleteById(req.params.id);

    req.flash('success', `Ensaio ${ensaio.numero} - Cliente <strong>${ensaio.cliente}</strong> deletado com sucesso.`);
    res.redirect('/');
}

exports.editing = async (req, res) => {

    const ensaio = new Cadastro(req.body, req.session.user.email);
    const ensaioEdited = await ensaio.editing(req.params.id);

    if (ensaio.errors.length > 0) {
        req.flash('errors', ensaio.errors);
        req.session.save(() => res.redirect(`/`));
        return;
    }

    req.flash('success', `Ensaio ${ensaioEdited.numero} - Cliente <strong>${ensaioEdited.cliente}</strong> editado com sucesso.`);
    res.redirect('/');
}

exports.deleteAll = async (req, res) => {
    const ensaios = new Cadastro(req.body, req.session.user.email);
    const ensaiosPorAutor = await ensaios.buscaEnsaios();
    console.log(ensaiosPorAutor);
    for (let ensaio of ensaiosPorAutor) {
        Cadastro.deleteById(ensaio._id);
    }
    res.redirect('/');
}

exports.sortByNum = async (req, res) => {
    const ensaios = await Cadastro.sortByNum();
    res.render('index', { ensaios });
}

exports.sortByName = async (req, res) => {
    const ensaios = await Cadastro.sortByName();
    res.render('index', { ensaios });
}

exports.sortByValor = async (req, res) => {
    const ensaios = await Cadastro.sortByValor();
    res.render('index', { ensaios });
}

exports.sortByLucro = async (req, res) => {
    const ensaios = await Cadastro.sortByLucro();
    res.render('index', { ensaios });
}

exports.sortByStatus = async (req, res) => {
    const ensaios = await Cadastro.sortByStatus();
    res.render('index', { ensaios });
}
