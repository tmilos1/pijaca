import React from 'react'
import Grid from '@material-ui/core/Grid'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import KarticaKolicinaRobe from '../../components/KarticaKolicinaRobe'

const GrupaKarticaKolicinaRobe = observer((props) => {
    const { orderStore } = useAppContext()

    return (
        <Grid container spacing={3}>

            {orderStore.tezga.proizvodi
                    .filter(proizvod => proizvod.kod_grupe === props.kodGrupe) 
                    .map(proizvod => (

                        <Grid item md={2} key={proizvod.kod_proizvoda} >
                            <KarticaKolicinaRobe proizvod={proizvod} />
                        </Grid>

            ))}

        </Grid>
    )
})

export default GrupaKarticaKolicinaRobe
