import './App.css'
import { Container, Toolbar, Typography } from '@mui/material'
import { AppBar } from '@mui/material';
import { NavLink, Outlet } from 'react-router';

function App() {

  return (
    <>
      <Container>
        <AppBar>
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Typography>PersonalTrainer</Typography>
          </Toolbar>
        </AppBar>
        <nav style={{ marginTop: '50px', marginBottom: '25px' }}>
          <NavLink style={({ isActive }) => ({
            color: isActive ? 'darkblue' : 'blue',
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: 'none',
            margin: '10px',
            fontFamily: 'Roboto, Arial, sans-serif',
          })}
            to="trainings">
            TRAININGS
          </NavLink>
          <NavLink style={({ isActive }) => ({
            color: isActive ? 'darkblue' : 'blue',
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: 'none',
            margin: '10px',
            fontFamily: 'Roboto, Arial, sans-serif',
          })}
            to="customers">
            CUSTOMERS
          </NavLink>
          <NavLink style={({ isActive }) => ({
            color: isActive ? 'darkblue' : 'blue',
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: 'none',
            margin: '10px',
            fontFamily: 'Roboto, Arial, sans-serif',
          })}
            to="calendar">
            CALENDAR
          </NavLink>
          <NavLink style={({ isActive }) => ({
            color: isActive ? 'darkblue' : 'blue',
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: 'none',
            margin: '10px',
            fontFamily: 'Roboto, Arial, sans-serif',
          })}
            to="barchart">
            CHART
          </NavLink>
        </nav>
        <Outlet />

        {/*<CssBaseline />*/}
      </Container>
    </>

  )
}

export default App
