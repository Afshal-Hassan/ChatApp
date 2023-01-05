import './App.css';
import "./App.css";
import { Switch, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { lazy, Suspense } from 'react';

const FriendList = lazy(() => import("./components/FriendList/FriendList"));
const Message = lazy(() => import("./components/Message/Message"));
const Video = lazy(() => import("./components/Video/Video"));

function App() {
  return (
    <div className="App1">
      <Switch>
        <Suspense fallback={<Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>}><Route exact path="/" component={Message}><FriendList />
            <Message />
          </Route>
          <Route exact path="/video" component={Video}><Video /></Route></Suspense>
      </Switch>
    </div>
  );
}

export default App;
