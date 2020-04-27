import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import GrupaKarticaCenaRobe from '../../containers/GrupaKarticaCenaRobe'

const IzborRobe = observer(() => {
    const { tezgaStore } = useAppContext()

    return (
        <React.Fragment>
            <Container maxWidth="md">
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Izaberite grupu robe i štiklirajte "u ponudi" robu koju prodajete.
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Zatim unesite Vašu cenu kao i napomenu ako je potrebno.
                </Typography>
            </Container>
            <Typography variant="h6" gutterBottom>
                Izbor Robe
            </Typography>
            <Grid container spacing={3}>
                {tezgaStore.form.grupe.map(grupa => (
                    <React.Fragment key={grupa.kod}>
                        <Grid item xs={12}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={grupa.izabran}
                                            onChange={tezgaStore.handleGrupaChange}
                                            name={grupa.kod}
                                            color="primary"
                                        />
                                    }
                                    label={grupa.naziv}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            { grupa.izabran && 
                                <GrupaKarticaCenaRobe grupa={grupa.kod}/>
                            }
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="primedba"
                        name="primedba"
                        label="Primedba - imate neki proizvod koji nije na spisku?"
                        autoComplete="primedba"
                        multiline
                        fullWidth
                        rows={4}

                        value={tezgaStore.form.fields.primedba.value}
                        error={tezgaStore.form.fields.primedba.touched && tezgaStore.form.fields.primedba.invalid}
                        helperText={tezgaStore.form.fields.primedba.error}
                        onChange={tezgaStore.onFieldChange}
                        onKeyPress={tezgaStore.onKeyPress}
                        onFocus={tezgaStore.onFocus}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
})

export default IzborRobe
