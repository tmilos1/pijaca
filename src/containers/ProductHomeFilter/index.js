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

const ProductHomeFilter = observer(() => {
    const classes = useStyles()
    const { homeFilterStore } = useAppContext()

    const handleChange = (event) => {
        if (event.target.checked) {
            homeFilterStore.ukljuciProizvod(event.target.name)
        } else {
            homeFilterStore.iskljuciProizvod(event.target.name)
        }
    }

    return (
        <>
            {homeFilterStore.filterGrupa.filter(el => el.izabran).map(grupa => (
                <FormGroup row key={grupa.kod}>
                    <h2 className={classes.title}>{grupa.naziv}: </h2>
                    {homeFilterStore.filterProizvod.filter(el => el.kodGrupe === grupa.kod).map(proizvod => (
                        <FormControlLabel
                            key={proizvod.kod}
                            name={proizvod.kod}
                            control={
                                <Checkbox
                                    checked={proizvod.izabran}
                                    onChange={handleChange}
                                    color="primary"
                                />
                            }
                            label={proizvod.naziv}
                        />
                    ))}
                </FormGroup>
            ))}
        </>
    )
})

export default ProductHomeFilter
