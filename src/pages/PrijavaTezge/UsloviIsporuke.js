import React from 'react'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Typography from '@material-ui/core/Typography'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

const UsloviIsporuke = observer(() => {
    const { tezgaStore } = useAppContext()

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Izaberite način isporuke:</FormLabel>
            <RadioGroup aria-label="usloviIsporuke" name="usloviIsporuke" value={tezgaStore.form.nacinDostave} onChange={tezgaStore.handleNacinDostaveChange}>
                <FormControlLabel value="dostava" control={<Radio />} label="Dostava" />
                <Typography variant="subtitle1">
                    Dostava na kućnu adresu. Besplatno preko:
                </Typography>

                {tezgaStore.form.nacinDostave === 'dostava' ? 
                        <FormControl style={{marginLeft: '100px'}} component="fieldset">
                            <RadioGroup aria-label="usloviIsporuke" name="usloviIsporuke" value={tezgaStore.form.kucnaDostava} onChange={tezgaStore.handleKucnaDostavaChange}>
                                <FormControlLabel value="uvek" control={<Radio />} label="Uvek" />
                                <FormControlLabel value="300din" control={<Radio />} label="300 din" />
                                <FormControlLabel value="500din" control={<Radio />} label="500 din" />
                                <FormControlLabel value="700din" control={<Radio />} label="700 din" />
                            </RadioGroup>
                        </FormControl>
                : ''}

                <FormControlLabel value="preuzimanje" control={<Radio />} label="Preuzimanje" />
                <Typography variant="subtitle1">
                    Preuzimanje kod nas na gazdinstvu.
                </Typography>
            </RadioGroup>
        </FormControl>
    )
})

export default UsloviIsporuke
