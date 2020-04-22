import { observable, computed, decorate } from "mobx"
import Validator from 'validatorjs'
import AbstractFormStore from './AbstractFormStore'
import { API_URL } from './apiConf'

Validator.useLang('sr');

class AuthStore extends AbstractFormStore {
    form = {
        fields: {
            email: {
                rule: 'required|string',
                touched: false,
                value: '',
                invalid: false,
                error: '',
            },
            password: {
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
    prijavljen = false

    handleLoginClick = async () => {
        const naruci_captcha_token = await window.grecaptcha.execute(
            "6Lc1z-kUAAAAADiKHTtebSZaGy48MYsWKf5Vkvud", { action: "login" }
        )
        const request = new Request(API_URL + '/authenticate', {
            method: 'POST',
            body: JSON.stringify(
                { 
                    captcha_token: naruci_captcha_token,
                    username: this.form.fields.email.value,
                    password: this.form.fields.password.value,
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

        localStorage.setItem('access_token', responseJson.access_token )
        localStorage.setItem('refresh_token', responseJson.refresh_token )
        this.prijavljen = true
    }

    handleFieldClick = () => {
        this.form.meta.error = ''
    }

    handleLogoutClick = async () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        return Promise.resolve()
    }

    get checkAuth() {
        if (localStorage.getItem('access_token')) {
            return true
        }

        return false
    }
}

decorate(AuthStore, {
    form: observable,
    prijavljen: observable,
    checkAuth: computed,
})

export default AuthStore
