import { observable, decorate } from "mobx"

class AppStore {
    kod_grada = 'KS'
    grad = 'Kruševac'
    initialLoad = true
}

decorate(AppStore, {
    kod_grada: observable,
    grad: observable,
    initialLoad: observable,
})

export default AppStore
