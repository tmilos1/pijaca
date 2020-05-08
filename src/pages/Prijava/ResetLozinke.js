import React, { useState } from 'react'

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

const ResetLozinke = observer(() => {
    const classes = useStyles()
    const { resetLozinkeStore } = useAppContext()
    const [ submitted, setSubmitted ] = useState(false)

    let submitVisible = null

    if (resetLozinkeStore.form.meta.isValid) {
        submitVisible = true
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleResetClick()
        }
      }

    const handleResetClick = (event) => {
        resetLozinkeStore.handleResetClick()
        setSubmitted(true)
    }


    let greskaPrijave = null
    if (resetLozinkeStore.form.meta.error) {
        greskaPrijave = (
            <>
                <br />
                <br />
                <Alert severity="error">{resetLozinkeStore.form.meta.error}</Alert>
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
                    Reset Lozinke
                </Typography>
                { !submitted ? (
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={resetLozinkeStore.form.fields.email.value}
                        error={resetLozinkeStore.form.fields.email.touched && resetLozinkeStore.form.fields.email.invalid}
                        helperText={resetLozinkeStore.form.fields.email.error}
                        onChange={resetLozinkeStore.onFieldChange}
                        onClick={resetLozinkeStore.handleFieldClick}
                        onKeyPress={handleKeyPress}
                    />
                    {greskaPrijave}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleResetClick}
                        disabled={!submitVisible}
                    >
                        Resetuj lozinku
                    </Button>
                </form>
                ) : (
                    <p>
                        <Typography variant="body">
                           Poslali smo Vam uputstvo za resetovanje lozinke. 
                           Proverite Vaš email.
                           <br />
                           <br />
                           Hvala
                        </Typography>
                    </p>
                )
                }
            </div>
        </Container>
    );
})

export default ResetLozinke
