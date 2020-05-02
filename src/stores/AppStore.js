import { observable, computed, decorate } from "mobx"

class AppStore {
    kod_grada = 'KS'
    grad = 'Kruševac'
    initial_load = true

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
