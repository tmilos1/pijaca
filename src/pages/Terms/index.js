import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import '@brainhubeu/react-carousel/lib/style.css'

import { makeStyles } from '@material-ui/core/styles'

import { observer } from "mobx-react"

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        padding: theme.spacing(4, 0, 4)
    },
    paperPadding: {
        padding: theme.spacing(3, 3, 3)
    }
}))

const Terms = observer(() => {
    const classes = useStyles()

    return (
        <main>
            <div className={classes.toolbarMargin}>
                <Container >
                    <Typography variant="body" gutterBottom>
                    Korišćenjem bilo kog dela napijaci.rs sajta, saglasni ste i prihvatate sve navedene uslove korišćenja.
                    <br />
                    <br />

                    Ni jedan deo sajta napijaci.rs ne sme se koristiti u nezakonite svrhe, niti za promovisanje istih.
                    <br />
                    <br />

                    napijaci.rs pruža svoje servise korisnicima u dobroj nameri. Sve servise sajta napijaci.rs koristite na vlastitu odgovornost i napijaci.rs se ne mogu smatrati odgovornim za bilo kakvu štetu nastalu korišćenjem.
                    <br />
                    <br />

                    Svi posetioci imaju pravo da besplatno koriste servise sajta napijaci.rs, ukoliko ne krše uslove korišćenja.
                    <br />
                    <br />
                    </Typography>
                    <br />
                    <br />

                </Container>
            </div>
        </main>
    )
})

export default Terms

