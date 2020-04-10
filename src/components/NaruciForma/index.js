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

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '100%',
    },
}))

const NaruciForma = () => {
    const classes = useStyles()

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="adresa"
                        name="adresa"
                        label="Adresa"
                        autoComplete="adresa"
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
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        autoComplete="email"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default NaruciForma

