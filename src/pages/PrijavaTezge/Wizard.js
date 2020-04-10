import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from "react-router-dom"

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

const Wizard = () => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)

    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    return (
        <Container>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Prijava nove tezge!
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
                            <Typography variant="h5" gutterBottom>
                                Hvala na prijavi!
                            </Typography>
                            <Typography variant="subtitle1">
                                Nakon što pregledamo prijavu, pojaviće se na sajtu.
                                Sve porudžbine dobijaćete putem email-a.
                            </Typography>
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
                                    >
                                        {activeStep === steps.length - 1 ? 'Podnesi prijavu' : 'Sledeće'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                </React.Fragment>
            </Paper>
        </Container>
    )
}

export default Wizard
