import React from 'react'
import {Redirect} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
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

const SignIn = observer(() => {
    const classes = useStyles()
    const { authStore } = useAppContext()

    let loginVisible = null

    if (authStore.form.meta.isValid) {
        loginVisible = true
    }

    let greskaPrijave = null
    if (authStore.form.meta.error) {
        greskaPrijave = (
            <>
                <br />
                <br />
                <Alert severity="error">{authStore.form.meta.error}</Alert>
                <br />
            </>
        )
    }
    return (
        <Container component="main" maxWidth="xs">
            {authStore.prijavljen && <Redirect to="/" />}

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Prijava
                </Typography>
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
                        value={authStore.form.fields.email.value}
                        error={authStore.form.fields.email.touched && authStore.form.fields.email.invalid}
                        helperText={authStore.form.fields.email.error}
                        onChange={authStore.onFieldChange}
                        onClick={authStore.handleFieldClick}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Lozinka"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={authStore.form.fields.password.value}
                        error={authStore.form.fields.password.touched && authStore.form.fields.password.invalid}
                        helperText={authStore.form.fields.password.error}
                        onChange={authStore.onFieldChange}
                        onClick={authStore.handleFieldClick}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Zapamti me"
                    /> */}
                    {greskaPrijave}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={authStore.handleLoginClick}
                        disabled={!loginVisible}
                    >
                        Prijava
                    </Button>
                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Zaboravljena lozinka?
                        </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
        </Container>
    );
})

export default SignIn
