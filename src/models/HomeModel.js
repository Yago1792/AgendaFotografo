const mongoose = require('mongoose');
const { validate } = require('webpack');

const EnsaioSchema = new mongoose.Schema({
    numero: { type: String, required: true },
    data: { type: String, required: true },
    pagamento: { type: String, required: true },
    ensaio: { type: String, required: true },
    cliente: { type: String, required: true },
    valor: { type: Number, required: true },
    locacao: { type: Number, required: true },
    lucro: { type: Number, required: true },
    local: { type: String, required: true },
    descricao: { type: String, required: false },
    status: { type: String, required: true },
    criadoPor: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now }
});

const EnsaioModel = mongoose.model('Ensaio', EnsaioSchema);

class Cadastro {
    constructor(body, user) {
        this.body = body;
        this.ensaio = null;
        this.errors = [];
        this.user = user;
    }

    async registra() {
        this.valida();
        if (this.errors.length > 0) return;
        this.ensaio = await EnsaioModel.create(this.body);
    }

    async editing(id) {
        this.valida();
        if (this.errors.length > 0) return;
        this.ensaio = await EnsaioModel.findByIdAndUpdate(id, this.body, { new: true });
        return this.ensaio;
    }

    valida() {
        //Clean Up

        for (let chave in this.body) {
            if (typeof this.body[chave] !== 'string') this.body[chave] = '';
            if (!this.body[chave]) {
                if (chave === "descricao") continue;
                this.errors.push('Todos os campos, com excessão da descrição, devem ser obrigatoriamente preenchidos');
                return;
            }
        }

        this.body = {
            numero: this.body.numero,
            data: this.body.data,
            pagamento: this.body.pagamento,
            ensaio: this.body.ensaio,
            cliente: this.body.cliente,
            valor: Number(this.body.valorReais) + Number((this.body.valorCentavos) / 100),
            locacao: Number(this.body.locacaoReais) + Number((this.body.locacaoCentavos) / 100),
            lucro: Number(this.body.valorReais) - Number(this.body.locacaoReais),
            local: this.body.local,
            descricao: this.body.descricao,
            status: this.body.status,
            criadoPor: this.user
        }
    }

    static async sortByNum() {
        const ensaios = await EnsaioModel.find().sort({ num: 1 });
        for (let ensaio of ensaios) {
            ensaio.data = Cadastro.dataBR(ensaio.data);
        }
        return ensaios;
    }

    static async sortByName() {
        const ensaios = await EnsaioModel.find().sort({ cliente: 1 });
        for (let ensaio of ensaios) {
            ensaio.data = Cadastro.dataBR(ensaio.data);
        }
        return ensaios;
    }

    static async sortByValor() {
        const ensaios = await EnsaioModel.find().sort({ valor: -1 });
        for (let ensaio of ensaios) {
            ensaio.data = Cadastro.dataBR(ensaio.data);
        }
        return ensaios;
    }

    static async sortByLucro() {
        const ensaios = await EnsaioModel.find().sort({ lucro: -1 });
        for (let ensaio of ensaios) {
            ensaio.data = Cadastro.dataBR(ensaio.data);
        }
        return ensaios;
    }

    static async sortByStatus() {
        const ensaios = await EnsaioModel.find().sort({ status: 1 });
        for (let ensaio of ensaios) {
            ensaio.data = Cadastro.dataBR(ensaio.data);
        }
        return ensaios;
    }

    static dataBR(data) {
        data = `${data.slice(8, 10)}-${data.slice(5, 7)}-${data.slice(0, 4)} ${data.slice(11, 13)}:${data.slice(14, 16)}h`;
        return data;
    }

    async buscaEnsaios() {
        const ensaios = await EnsaioModel.find().sort({ data: 1 });
        const ensaiosPorAutor = [];

        for (let ensaio of ensaios) {
            if (this.user === ensaio.criadoPor) {
                ensaio.data = Cadastro.dataBR(ensaio.data);
                ensaiosPorAutor.push(ensaio);
            }
        }
        return ensaiosPorAutor;
    };

    static async procuraPorId(id) {
        const ensaios = await EnsaioModel.findById(id);
        return ensaios;
    };

    static async deleteById(id) {
        const ensaio = await EnsaioModel.findByIdAndDelete(id);
        return ensaio;
    }
}

module.exports = Cadastro; 