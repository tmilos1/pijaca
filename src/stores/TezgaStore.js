import { observable, computed, decorate } from "mobx"
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
                rule: 'required|email|email_available',
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
        proizvodi: [],
        kod_grada: 'KS'
    }

    constructor() {
        super()

        Validator.registerAsync('email_available', function (email, attribute, req, passes) {
            const emailValidator = new Validator({email: email}, {email: 'email'})

            if (emailValidator.fails()) {
                passes()
                return
            }

            let url = new URL(API_URL + '/registracija/email_available'),
                params = { email }

            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    if (data.email_available) {
                        passes()
                        return
                    }

                    passes(false, 'Ovaj email je već korišćen za drugu tezgu.'); 
                })
        })
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

        fetch(API_URL + '/proizvodi')
            .then((response) => {
                return response.json()
            })
            .then(data => {
                for (const row of data) {
                    this.form.proizvodi.push({
                        kod: row.kod,
                        kod_grupe: row.kod_grupe,
                        naziv: row.naziv,
                        opis_cene: row.opis_cene,
                        slika_proizvoda: row.slika_proizvoda,
                        cena: 0.00,
                        napomena: "",
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
                proizvodi: this.form.proizvodi.filter(pr => pr.izabran === true),
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

    handleProizvodChange = (event) => {
        const izabraniKod = event.target.name
        const proizvod = this.form.proizvodi.find(el => el.kod === izabraniKod)

        if (proizvod.izabran) {
            proizvod.izabran = false
        } else {
            proizvod.izabran = true
        }
    }

    handleProizvodNapomenaChange = (field) => {
        const fieldValue = field.target.value
        const izabraniKod = field.target.name

        const proizvod = this.form.proizvodi.find(el => el.kod === izabraniKod)
        proizvod.napomena = fieldValue
    }

    handleProizvodCenaChange = (field) => {
        const fieldValue = field.target.value
        const izabraniKod = field.target.name

        const proizvod = this.form.proizvodi.find(el => el.kod === izabraniKod)
        proizvod.cena = fieldValue
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
