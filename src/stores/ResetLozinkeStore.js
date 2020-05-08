import { observable, decorate } from "mobx"
import Validator from 'validatorjs'
import AbstractFormStore from './AbstractFormStore'
import { API_URL } from './apiConf'

Validator.useLang('sr');

class ResetLozinkeStore extends AbstractFormStore {
    form = {
        fields: {
            email: {
                rule: 'required|string',
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
    }

    handleResetClick = async () => {
        const captcha_token = await window.grecaptcha.execute(
            "6Lc1z-kUAAAAADiKHTtebSZaGy48MYsWKf5Vkvud", { action: "resetLozinka" }
        )
        const request = new Request(API_URL + '/generisi-token-lozinke', {
            method: 'POST',
            body: JSON.stringify(
                { 
                    captcha_token,
                    username: this.form.fields.email.value,
                }
            ),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })

        const response = await fetch(request)
        const responseJson = await response.json()

        if (response.status < 200 || response.status >= 300) {
            this.form.meta.error = responseJson.message
            return
        }
    }

    handleFieldClick = () => {
        this.form.meta.error = ''
    }
}

decorate(ResetLozinkeStore, {
    form: observable,
})

export default ResetLozinkeStore
