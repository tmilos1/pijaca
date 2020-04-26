import React from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Hero from '../../components/Hero'
import GroupHomeFilter from '../../containers/GroupHomeFilter'
import Tezge from '../../containers/Tezge'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'
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
  chipTitle: {
    margin: "0 0 10px",
  },
  chipList: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
      margin: theme.spacing(0.5),
  },
}))

const Home = observer(() => {
    const classes = useStyles()
    const { authStore, homeFilterStore} = useAppContext()

    const handleDelete = (chipToDelete) => () => {
      for(let el of homeFilterStore.filterProizvod.filter(el => el.kod === chipToDelete.kod)) {
        el.izabran = false
      }
    }

    return (
      <main>
        <div className={classes.toolbarMargin}>
          {authStore.prijavljen || (
              <>
                  <Hero />
                  <br />
                  <br />
              </>
          )}

          <Container >
            <Grid className={classes.mainContainer} container spacing={3}>
              <Grid className={classes.mainContainer__Filter} item xs={12}>
                <GroupHomeFilter />
              </Grid>
              <Grid className={classes.mainContainer__Filter} item xs={12}>
                {homeFilterStore.filterProizvod.filter(el => el.izabran === true).length > 0 &&
                  <>
                    <div className={classes.chipTitle}>
                      Prikaz tezgi koji sadrže bar jedan od izabranih proizvoda:
                    </div>
                    <Paper component="ul" className={classes.chipList}>
                      {homeFilterStore.filterProizvod.filter(el => el.izabran === true).map((data) => (
                          <li key={data.kod}>
                            <Chip
                              label={data.naziv}
                              onDelete={handleDelete(data)}
                              className={classes.chip}
                            />
                          </li>
                      ))}
                    </Paper>
                  </>
                }
              </Grid>
            </Grid>
          </Container>

          <Tezge />
        </div>
      </main>
    )
})

export default Home
