import { observable, decorate } from "mobx"

class AppStore {
    kod_grada = 'KS'
    grad = 'Krusevac'
    initialLoad = true
}

decorate(AppStore, {
    kod_grada: observable,
    grad: observable,
    initialLoad: observable,
})

export default AppStore
