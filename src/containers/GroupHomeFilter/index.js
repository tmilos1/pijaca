import React from 'react'

// import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import ProductHomeFilter from '../../containers/ProductHomeFilter'

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        marginRight: '20px',
        width: '120px'
    },
    loadingIndicator: {
        margin: "0 auto"
    },
}))

const MainHomeFilter = observer(() => {
    const classes = useStyles()
    const { homeFilterStore } = useAppContext()

    const handleChange = (event, newValue) => {
        homeFilterStore.izabranaGrupaIndex = newValue
    }

    const tabsContent = (
        <Typography component="div" role="tabpanel">
            <Box>
                <ProductHomeFilter grupa={homeFilterStore.getKodAktivneGrupe()} />
            </Box>
        </Typography>
    )

    return (
        <div className={classes.root}>
        <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={3}>
            {homeFilterStore.loadingTezge ? 
                <CircularProgress className={classes.loadingIndicator} /> 
                :
                (
                    <>
                        <Tabs
                            value={homeFilterStore.izabranaGrupaIndex}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="on"
                            aria-label="scrollable fixed tabs"
                        >
                            {homeFilterStore.filterGrupa.map((grupa, index) => (
                                <Tab key={grupa.kod} label={grupa.naziv} {...a11yProps(index)} />
                            ))}
                        </Tabs>
                        {tabsContent}
                    </>
                )
            }
            </Grid>
        </Container>
        </div>
    )
})

export default MainHomeFilter
