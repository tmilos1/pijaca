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
    display_id = null
    redirectToHome = false

    constructor() {
        super()

        this.tezga_id = localStorage.getItem('tezga_id')
        this.display_id = localStorage.getItem('display_id')

        let accessToken = localStorage.getItem('access_token') 
        if (accessToken) {
            const decodedToken = jwt_decode(accessToken)

            if (decodedToken.exp >= new Date().getTime()/1000) {
                this.prijavljen = true
            }
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

        const decodedToken = jwt_decode(responseJson.access_token)
        this.tezga_id = decodedToken.user_claims.tezga_id
        this.display_id = decodedToken.user_claims.display_id
        localStorage.setItem('tezga_id', decodedToken.user_claims.tezga_id)
        localStorage.setItem('display_id', decodedToken.user_claims.display_id)
        this.tezgaStore.initFormData()
        this.prijavljen = true
    }

    handleFieldClick = () => {
        this.form.meta.error = ''
    }

    handleLogoutClick = async (redirectToHome = false) => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        this.tezgaStore.initFormData()
        this.prijavljen = false
        if (redirectToHome) {
            this.redirectToHome = true
        }
        return Promise.resolve()
    }
}

decorate(AuthStore, {
    form: observable,
    prijavljen: observable,
    tezga_id: observable,
    display_id: observable,
    redirectToHome: observable,
})

export default AuthStore
