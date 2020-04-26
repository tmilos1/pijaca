import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from "react-router-dom"

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
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
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
    const { tezgaStore } = useAppContext()
    const { appStore } = useAppContext()
    const { authStore } = useAppContext()

    const [activeStep, setActiveStep] = React.useState(0)

    const handleNext = async () => {
        if (activeStep === 3) {
            const save_captcha_token = await window.grecaptcha.execute(
                "6Lc1z-kUAAAAADiKHTtebSZaGy48MYsWKf5Vkvud", { action: "registracija_save" }
            )

            if (!authStore.prijavljen) {
                const { last_id } = await tezgaStore.createTezga(save_captcha_token, appStore.grad, appStore.kod_grada)
                await tezgaStore.uploadFiles(last_id)
            } else {
                await tezgaStore.updateTezga()
                await tezgaStore.updatePassword()
                await tezgaStore.uploadFiles(authStore.tezga_id)
            }
        }

        setActiveStep(activeStep + 1)
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    useEffect(() => {
        async function fetchData() {
            await tezgaStore.fetchAuxData()
            if (authStore.prijavljen) {
                tezgaStore.prepareForEdit(authStore.tezga_id)
            }
        }
        fetchData()
    }, [tezgaStore, authStore])


    let nextButtonVisible = null
    switch (activeStep) {
        case 0:
            nextButtonVisible = tezgaStore.form.meta.isValid
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
                Sve narudžbine dobijaćete putem email-a.
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
                            <React.Fragment>
                                {getStepContent(activeStep)}
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
                            </React.Fragment>
                        )}
                </React.Fragment>
            </Paper>
        </Container>
    )
})

export default Wizard
