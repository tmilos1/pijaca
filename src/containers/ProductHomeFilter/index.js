import React from 'react'

// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

// import { makeStyles } from '@material-ui/core/styles'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

// const useStyles = makeStyles((theme) => ({
//     title: {
//         marginRight: '20px',
//         width: '120px'
//     },
// }))

const ProductHomeFilter = observer((props) => {
    // const classes = useStyles()
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
            {homeFilterStore.filterProizvod.filter(el => el.kodGrupe === props.grupa).map(proizvod => (
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
        </>
    )
})

export default ProductHomeFilter
