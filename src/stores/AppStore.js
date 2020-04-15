import { observable, decorate } from "mobx"

class AppStore {
    kod_grada = 'KS'
    grad = 'Krusevac'
}

decorate(AppStore, {
    kod_grada: observable,
    grad: observable,
})

export default AppStore
