import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';

class Agenda2022 {
    constructor() {

        // ELEMENTOS HTML
        this.divTotal = document.querySelector('.total');

        // BOTOES
        this.botoes = document.querySelector('.opcoes');

        this.Table = document.querySelector('.writeTable');

        // VARIAVEIS
        this.i = 0;
        this.lucro = 0;
        this.somaLucro = 0;
        this.semEnsaios = true;
        this.reaisValor = 0;
        this.centavosValor = 0;
        this.reaisLocacao = 0;
        this.CentavosLocacao = 0;
        this.inputValues = [];

        // METODOS
        this.Inicia = () => {
            this.ClickedButton();
            this.attLucro();
        };

        this.attLucro = () => {
            document.addEventListener('DOMContentLoaded', () => {
                this.CalculaLucro();
            })
        }

        this.fieldsChecked = (inputs) => {
            for (let error of document.querySelectorAll('.error-text')) {
                error.remove();
            }

            for (let valor of inputs) {
                if (!valor.value) {
                    if (valor.classList.contains('centavos') || valor.classList.contains('inputDescricao'))
                        continue;
                    this.criaErro();
                    return false;
                }
            }
            return true;
        };

        this.criaErro = () => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>* Todos os campos são obrigatórios<strong>`;
            div.classList.add('error-text');
            const error = document.querySelector('.opcoes').insertAdjacentElement('beforebegin', div);
        };

        this.CalculaLucro = () => {
            this.somaLucro = 0;
            const tdsValor = this.Table.querySelectorAll(`td.valor`);
            const tdsLocacao = this.Table.querySelectorAll(`td.locacao`);
            for (let td of tdsValor) {
                this.somaLucro = Number(Number(this.somaLucro) + Number(td.innerText));
            }
            for (let td of tdsLocacao) {
                this.somaLucro = Number(Number(this.somaLucro) - Number(td.innerText));
            }
            this.divTotal.innerText = `R$ ${this.somaLucro}`;
        };

        this.CriaArrayInputs = (array) => {
            this.inputValues = [];

            for (let input of array) {
                if (input.classList.contains('reaisValor')) {
                    this.reaisValor = input.value;
                } else if (input.classList.contains('centavosValor')) {
                    this.centavosValor = input.value;
                    const valor = Number(`${this.reaisValor}.${this.centavosValor}`);
                    this.inputValues.push(valor.toFixed(2));
                } else if (input.classList.contains('reaisLocacao')) {
                    this.reaisLocacao = input.value;
                } else if (input.classList.contains('centavosLocacao')) {
                    this.CentavosLocacao = input.value;
                    const locacao = Number(`${this.reaisLocacao}.${this.CentavosLocacao}`);
                    const lucro = Number(`${this.reaisValor}.${this.centavosValor}`) - Number((`${this.reaisLocacao}.${this.CentavosLocacao}`));
                    this.inputValues.push(locacao.toFixed(2));
                    this.inputValues.push(lucro.toFixed(2));
                } else if (input.classList.contains('inputData')) {
                    const data = this.TransformaDataBr(input.value);
                    this.inputValues.push(data);
                } else { this.inputValues.push(input.value); }
            }
            return this.inputValues;
        };

        this.ResetaInput = function (Array) {
            for (let input of Array) {
                if (input.classList.contains('inputPagamento')) {
                    input.value = 'Pagamento';
                } else if (input.classList.contains('inputEnsaio')) {
                    input.value = 'Ensaio';
                } else if (input.classList.contains('inputLocal')) {
                    input.value = 'Local';
                } else if (input.classList.contains('inputStatus')) {
                    input.value = 'Status';
                } else if (input.classList.contains('reaisValor')) {
                    input.value = 0;
                } else if (input.classList.contains('reaisLocacao')) {
                    input.value = 0;
                } else { input.value = ''; };
            }
        };

        this.ClickedButton = () => {
            this.botoes.addEventListener('click', e => {
                const el = e.target;
                const trsDeInputs = document.querySelectorAll('.getInputValue');

                if (el.classList.contains('btn-clear')) {
                    e.preventDefault();
                    this.ResetaInput(trsDeInputs);
                }

                if (el.classList.contains('btn-delete-all')) {
                    e.preventDefault();
                    const confirma = confirm('Essa ação deletará TODOS os registros de ensaios. Deseja realmente apagar TODOS os ensaios registrados?');
                    const confirmaPorTexto = prompt('Digita SIM para apagar TODOS os ensaios registrados!').toLowerCase();
                    if (confirma && confirmaPorTexto === 'sim') {
                        window.location.href = '/ensaios/deleteall';
                    }
                }

            });
        };
    }
};

const agenda = new Agenda2022();
agenda.Inicia(); 