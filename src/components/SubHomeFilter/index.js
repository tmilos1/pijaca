import React from 'react'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: '20px',
    width: '120px'
  },
}))

const SubHomeFilter = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <FormGroup row>
            <h2 className={classes.title}>Podgrupa: </h2>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Banane"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Kruške"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Jabuke"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Šljive"
            />
        </FormGroup>
    )
}

export default SubHomeFilter
