import { Grid } from '@chakra-ui/react'
import { Assets } from 'pixi.js'
import { useEffect } from 'react'
import { Header } from './components/Header'
import { QuestionList } from './components/QuestionList'

function App() {
    let ran = false

    useEffect(() => {
        (async () => {
            if (ran) {
                return
            }
            ran = true
            Assets.addBundle('font', [{ alias: 'Main', src: 'main.otf' }])
            await Assets.loadBundle('font')
        })()
    }, [])
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
