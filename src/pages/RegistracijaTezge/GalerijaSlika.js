import React from 'react'

import { DropzoneArea } from 'material-ui-dropzone'
import Typography from '@material-ui/core/Typography'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'


const GalerijaSlika = observer(() => {
    const { tezgaStore } = useAppContext()

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Dostavite nam slike za Vašu tezgu (do 10 slika)
            </Typography>
            <DropzoneArea onChange={tezgaStore.handleFilesChange} filesLimit={10}
                dropzoneText="Prevucite i spustite željene slike ili kliknite"
                getFileAddedMessage={(fileName) => `Uspešno ste dodali fajl ${fileName}.`}
                initialFiles={tezgaStore.form.files.map(file => URL.createObjectURL(file))}
                onDelete={tezgaStore.handleOnFileDelete}
            />
        </>
    )
})

export default GalerijaSlika
