import { observable, decorate } from "mobx"
import Validator from 'validatorjs'
import AbstractFormStore from './AbstractFormStore'
import { API_URL } from './apiConf'

Validator.useLang('sr');

class TezgaStore extends AbstractFormStore {
    form = {
        fields: {
            naziv: {
                rule: 'required',
                touched: false,
                value: '',
                invalid: false,
                error: '',
            },
            napomena: {
                rule: 'string',
                touched: false,
                value: '',
                invalid: false,
                error: '',
            },
            adresa: {
                rule: 'string',
                touched: false,
                value: '',
                invalid: false,
                error: '',
            },
            email: {
                rule: 'required|email',
                touched: false,
                value: '',
                invalid: false,
                error: '',
            },
            vebsajt: {
                rule: 'url',
                touched: false,
                value: '',
                invalid: false,
                error: '',
            },
            telefon: {
                rule: 'required|string',
                touched: false,
                value: '',
                invalid: false,
                error: '',
            },
            lozinka: {
                rule: 'required',
                touched: false,
                value: '',
                invalid: false,
                error: '',
            },
            primedba: {
                rule: 'string',
                touched: false,
                value: '',
                invalid: false,
                error: '',
            },
        },
        meta: {
            isValid: false,
            error: null
        },
        nacin_dostave: 'dostava',
        kucna_isporuka: '300din',
        files: [],
        grupe: [],
        proizvodi: []
    }

    constructor() {
        super()
        // Validator.registerAsync('email_available', function(username, attribute, req, passes) {
        //     // do your database/api checks here etc
        //     // then call the `passes` method where appropriate:
        //     passes(); // if username is available
        //     passes(false, 'Ovaj email je već korišćen za drugu tezgu.'); // if username is not available
        //   });
        this.fetchData()
    }

    fetchData = () => {
        fetch(API_URL + '/grupe')
            .then((response) => {
                return response.json()
            })
            .then(data => {
                for (const row of data) {
                    this.form.grupe.push({
                        kod: row.kod,
                        naziv: row.naziv,
                        izabran: false
                    })
                }
            })
    }

    saveData = async (captcha_token, grad, kod_grada) => {
        const response = await fetch(API_URL + '/registracija', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                captcha_token,
                naziv: this.form.fields.naziv.value,
                napomena: this.form.fields.napomena.value,
                nacin_dostave: this.form.nacin_dostave,
                kucna_isporuka: this.form.kucna_isporuka,
                adresa: this.form.fields.adresa.value,
                grad: grad,
                kod_grada: kod_grada,
                email: this.form.fields.email.value,
                vebsajt: this.form.fields.vebsajt.value,
                telefon: this.form.fields.telefon.value,
                lozinka: this.form.fields.lozinka.value,
                primedba: this.form.fields.primedba.value,
            })
        })

        return response.json()
    }

    uploadFiles = async (tezga_id) => {
        for await (const file of this.form.files) {
            const formData = new FormData()
            formData.append('file', file)

            await fetch(API_URL + '/upload_anon/' + tezga_id, {
                method: 'POST',
                body: formData
            })
        }
    }

    handleNacinDostaveChange = (event) => {
        this.form.nacin_dostave = event.target.value
    }

    handleKucnaIsporukaChange = (event) => {
        this.form.kucna_isporuka = event.target.value
    }

    handleFilesChange = (files) => {
        this.form.files = files
    }

    handleGrupaChange = (event) => {
        const izabraniKod = event.target.name
        const grupa = this.form.grupe.find(el => el.kod === izabraniKod)

        if (grupa.izabran) {
            grupa.izabran = false
        } else {
            grupa.izabran = true
        }
    }

    getTextUsloviIsporuke = () => {
        if (this.form.nacin_dostave === 'dostava') {
            switch (this.form.fields.kucna_isporuka) {
                default:
                case 'uvek':
                    return "Besplatna dostava na kućnu adresu."
                case '300din':
                    return "Dostava na kućnu adresu. Besplatno za isnos preko 300din."
                case '500din':
                    return "Dostava na kućnu adresu. Besplatno za isnos preko 500din."
                case '700din':
                    return "Dostava na kućnu adresu. Besplatno za isnos preko 700din."
            }
        } else {
            return "Preuzimanje kod nas na gazdinstvu."
        }
    }

    setUsloviIsporuke = () => {

    }
}

decorate(TezgaStore, {
    form: observable,
})

export default TezgaStore
