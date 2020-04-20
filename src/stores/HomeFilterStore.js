import { observable, decorate } from "mobx"
import { API_URL } from './apiConf'

class HomeFilterStore {
    filterGrupa = []
    filterProizvod = []
    tezge = []

    constructor() {
        this.fetchData()
        this.fetchTezge()
    }

    fetchData = () => {
        fetch(API_URL + '/grupe')
            .then((response) => {
                return response.json()
            })
            .then(data => {
                for (const row of data) {
                    this.filterGrupa.push({
                        kod: row.kod,
                        naziv: row.naziv,
                        izabran: false
                    })
                }
            })


        let url = new URL(API_URL + '/proizvodi'),
            params = { 'order': 'naziv' }

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then(data => {
                for (const row of data) {
                    this.filterProizvod.push({
                        kodGrupe: row.kod_grupe,
                        kod: row.kod,
                        naziv: row.naziv,
                        izabran: false
                    })
                }
            })
    }

    fetchTezge = () => {
        let url = new URL(API_URL + '/tezge/filter'),
            params = { 'proizvodi': this.filterProizvod
                .filter(el => el.izabran === true)
                .map(el => el.kod)
            }

        fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            this.tezge = []
            for (const row of data) {
                this.tezge.push({
                    id: row.id,
                    naziv: row.naziv,
                    napomena: row.napomena,
                    slika: row.slika
                })
            }
            this.dodajDemoTezge()
        })
    }

    dodajDemoTezge = () => {
        const ukupnoIzBaze = this.tezge.length
        for (let i = 0; i < 20 - ukupnoIzBaze; i++) {
            this.tezge.push({
                id: 99999 + i,
                naziv: 'Slobodna tezga',
                napomena: 'Ovo je mesto za Vašu tezgu. Prijavite se besplatno!',
                slika: this.getStandImage()
            })
        }
    }
       
    getStandImage = () => {
        const random = this.getRandomInt(4) + 1
        return `images/tezga00${random}.png`
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    ukljuciGrupu = (kod) => {
        const grupa = this.filterGrupa.find(element => 
            element.kod === kod
        )
        grupa.izabran = true
    }

    iskljuciGrupu = (kod) => {
        const grupa = this.filterGrupa.find(element => 
            element.kod === kod
        )
        grupa.izabran = false
    }

    ukljuciProizvod = (kod) => {
        const proizvod = this.filterProizvod.find(element => 
            element.kod === kod
        )
        proizvod.izabran = true
        this.fetchTezge()
    }

    iskljuciProizvod = (kod) => {
        const proizvod = this.filterProizvod.find(element => 
            element.kod === kod
        )
        proizvod.izabran = false
        this.fetchTezge()
    }
}

decorate(HomeFilterStore, {
    filterGrupa: observable,
    filterProizvod: observable,
    tezge: observable,
})

export default HomeFilterStore
