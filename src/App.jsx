import { Grid } from '@chakra-ui/react'
import { Header } from './components/Header'

function App() {
    return (
        <>
            <Grid templateRows="3rem calc(100% - 3rem)" w="100%" h="100%">
                <Header></Header>
            </Grid>
        </>
    )
}

export default App
