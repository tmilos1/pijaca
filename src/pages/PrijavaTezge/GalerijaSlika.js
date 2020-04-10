import React, { Component } from 'react'

import { DropzoneArea } from 'material-ui-dropzone'
import Typography from '@material-ui/core/Typography'

class GalerijaSlika extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }
    handleChange(files) {
        this.setState({
            files: files
        });
        console.log(this.state.files)
    }

    render() {
        return (
            <>
                <Typography variant="h6" gutterBottom>
                    Dostavite nam slike za Vašu tezgu (do 10 slika)
            </Typography>
                <DropzoneArea onChange={this.handleChange.bind(this)} filesLimit={10}
                    dropzoneText="Prevucite i spustite željene slike ili kliknite"
                    getFileAddedMessage={(fileName) => `Uspešno ste dodali fajl ${fileName}.`}
                />
            </>
        )
    }
}

export default GalerijaSlika
