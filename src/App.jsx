import { Grid } from '@chakra-ui/react'
import { Header } from './components/Header'
import { QuestionList } from './components/QuestionList'

function App() {
    return (
        <>
            <Grid templateRows="3rem calc(100% - 3rem)" w="100%" h="100%">
                <Header></Header>
                <QuestionList></QuestionList>
            </Grid>
        </>
    )
}

export default App
