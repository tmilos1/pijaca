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

const SubHomeFilter = observer(() => {
    const classes = useStyles()
    const { homeFilterStore } = useAppContext()

    const handleChange = (event) => {
        if (event.target.checked) {
            homeFilterStore.ukljuciPodGrupu(event.target.name)
        } else {
            homeFilterStore.iskljuciPodGrupu(event.target.name)
        }
    }

    return (
        <>
            {homeFilterStore.filterGrupa.filter(el => el.izabran).map(grupa => (
                <FormGroup row key={grupa.kod}>
                    <h2 className={classes.title}>{grupa.naziv}: </h2>
                    {homeFilterStore.filterPodGrupa.filter(el => el.kodGrupe === grupa.kod).map(podgrupa => (
                        <FormControlLabel
                            key={podgrupa.kod}
                            name={podgrupa.kod}
                            control={
                                <Checkbox
                                    checked={podgrupa.izabran}
                                    onChange={handleChange}
                                    color="primary"
                                />
                            }
                            label={podgrupa.naziv}
                        />
                    ))}
                </FormGroup>
            ))}
        </>
    )
})

export default SubHomeFilter
