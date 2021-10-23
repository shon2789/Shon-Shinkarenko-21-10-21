import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router';
import { WeatherApp } from './pages/WeatherApp';
import { Favourites } from './pages/Favourites';


export const App = () => {
  return (
    <Router>

      <Switch>
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path="/:cityKey" component={WeatherApp} />
        <Route exact path="/" component={WeatherApp} />
      </Switch>
    </Router>
  )
}

export default App;
