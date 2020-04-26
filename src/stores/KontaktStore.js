import { observable, computed, decorate } from "mobx"
import Validator from 'validatorjs'
import AbstractFormStore from './AbstractFormStore'
import { API_URL } from './apiConf'

Validator.useLang('sr');

class KontaktStore extends AbstractFormStore {
    form = {
        fields: {
            naziv: {
                rule: 'required|string',
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
            poruka: {
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
    poslato = false;

    handlePosaljiClick = async () => {
        const naruci_captcha_token = await window.grecaptcha.execute(
            "6Lc1z-kUAAAAADiKHTtebSZaGy48MYsWKf5Vkvud", { action: "kontakt" }
        )

        await fetch(API_URL + '/kontakt', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                captcha_token: naruci_captcha_token,
                naziv: this.form.fields.naziv.value,
                email: this.form.fields.email.value,
                poruka: this.form.fields.poruka.value,
            })
        })

        this.poslato = true
    }
}

decorate(KontaktStore, {
    form: observable,
    poslato: observable,
})

export default KontaktStore
