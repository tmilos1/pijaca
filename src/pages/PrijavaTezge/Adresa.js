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

    const { tezgaAdresaStore } = useAppContext()
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
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
                        value={tezgaAdresaStore.form.fields.naziv.value}
                        error={tezgaAdresaStore.form.fields.naziv.touched && tezgaAdresaStore.form.fields.naziv.invalid}
                        helperText={tezgaAdresaStore.form.fields.naziv.error}
                        onChange={tezgaAdresaStore.onFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="adresa"
                        name="adresa"
                        label="Adresa"
                        autoComplete="adresa"
                        fullWidth
                        value={tezgaAdresaStore.form.fields.adresa.value}
                        error={tezgaAdresaStore.form.fields.adresa.touched && tezgaAdresaStore.form.fields.adresa.invalid}
                        helperText={tezgaAdresaStore.form.fields.adresa.error}
                        onChange={tezgaAdresaStore.onFieldChange}
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
                        value={tezgaAdresaStore.form.fields.napomena.value}
                        error={tezgaAdresaStore.form.fields.napomena.touched && tezgaAdresaStore.form.fields.napomena.invalid}
                        helperText={tezgaAdresaStore.form.fields.napomena.error}
                        onChange={tezgaAdresaStore.onFieldChange}
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
                        value={tezgaAdresaStore.form.fields.email.value}
                        error={tezgaAdresaStore.form.fields.email.touched && tezgaAdresaStore.form.fields.email.invalid}
                        helperText={tezgaAdresaStore.form.fields.email.error}
                        onChange={tezgaAdresaStore.onFieldChange}
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
                        value={tezgaAdresaStore.form.fields.telefon.value}
                        error={tezgaAdresaStore.form.fields.telefon.touched && tezgaAdresaStore.form.fields.telefon.invalid}
                        helperText={tezgaAdresaStore.form.fields.telefon.error}
                        onChange={tezgaAdresaStore.onFieldChange}
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
                        value={tezgaAdresaStore.form.fields.vebsajt.value}
                        error={tezgaAdresaStore.form.fields.vebsajt.touched && tezgaAdresaStore.form.fields.vebsajt.invalid}
                        helperText={tezgaAdresaStore.form.fields.vebsajt.error}
                        onChange={tezgaAdresaStore.onFieldChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl className={clsx(classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">Lozinka *</InputLabel>
                        <Input
                            required
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            // value={values.password}
                            // onChange={handleChange('password')}

                            name="lozinka"
                            value={tezgaAdresaStore.form.fields.lozinka.value}
                            error={tezgaAdresaStore.form.fields.lozinka.touched && tezgaAdresaStore.form.fields.lozinka.invalid}
                            onChange={tezgaAdresaStore.onFieldChange}

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
