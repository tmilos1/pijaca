import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

const NaruciForma = observer(() => {

    const { orderStore } = useAppContext()

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
               Adresa za isporuku: 
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="naziv"
                        name="naziv"
                        label="Ime i prezime"
                        fullWidth
                        autoComplete="ime"
                        value={orderStore.form.fields.naziv.value}
                        error={orderStore.form.fields.naziv.touched && orderStore.form.fields.naziv.invalid}
                        helperText={orderStore.form.fields.naziv.error}
                        onChange={orderStore.onFieldChange}
                        onKeyPress={orderStore.onKeyPress}
                        onFocus={orderStore.onFocus}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="adresa"
                        name="adresa"
                        label="Adresa"
                        autoComplete="adresa"
                        fullWidth
                        value={orderStore.form.fields.adresa.value}
                        error={orderStore.form.fields.adresa.touched && orderStore.form.fields.adresa.invalid}
                        helperText={orderStore.form.fields.adresa.error}
                        onChange={orderStore.onFieldChange}
                        onKeyPress={orderStore.onKeyPress}
                        onFocus={orderStore.onFocus}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        required
                        id="telefon"
                        name="telefon"
                        label="Telefon"
                        fullWidth
                        autoComplete="telefon"
                        value={orderStore.form.fields.telefon.value}
                        error={orderStore.form.fields.telefon.touched && orderStore.form.fields.telefon.invalid}
                        helperText={orderStore.form.fields.telefon.error}
                        onChange={orderStore.onFieldChange}
                        onKeyPress={orderStore.onKeyPress}
                        onFocus={orderStore.onFocus}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        autoComplete="email"
                        fullWidth
                        value={orderStore.form.fields.email.value}
                        error={orderStore.form.fields.email.touched && orderStore.form.fields.email.invalid}
                        helperText={orderStore.form.fields.email.error}
                        onChange={orderStore.onFieldChange}
                        onKeyPress={orderStore.onKeyPress}
                        onFocus={orderStore.onFocus}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={7}>
                    <TextField
                        id="napomena"
                        name="napomena"
                        label="Napomena"
                        autoComplete="napomena"
                        multiline
                        fullWidth
                        value={orderStore.form.fields.napomena.value}
                        error={orderStore.form.fields.napomena.touched && orderStore.form.fields.napomena.invalid}
                        helperText={orderStore.form.fields.napomena.error}
                        onChange={orderStore.onFieldChange}
                        onKeyPress={orderStore.onKeyPress}
                        onFocus={orderStore.onFocus}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
})


export default NaruciForma

