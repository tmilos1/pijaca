import { observable, computed, decorate } from "mobx"

class AppStore {
    kod_grada = ''
    grad = ''
    initial_load = true

    constructor() {
        // const subdomain = window.location.host.split('.')[0]
        // if (!subdomain || subdomain === 'ks') {
            this.kod_grada = 'KS'
            this.grad = 'Kruševac'
        // }
    }

    get site_url() {
        let grad = null
        switch(this.kod_grada) {
            case 'KS':
            default:
                grad = 'krusevac';
                break;
        }

        return process.env.REACT_APP_BASE_PROTOCOL + '://' + grad + '.' + process.env.REACT_APP_BASE_HOST
    }
}

decorate(AppStore, {
    kod_grada: observable,
    grad: observable,
    initial_load: observable,
    site_url: computed,
})

export default AppStore
