import React from 'react'
import Grid from '@material-ui/core/Grid'

import KarticaRobe from '../../components/KarticaRobe'

const GrupaKarticaRobe = () => {
    return (
        <Grid container spacing={3}>
            <Grid item md={2}>
                <KarticaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaRobe />
            </Grid>
        </Grid>
    )
}

export default GrupaKarticaRobe
