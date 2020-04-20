import React from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Hero from '../../components/Hero'
import GroupHomeFilter from '../../containers/GroupHomeFilter'
import ProductHomeFilter from '../../containers/ProductHomeFilter'
import Tezge from '../../containers/Tezge'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    padding: theme.spacing(4, 0, 4)
  },
  mainContainer: {
    minHeight: '200px',
  },
  mainContainer__Filter: {
    minHeight: '2vh',
  },
}))

const Home = () => {
    const classes = useStyles()

    return (
      <main>
        <div className={classes.toolbarMargin}>
          <Hero />
          <br />
          <br />

          <Container >
            <Grid className={classes.mainContainer} container spacing={3}>
              <Grid className={classes.mainContainer__Filter} item xs={12}>
                <GroupHomeFilter />
              </Grid>
              <Grid className={classes.mainContainer__Filter} item xs={12}>
                <ProductHomeFilter />
              </Grid>
            </Grid>
          </Container>

          <Tezge />
        </div>
      </main>
    )
}

export default Home
