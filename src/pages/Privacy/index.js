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

const Privacy = observer(() => {
    const classes = useStyles()

    return (
        <main>
            <div className={classes.toolbarMargin}>
                <Container >
                    <Typography variant="body" gutterBottom>
                    Sajt napijaci.rs za svoje funkcionisanje koristi izuzetno mali set informacija o svojim posetiocima poštujući njihovu privatnost.
                    </Typography>
                    <br />
                    <br />

                </Container>
            </div>
        </main>
    )
})

export default Privacy


