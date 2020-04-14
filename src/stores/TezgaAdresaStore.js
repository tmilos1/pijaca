import { observable, decorate } from "mobx"
import Validator from 'validatorjs'
import AbstractFormStore from './AbstractFormStore'

Validator.useLang('sr');

class TezgaAdresaStore extends AbstractFormStore {
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
        }
    }

    //constructor() {
        //Validator.registerAsync('email_available', function(username, attribute, req, passes) {
            // do your database/api checks here etc
            // then call the `passes` method where appropriate:
            // passes(); // if username is available
            // passes(false, 'Ovaj email je već korišćen za drugu tezgu.'); // if username is not available
          //});
    //}
}

decorate(TezgaAdresaStore, {
    form: observable,
})

export default TezgaAdresaStore
