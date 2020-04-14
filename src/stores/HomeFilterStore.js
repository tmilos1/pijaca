import { observable, decorate } from "mobx"

class HomeFilterStore {
    filterGrupa = []
    filterProizvod = []

    constructor() {
        this.fetchData()
    }

    fetchData = () => {
        fetch('http://localhost:5000/grupe')
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
        this.filterProizvod.push({
            kodGrupe: 'POV',
            kod: 'SAR',
            naziv: 'Sargarepa',
            izabran: false
        })
        this.filterProizvod.push({
            kodGrupe: 'POV',
            kod: 'KRO',
            naziv: 'Krompir',
            izabran: false
        })
        this.filterProizvod.push({
            kodGrupe: 'VOC',
            kod: 'BAN',
            naziv: 'Banana',
            izabran: false
        })
        this.filterProizvod.push({
            kodGrupe: 'VOC',
            kod: 'JAB',
            naziv: 'Jabuka',
            izabran: false
        })
        this.filterProizvod.push({
            kodGrupe: 'MES',
            kod: 'SLA',
            naziv: 'Slanina',
            izabran: false
        })
        this.filterProizvod.push({
            kodGrupe: 'MES',
            kod: 'KOB',
            naziv: 'Kobasica',
            izabran: false
        })
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
    }

    iskljuciProizvod = (kod) => {
        const proizvod = this.filterProizvod.find(element => 
            element.kod === kod
        )
        proizvod.izabran = false
    }
}

decorate(HomeFilterStore, {
    filterGrupa: observable,
    filterProizvod: observable,
})

export default HomeFilterStore
