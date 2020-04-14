import { observable, decorate } from "mobx"
import Validator from 'validatorjs'
import AbstractFormStore from './AbstractFormStore'

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
            adresa: {
                rule: 'string',
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
            email: {
                rule: 'required|email',
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
            vebsajt: {
                rule: 'url',
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
        },
        meta: {
            isValid: false,
            error: null
        },
        nacinDostave: 'dostava',
        kucnaDostava: '300din',
        files: [],
    }

    //constructor() {
        //Validator.registerAsync('email_available', function(username, attribute, req, passes) {
            // do your database/api checks here etc
            // then call the `passes` method where appropriate:
            // passes(); // if username is available
            // passes(false, 'Ovaj email je već korišćen za drugu tezgu.'); // if username is not available
          //});
    //}

    handleNacinDostaveChange = (event) => {
        this.form.nacinDostave = event.target.value
    }

    handleKucnaDostavaChange = (event) => {
        this.form.kucnaDostava = event.target.value
    }

    handleFilesChange = (files) => {
        this.form.files = files
        console.log(files)
    }
}

decorate(TezgaStore, {
    form: observable,
})

export default TezgaStore
