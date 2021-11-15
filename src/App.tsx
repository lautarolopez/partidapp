import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Detail from './sections/Detail';
import Favorites from './sections/Favorites';
import Main from './sections/Main';

const App = (): JSX.Element => (
  <Router>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/:matchday/:index" component={Detail} />
      <Route exact path="/favorites" component={Favorites} />
    </Switch>
  </Router>
);

export default App;
