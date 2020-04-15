import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormControl from '@material-ui/core/FormControl'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '100%',
    },
}))

const Adresa = observer(() => {
    const classes = useStyles()

    const { tezgaStore } = useAppContext()

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <Typography variant="h6" >
                Unesite podatke o prodavcu
            </Typography>
            <Typography variant="body" style={{color: "grey"}} gutterBottom>
                (polja sa zvezdicom *, su obavezna)
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
                        value={tezgaStore.form.fields.naziv.value}
                        error={tezgaStore.form.fields.naziv.touched && tezgaStore.form.fields.naziv.invalid}
                        helperText={tezgaStore.form.fields.naziv.error}
                        onChange={tezgaStore.onFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="adresa"
                        name="adresa"
                        label="Adresa"
                        autoComplete="adresa"
                        fullWidth
                        value={tezgaStore.form.fields.adresa.value}
                        error={tezgaStore.form.fields.adresa.touched && tezgaStore.form.fields.adresa.invalid}
                        helperText={tezgaStore.form.fields.adresa.error}
                        onChange={tezgaStore.onFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="napomena"
                        name="napomena"
                        label="Napomena"
                        autoComplete="napomena"
                        multiline
                        fullWidth
                        value={tezgaStore.form.fields.napomena.value}
                        error={tezgaStore.form.fields.napomena.touched && tezgaStore.form.fields.napomena.invalid}
                        helperText={tezgaStore.form.fields.napomena.error}
                        onChange={tezgaStore.onFieldChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        value={tezgaStore.form.fields.email.value}
                        error={tezgaStore.form.fields.email.touched && tezgaStore.form.fields.email.invalid}
                        helperText={tezgaStore.form.fields.email.error}
                        onChange={tezgaStore.onFieldChange}
                        fullWidth
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
                        value={tezgaStore.form.fields.telefon.value}
                        error={tezgaStore.form.fields.telefon.touched && tezgaStore.form.fields.telefon.invalid}
                        helperText={tezgaStore.form.fields.telefon.error}
                        onChange={tezgaStore.onFieldChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        id="vebsajt"
                        name="vebsajt"
                        label="Vebsajt"
                        type="url"
                        fullWidth
                        autoComplete="website"
                        value={tezgaStore.form.fields.vebsajt.value}
                        error={tezgaStore.form.fields.vebsajt.touched && tezgaStore.form.fields.vebsajt.invalid}
                        helperText={tezgaStore.form.fields.vebsajt.error}
                        onChange={tezgaStore.onFieldChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl className={clsx(classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">Lozinka *</InputLabel>
                        <Input
                            required
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            name="lozinka"
                            value={tezgaStore.form.fields.lozinka.value}
                            error={tezgaStore.form.fields.lozinka.touched && tezgaStore.form.fields.lozinka.invalid}
                            onChange={tezgaStore.onFieldChange}

                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    )
})

export default Adresa
