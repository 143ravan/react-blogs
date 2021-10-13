import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
const { default: Blogs } = require("./components/Blogs/Blogs");
const { default: BlogDetails } = require("./components/BlogDetails/BlogDetails");

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Blogs />
          </Route>
          <Route exact path="/blog-details/:slug">
            <BlogDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
