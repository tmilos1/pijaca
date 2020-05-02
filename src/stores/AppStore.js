import { observable, computed, decorate } from "mobx"

class AppStore {
    kod_grada = ''
    grad = ''
    initial_load = true

    constructor() {
        const subdomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : false
        if (!subdomain || subdomain === 'ks') {
            this.kod_grada = 'KS'
            this.grad = 'Kruševac'
        }
    }

    get site_url() {
        return process.env.REACT_APP_BASE_PROTOCOL + '://' 
            + this.kod_grada.toLowerCase() + '.' + process.env.REACT_APP_BASE_HOST
    }
}

decorate(AppStore, {
    kod_grada: observable,
    grad: observable,
    initial_load: observable,
    site_url: computed,
})

export default AppStore
