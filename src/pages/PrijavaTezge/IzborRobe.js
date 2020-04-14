import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'

import GrupaKarticaCenaRobe from '../../containers/GrupaKarticaCenaRobe'

const IzborRobe = () => {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: true,
        checkedF: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Izbor Robe
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedA}
                                        onChange={handleChange}
                                        name="checkedA"
                                        color="primary"
                                    />
                                }
                                label="Povrće"
                            />
                        </FormGroup>
                </Grid>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12} >
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedB}
                                        onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Voće"
                            />
                        </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <GrupaKarticaCenaRobe />
                </Grid>
                <Grid item xs={12} >
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedF}
                                        onChange={handleChange}
                                        name="checkedF"
                                        color="primary"
                                    />
                                }
                                label="Cveće"
                            />
                        </FormGroup>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default IzborRobe
