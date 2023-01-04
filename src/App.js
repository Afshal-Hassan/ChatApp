import './App.css';
import Message from './components/Message/Message';
import FriendList from './components/FriendList/FriendList';
import "./App.css";
import { Switch,Route } from 'react-router-dom';
import Video from './components/Video/Video';


function App() {
  return (
    <div className="App1">
      <Switch>
      <Route exact path="/" component={Message}><FriendList/>
        <Message/>
        </Route>   
        <Route exact path="/video" component={Video}><Video/></Route>
        </Switch>
    </div>
  );
}

export default App;
