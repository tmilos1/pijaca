import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import GrupaKarticaCenaRobe from '../../containers/GrupaKarticaCenaRobe'

const IzborRobe = observer(() => {
    const { tezgaStore } = useAppContext()

    // const [state, setState] = React.useState({
    //     checkedA: false,
    //     checkedB: true,
    //     checkedF: false,
    // });

    // const handleChange = (event) => {
    //     setState({ ...state, [event.target.name]: event.target.checked });
    // };

    return (
        <React.Fragment>
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
                                <GrupaKarticaCenaRobe />
                            }
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </React.Fragment>
    )
})

export default IzborRobe
