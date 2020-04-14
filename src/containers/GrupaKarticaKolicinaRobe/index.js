import React from 'react'
import Grid from '@material-ui/core/Grid'

import KarticaKolicinaRobe from '../../components/KarticaKolicinaRobe'

const GrupaKarticaKolicinaRobe = () => {
    return (
        <Grid container spacing={3}>
            <Grid item md={2}>
                <KarticaKolicinaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaKolicinaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaKolicinaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaKolicinaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaKolicinaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaKolicinaRobe />
            </Grid>
        </Grid>
    )
}

export default GrupaKarticaKolicinaRobe
