import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

const Adresa = () => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Podaci o prodavcu
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="naziv"
                        name="naziv"
                        label="Ime i prezime ili naziv gazdinstva"
                        fullWidth
                        autoComplete="ime"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="adresa"
                        name="adresa"
                        label="Adresa"
                        autoComplete="adresa"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="telefon"
                        name="telefon"
                        label="Telefon"
                        fullWidth
                        autoComplete="telefon"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Adresa
