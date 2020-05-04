import React from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        padding: theme.spacing(4, 0, 4)
    },
    paperPadding: {
        padding: theme.spacing(3, 3, 3)
    }
}))

const Tezga = observer(() => {
    const classes = useStyles()
    const { kontaktStore } = useAppContext()

    let posaljiVisible = false
    if (kontaktStore.form.meta.isValid) {
        posaljiVisible = true
    }
    return (
        <main>
            <div className={classes.toolbarMargin}>
                <Container >
                    <Typography variant="h6" gutterBottom>
                        Kontakt
                    </Typography>
                    <br />
                    <br />
                    {kontaktStore.poslato ? (
                        <p>
                            Hvala što ste nas kontaktirali.<br />

                            Odgovor ćete dobiti u što kraćem roku.<br />

                            Vaš e-mail je uspešno prosleđen! <br />
                        </p>
                    ) : (
                            <>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="naziv"
                                            name="naziv"
                                            label="Ime"
                                            required
                                            autoComplete="ime"
                                            value={kontaktStore.form.fields.naziv.value}
                                            error={kontaktStore.form.fields.naziv.touched && kontaktStore.form.fields.naziv.invalid}
                                            helperText={kontaktStore.form.fields.naziv.error}
                                            onChange={kontaktStore.onFieldChange}
                                        />
                                        <br />
                                        <br />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            required
                                            autoComplete="email"
                                            value={kontaktStore.form.fields.email.value}
                                            error={kontaktStore.form.fields.email.touched && kontaktStore.form.fields.email.invalid}
                                            helperText={kontaktStore.form.fields.email.error}
                                            onChange={kontaktStore.onFieldChange}
                                        />
                                        <br />
                                        <br />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="poruka"
                                            name="poruka"
                                            label="Poruka"
                                            required
                                            multiline
                                            fullWidth
                                            rows={4}
                                            value={kontaktStore.form.fields.poruka.value}
                                            error={kontaktStore.form.fields.poruka.touched && kontaktStore.form.fields.poruka.invalid}
                                            helperText={kontaktStore.form.fields.poruka.error}
                                            onChange={kontaktStore.onFieldChange}
                                        />
                                        <br />
                                        <br />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <br />
                                        <br />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={kontaktStore.handlePosaljiClick}
                                            disabled={!posaljiVisible}
                                        >
                                            Pošalji
                            </Button>
                                    </Grid>
                                </Grid>
                            </>
                        )}

                    <br />
                    <br />
                    <br />
                    <br />
                    <pre>
                        Agencija "Kodvel"<br />
                        <br />
                        Matični broj 62650842<br />
                        PIB 107307040<br />
                        Tekući račun Banca Intesa 160-362300-61<br />
                        Tel: 063 16 11 977<br />
                        Sajt: <a href="https://kodvel.co.rs">https://kodvel.co.rs</a><br />
                    </pre>

                </Container>
            </div>
        </main>
    )
})

export default Tezga

