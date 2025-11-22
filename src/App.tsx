
import './App.css'
import { Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import { AppBar } from '@mui/material';
import CustomerList from "./components/CustomerList";

function App() {


  return (
    <>
      <Container max-width="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography>Training App</Typography>
          </Toolbar>
        </AppBar>
        <CustomerList />
        <CssBaseline />
      </Container>

    </>
  )
}

export default App
