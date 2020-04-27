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
                validated: false,
            },
            napomena: {
                rule: 'string',
                touched: false,
                value: '',
                invalid: false,
                error: '',
                validated: false,
            },
            adresa: {
                rule: 'string',
                touched: false,
                value: '',
                invalid: false,
                error: '',
                validated: false,
            },
            email: {
                rule: 'required|email|email_available',
                touched: false,
                value: '',
                invalid: false,
                error: '',
                validated: false,
            },
            vebsajt: {
                rule: 'url',
                touched: false,
                value: '',
                invalid: false,
                error: '',
                validated: false,
            },
            telefon: {
                rule: 'required|string',
                touched: false,
                value: '',
                invalid: false,
                error: '',
                validated: false,
            },
            lozinka: {
                rule: 'required',
                touched: false,
                value: '',
                invalid: false,
                error: '',
                validated: false,
            },
            primedba: {
                rule: 'string',
                touched: false,
                value: '',
                invalid: false,
                error: '',
                validated: false,
            },
        },
        meta: {
            isValid: false,
            error: null
        },
        nacin_dostave: 'dostava',
        kucna_isporuka: '300din',
        files: [],
        postojece_slike: [],
        grupe: [],
        proizvodi: [],
        kod_grada: 'KS',
        edit_mode: false,
    }

    constructor() {
        super()

        Validator.registerAsync('email_available', function (email, attribute, req, passes) {
            emailAvailableValidator(email, passes)
        })

        Validator.registerAsync('email_available_for_owner', function (email, attribute, req, passes) {
            emailAvailableValidator(email, passes, true)
        })
    }

    fetchAuxData = async () => {
        this.form.grupe = []
        const responseGrupe = await fetch(API_URL + '/grupe')
        const dataGrupe = await responseGrupe.json()

        for (const row of dataGrupe) {
            this.form.grupe.push({
                kod: row.kod,
                naziv: row.naziv,
                izabran: false
            })
        }

        this.form.proizvodi = []
        const responseProizvodi = await fetch(API_URL + '/proizvodi')
        const dataProizvodi = await responseProizvodi.json()

        for (const row of dataProizvodi) {
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
    }

    prepareForEdit = (tezga_id) => {
        this.form.fields.email.rule = 'required|email|email_available_for_owner'
        this.form.fields.lozinka.rule = 'string'
        this.form.edit_mode = true

        fetch(API_URL + '/tezge/' + tezga_id)
            .then((response) => {
                return response.json()
            })
            .then(data => {
                this.form.fields.naziv.value = data.naziv
                this.form.fields.napomena.value = data.napomena
                this.form.nacin_dostave = data.nacin_dostave
                this.form.kucna_isporuka = data.kucna_isporuka
                this.form.fields.adresa.value = data.adresa
                this.form.fields.email.value = data.email
                this.form.fields.vebsajt.value = data.vebsajt
                this.form.fields.telefon.value = data.telefon
                this.form.fields.primedba.value = data.primedba
                this.form.meta.isValid = true

                for (const row of data.proizvodi) {
                    const proizvod = this.form.proizvodi.find(el => el.kod === row.kod_proizvoda)
                    proizvod.izabran = true
                    proizvod.napomena = row.napomena
                    proizvod.cena = row.cena

                    const grupa = this.form.grupe.find(el => el.kod === row.kod_grupe)
                    grupa.izabran = true
                }

                this.form.postojece_slike = []
                for (const row of data.slike) {
                    this.form.postojece_slike.push(
                        {
                            url: row.url,
                            obrisana: false,
                        }
                    )
                }
            })
    }

    resetTezga = () => {
        this.form.fields.naziv.value = ""
        this.form.fields.napomena.value = ""
        this.form.nacin_dostave = ""
        this.form.kucna_isporuka = ""
        this.form.fields.adresa.value = ""
        this.form.fields.email.value = ""
        this.form.fields.vebsajt.value = ""
        this.form.fields.telefon.value = ""
        this.form.fields.primedba.value = ""

        this.form.fields.naziv.touched = false
        this.form.fields.napomena.touched = false
        this.form.fields.adresa.touched = false
        this.form.fields.email.touched = false
        this.form.fields.vebsajt.touched = false
        this.form.fields.telefon.touched = false
        this.form.fields.primedba.touched = false

        this.form.meta.isValid = false
        this.form.edit_mode = false
    }

    createTezga = async (captcha_token, grad, kod_grada) => {
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
        const options = { headers: { 'Content-Type': null } }
        if (this.form.edit_mode) {
            options.headers = {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        }

        const slikeZaBrisanje = this.form.postojece_slike
            .filter(sl => sl.obrisana === true)

        if (slikeZaBrisanje.length > 0) {
            for await (const slika of slikeZaBrisanje) {
                options.headers['Content-Type'] = 'application/json'
                options.method = 'DELETE'
                options.body = JSON.stringify({
                    full_filename: slika.url,
                    tezga_id: tezga_id,
                })

                await fetch(API_URL + '/tezge/uploads', options)
            }
        }
        this.form.postojece_slike = this.form.postojece_slike.filter(sl => sl.obrisana === false)

        for await (const file of this.form.files) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('tezga_id', tezga_id)

            options.headers['Content-Type'] = 'multipart/form-data'
            options.method = 'POST'
            options.body = formData

            const postResponse = await fetch(API_URL + '/tezge/uploads', {
                method: 'POST',
                body: formData
            })

            const postResponseObj = await postResponse.json()

            this.form.postojece_slike.push({
                url: postResponseObj.filename,
                obrisana: false,
            })
        }
        this.form.files = []
    }

    updateTezga = async () => {

        let url = new URL(API_URL + '/tezge'),
            options = {}

        options.headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
        }
        options.method = 'PUT'
        options.body = JSON.stringify({
            naziv: this.form.fields.naziv.value,
            napomena: this.form.fields.napomena.value,
            nacin_dostave: this.form.nacin_dostave,
            kucna_isporuka: this.form.kucna_isporuka,
            adresa: this.form.fields.adresa.value,
            email: this.form.fields.email.value,
            vebsajt: this.form.fields.vebsajt.value,
            telefon: this.form.fields.telefon.value,
            primedba: this.form.fields.primedba.value,
            proizvodi: this.form.proizvodi.filter(pr => pr.izabran === true),
        })

        await fetch(url, options)
    }

    updatePassword = async (tezga_id) => {
        if (!this.form.fields.lozinka.value) {
            return
        }

        let url = new URL(API_URL + '/tezge/lozinka'),
            options = {}

        options.headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
        }
        options.method = 'PATCH'
        options.body = JSON.stringify({
            lozinka: this.form.fields.lozinka.value,
        })

        await fetch(url, options)
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
}

function emailAvailableValidator(email, passes, existingUser = false) {
    const emailValidator = new Validator({ email: email }, { email: 'email' })

    if (emailValidator.fails()) {
        passes()
        return
    }

    let url = new URL(API_URL + '/registracija/email_available'),
        params = { email }

    const options = {}
    if (existingUser) {
        url = new URL(API_URL + '/registracija/email_available_for_owner')
        options.headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url, options)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            if (data.email_available) {
                passes()
                return
            }

            passes(false, 'Ovaj email je već korišćen za drugu tezgu.');
        })
}

decorate(TezgaStore, {
    form: observable,
})

export default TezgaStore
