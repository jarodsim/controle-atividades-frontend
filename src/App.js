import Home from './pages/home'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { GlobalStyle } from './globalStyle'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Home />
      <GlobalStyle />
    </DndProvider>
  )
}

export default App
