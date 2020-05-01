import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from "react-router-dom"
import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import Adresa from './Adresa'
import UsloviIsporuke from './UsloviIsporuke'
import GalerijaSlika from './GalerijaSlika'
import IzborRobe from './IzborRobe'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
        overflow: "hidden",
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    deleteButton: {
        display: 'flex',
        justifyContent: 'flex-beginning',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    loadingIndicator: {
        margin: "0 auto"
    },
}))


const steps = ['Podaci o prodavcu', 'Uslovi isporuke', 'Galerija slika', 'Izbor robe'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <Adresa />
        case 1:
            return <UsloviIsporuke />
        case 2:
            return <GalerijaSlika />
        case 3:
            return <IzborRobe />
        default:
            throw new Error('Nepoznat korak')
    }
}

const Wizard = observer(() => {
    const classes = useStyles()
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)

    const { tezgaStore } = useAppContext()
    const { appStore } = useAppContext()
    const { authStore } = useAppContext()
    const { homeFilterStore } = useAppContext()

    const [activeStep, setActiveStep] = React.useState(0)

    const handleNext = async () => {
        if (activeStep === 3) {
            const save_captcha_token = await window.grecaptcha.execute(
                "6Lc1z-kUAAAAADiKHTtebSZaGy48MYsWKf5Vkvud", { action: "registracija_save" }
            )

            tezgaStore.form.savingData = true
            if (!authStore.prijavljen) {
                const { last_id } = await tezgaStore.createTezga(save_captcha_token, appStore.grad, appStore.kod_grada)
                await tezgaStore.uploadFiles(last_id)
                tezgaStore.initFormData()
            } else {
                await tezgaStore.updateTezga()
                await tezgaStore.updatePassword()
                await tezgaStore.uploadFiles(authStore.tezga_id)
                await tezgaStore.updateNaslovna()
            }
            homeFilterStore.fetchTezge()
            tezgaStore.form.savingData = false
        }

        setActiveStep(activeStep + 1)
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    useEffect(() => {
        async function fetchData() {
            await tezgaStore.fetchData(authStore.prijavljen, authStore.tezga_id)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    let nextButtonVisible = null
    let deleteButtonVisible = false

    switch (activeStep) {
        case 0:
            nextButtonVisible = tezgaStore.form.meta.isValid
            if (authStore.prijavljen) {
                deleteButtonVisible = true
            }
            break;

        case 3:
            if (tezgaStore.form.proizvodi.filter(pr => pr.izabran === true).length > 0) {
                nextButtonVisible = true
            }
            break;

        default:
            nextButtonVisible = true
            break;
    }

    let dugmeSnimiLabela = 'Prijavi tezgu'
    let hvalaPoruka = (
        <>
            <Typography variant="h5" gutterBottom>
                Hvala na prijavi!
            </Typography>
            <Typography variant="subtitle1">
                Nakon što pregledamo prijavu, pojaviće se na sajtu.
                Sve porudžbine dobijaćete putem email-a.
            </Typography>
        </>
    )

    if (authStore.prijavljen) {
        dugmeSnimiLabela = 'Snimi promene'
        hvalaPoruka = (
            <>
                <Typography variant="h5" gutterBottom>
                    Vaše promene su snimljene!
                </Typography>
            </>
        )
    }
  
    const handleOpenDeleteConfirm = () => {
      setOpenDeleteConfirm(true)
    }
  
    const handleCloseDeleteConfirm = () => {
      setOpenDeleteConfirm(false)
    }

    const handleDeleteTezga = async () => {
        setOpenDeleteConfirm(false)
        await tezgaStore.deleteTezga()
        await authStore.handleLogoutClick(true)
        await homeFilterStore.fetchTezge()
    }

    return (
        <Container>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    {authStore.prijavljen ?
                        "Izmena tezge br. " + authStore.tezga_id: "Prijava nove tezge!"
                    }
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            {hvalaPoruka}
                            <br />
                            <Button variant="contained" color="primary" component={Link} to={'/'}>
                                Povratak na naslovnu stranu!
                            </Button>
                        </React.Fragment>
                    ) : (
                            <>
                            {tezgaStore.form.savingData ? (
                                <CircularProgress className={classes.loadingIndicator} /> 
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            {deleteButtonVisible &&
                                                <div className={classes.deleteButton}>
                                                    <Button
                                                        variant="outlined"
                                                        className={classes.button}
                                                        disabled={!deleteButtonVisible}
                                                        onClick={handleOpenDeleteConfirm}
                                                    >
                                                        Obriši tezgu
                                                    </Button>
                                                    <Dialog
                                                        open={openDeleteConfirm}
                                                        onClose={handleCloseDeleteConfirm}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                Da li želite da obrišete tezgu?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleCloseDeleteConfirm} color="primary">
                                                                Ne
                                                            </Button>
                                                            <Button onClick={handleDeleteTezga} color="primary" autoFocus>
                                                                Da
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>
                                            }
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className={classes.buttons}>
                                                {activeStep !== 0 && (
                                                    <Button onClick={handleBack} className={classes.button}>
                                                        Prethodno
                                                    </Button>
                                                )}
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleNext}
                                                        className={classes.button}
                                                        disabled={!nextButtonVisible}
                                                    >
                                                        {activeStep === steps.length - 1 ? dugmeSnimiLabela : 'Sledeće'}
                                                    </Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            )}
                            </>
                        )}
                </React.Fragment>
            </Paper>
        </Container>
    )
})

export default Wizard
