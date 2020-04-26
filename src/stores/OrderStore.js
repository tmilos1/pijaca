import { observable, computed, decorate } from "mobx"
import Validator from 'validatorjs'
import AbstractFormStore from './AbstractFormStore'
import { API_URL } from './apiConf'

Validator.useLang('sr');

class OrderStore extends AbstractFormStore {
    tezga = {
        napomena: '',
        slike: [],
        proizvodi: [],
        grupe: [],
    }

    form = {
        fields: {
            naziv: {
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
                rule: 'email',
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
            napomena: {
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
    }

    naruceno = false

    fetchData = (tezga_id) => {
        fetch(API_URL + '/tezge/' + tezga_id)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else
                    return {
                        napomena: '',
                        slike: [],
                        proizvodi: [],
                        grupe: [],
                    }
            })
            .then(data => {
                this.tezga = data
                this.naruceno = false
            })
    }

get textUsloviIsporuke() {
    if (this.tezga.nacin_dostave === 'dostava') {
        switch (this.tezga.kucna_isporuka) {
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
        return "Preuzimanje kod nas na gazdinstvu, pijaci, gradu - po dogovoru."
    }
}

get iznos() {
    if (this.tezga.proizvodi.length === 0) return 0

    const iznosi = this.tezga.proizvodi.map(proizvod => proizvod.kolicina * proizvod.cena)
    return iznosi.reduce((accumulator, current) => accumulator + current)
}

handleProizvodKolicinaChange = (field) => {
    const fieldValue = field.target.value
    const izabraniKod = field.target.name

    const proizvod = this.tezga.proizvodi.find(el => el.kod_proizvoda === izabraniKod)
    proizvod.kolicina = fieldValue
}

handleNaruciClick = async () => {
    const naruci_captcha_token = await window.grecaptcha.execute(
        "6Lc1z-kUAAAAADiKHTtebSZaGy48MYsWKf5Vkvud", { action: "naruci" }
    )

    await fetch(API_URL + '/narudzbine', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            captcha_token: naruci_captcha_token,
            tezga_id: this.tezga.id,
            ime: this.form.fields.naziv.value,
            adresa: this.form.fields.adresa.value,
            email: this.form.fields.email.value,
            telefon: this.form.fields.telefon.value,
            napomena: this.form.fields.napomena.value,
            proizvodi: this.tezga.proizvodi
                .filter(proizvod => proizvod.kolicina > 0)
                .map(proizvod => {
                    return {
                        kod_proizvoda: proizvod.kod_proizvoda,
                        kolicina: proizvod.kolicina,
                        napomena: this.form.fields.napomena.value,
                    }
                }),
        })
    })

    this.naruceno = true
}
}

decorate(OrderStore, {
    form: observable,
    tezga: observable,
    naruceno: observable,
    textUsloviIsporuke: computed,
    iznos: computed,
})

export default OrderStore

