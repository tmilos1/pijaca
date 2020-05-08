import React, { useState } from 'react'
import { useParams } from "react-router-dom"

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import MuiAlert from '@material-ui/lab/Alert'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PromenaSifre = observer(() => {
    const classes = useStyles()
    let { token } = useParams()

    const { promenaSifreStore } = useAppContext()
    const [ submitted, setSubmitted ] = useState(false)

    let submitVisible = null

    if (promenaSifreStore.form.meta.isValid) {
        submitVisible = true
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handlePromeniLozinkuClick()
        }
      }

    const handlePromeniLozinkuClick = async (event) => {
        const promenjenaSifra = await promenaSifreStore.handlePromeniLozinkuClick(token)

        if (promenjenaSifra) {
            setSubmitted(true)
        }
    }

    let greskaPrijave = null
    if (promenaSifreStore.form.meta.error) {
        greskaPrijave = (
            <>
                <br />
                <br />
                <Alert severity="error">{promenaSifreStore.form.meta.error}</Alert>
                <br />
            </>
        )
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Prijava
                </Typography>
                { !submitted ? (
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lozinka1"
                        label="Lozinka"
                        type="password"
                        id="lozinka1"
                        autoComplete="current-lozinka"
                        value={promenaSifreStore.form.fields.lozinka1.value}
                        error={promenaSifreStore.form.fields.lozinka2.touched && promenaSifreStore.form.fields.lozinka1.invalid}
                        onChange={promenaSifreStore.onFieldChange}
                        onClick={promenaSifreStore.handleFieldClick}
                        onKeyPress={handleKeyPress}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lozinka2"
                        label="Ponoviti lozinku"
                        type="password"
                        id="lozinka2"
                        autoComplete="current-lozinka"
                        value={promenaSifreStore.form.fields.lozinka2.value}
                        error={promenaSifreStore.form.fields.lozinka2.touched && promenaSifreStore.form.fields.lozinka2.invalid}
                        onChange={promenaSifreStore.onFieldChange}
                        onClick={promenaSifreStore.handleFieldClick}
                        onKeyPress={handleKeyPress}
                    />
                    {greskaPrijave}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handlePromeniLozinkuClick}
                        disabled={!submitVisible}
                    >
                        Promeni lozinku
                    </Button>
                </form>
                ) : (
                    <p>
                        <Typography variant="body">
                           Lozinka je promenjena.
                           <br />
                        </Typography>
                    </p>
                )
                }
            </div>
        </Container>
    );
})

export default PromenaSifre

