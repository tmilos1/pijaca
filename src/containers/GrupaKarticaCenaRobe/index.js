import React from 'react'
import Grid from '@material-ui/core/Grid'

import KarticaCenaRobe from '../../components/KarticaCenaRobe'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

const GrupaKarticaCenaRobe = observer((props) => {
    const { tezgaStore } = useAppContext()

    return (
        <Grid container spacing={3}>
            {tezgaStore.form.proizvodi.filter(proizvod => props.grupa === proizvod.kod_grupe).map(proizvod => (
                <Grid key={proizvod.kod} item xs={6} sm={4} md={2} xl={2}>
                    <KarticaCenaRobe proizvod={proizvod}/>
                </Grid>
            ))}
        </Grid>
    )
})

export default GrupaKarticaCenaRobe
