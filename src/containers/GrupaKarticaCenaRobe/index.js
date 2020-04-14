import React from 'react'
import Grid from '@material-ui/core/Grid'

import KarticaCenaRobe from '../../components/KarticaCenaRobe'

const GrupaKarticaCenaRobe = () => {
    return (
        <Grid container spacing={3}>
            <Grid item md={2}>
                <KarticaCenaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaCenaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaCenaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaCenaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaCenaRobe />
            </Grid>
            <Grid item md={2}>
                <KarticaCenaRobe />
            </Grid>
        </Grid>
    )
}

export default GrupaKarticaCenaRobe
