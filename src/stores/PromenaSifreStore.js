import { observable, decorate } from "mobx"
import Validator from 'validatorjs'
import AbstractFormStore from './AbstractFormStore'
import { API_URL } from './apiConf'

Validator.useLang('sr');

class PromenaSifreStore extends AbstractFormStore {
    form = {
        fields: {
            lozinka1: {
                rule: 'required|same:lozinka2',
                touched: false,
                value: '',
                invalid: false,
                error: '',
                validated: false,
            },
            lozinka2: {
                rule: 'required',
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
    }

    handlePromeniLozinkuClick = async (token) => {
        const captcha_token = await window.grecaptcha.execute(
            "6Lc1z-kUAAAAADiKHTtebSZaGy48MYsWKf5Vkvud", { action: "promenaLozinke" }
        )
        const request = new Request(API_URL + '/promeni-lozinku', {
            method: 'POST',
            body: JSON.stringify(
                { 
                    captcha_token,
                    token,
                    lozinka: this.form.fields.lozinka1.value,
                }
            ),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })

        const response = await fetch(request)
        const responseJson = await response.json()

        if (response.status < 200 || response.status >= 300) {
            this.form.meta.error = responseJson.message
            return false
        }

        return true;
    }

    handleFieldClick = () => {
        this.form.meta.error = ''
    }
}

decorate(PromenaSifreStore, {
    form: observable,
})

export default PromenaSifreStore
