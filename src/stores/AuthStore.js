import { observable, decorate } from "mobx"
import Validator from 'validatorjs'
import AbstractFormStore from './AbstractFormStore'
import { API_URL } from './apiConf'
import * as jwt_decode from "jwt-decode";

import { tezgaStore } from './AppContext'

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
    tezga_id = null

    constructor() {
        super()

        this.tezga_id = localStorage.getItem('tezga_id')
        if (localStorage.getItem('access_token')) {
            this.prijavljen = true
        }
        this.tezgaStore = tezgaStore
    }

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

        const decodedToken = jwt_decode(responseJson.access_token)
        this.tezga_id = decodedToken.user_claims.tezga_id
        localStorage.setItem('tezga_id', decodedToken.user_claims.tezga_id)
    }

    handleFieldClick = () => {
        this.form.meta.error = ''
    }

    handleLogoutClick = async () => {
        this.prijavljen = false
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        this.tezgaStore.resetTezga()
        return Promise.resolve()
    }
}

decorate(AuthStore, {
    form: observable,
    prijavljen: observable,
    tezga_id: observable,
})

export default AuthStore
