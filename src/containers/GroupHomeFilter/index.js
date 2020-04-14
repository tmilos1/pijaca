import React from 'react'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: '20px',
    width: '120px'
  },
}))

const MainHomeFilter = observer(() => {
    const classes = useStyles()
    const { homeFilterStore } = useAppContext()

    const handleChange = (event) => {
        if (event.target.checked) {
            homeFilterStore.ukljuciGrupu(event.target.name)
        } else {
            homeFilterStore.iskljuciGrupu(event.target.name)
        }
    }

    return (
        <FormGroup row>
            <h2 className={classes.title}>Grupa robe: </h2>
            { homeFilterStore.filterGrupa.map( grupa => (
                <FormControlLabel
                    key={grupa.kod}
                    name={grupa.kod}
                    control={
                        <Checkbox
                            checked={grupa.izabran}
                            onChange={handleChange}
                            color="primary"
                        />
                    }
                    label={grupa.naziv}
                />

            ))}
        </FormGroup>
    )
})

export default MainHomeFilter
