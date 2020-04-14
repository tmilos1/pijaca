import { observable, computed, decorate } from "mobx"

class HomeFilterStore {
    filterGrupa = []
    filterPodGrupa = []

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
        this.filterPodGrupa.push({
            kodGrupe: 'POV',
            kod: 'SAR',
            naziv: 'Sargarepa',
            izabran: false
        })
        this.filterPodGrupa.push({
            kodGrupe: 'POV',
            kod: 'KRO',
            naziv: 'Krompir',
            izabran: false
        })
        this.filterPodGrupa.push({
            kodGrupe: 'VOC',
            kod: 'BAN',
            naziv: 'Banana',
            izabran: false
        })
        this.filterPodGrupa.push({
            kodGrupe: 'VOC',
            kod: 'JAB',
            naziv: 'Jabuka',
            izabran: false
        })
        this.filterPodGrupa.push({
            kodGrupe: 'MES',
            kod: 'SLA',
            naziv: 'Slanina',
            izabran: false
        })
        this.filterPodGrupa.push({
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

    ukljuciPodGrupu = (kod) => {
        const podGrupa = this.filterPodGrupa.find(element => 
            element.kod === kod
        )
        podGrupa.izabran = true
    }

    iskljuciPodGrupu = (kod) => {
        const podGrupa = this.filterPodGrupa.find(element => 
            element.kod === kod
        )
        podGrupa.izabran = false
    }
}

decorate(HomeFilterStore, {
    filterGrupa: observable,
    filterPodGrupa: observable,
})

export default HomeFilterStore
