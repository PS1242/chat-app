import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
