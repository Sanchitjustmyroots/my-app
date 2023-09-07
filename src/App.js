import Signup from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Components/Users";
import { Switch } from "react-router-dom/cjs/react-router-dom";

function App() {
  // const submitForm = event => {
  //   event.preventDefault();
  //   console.log(formData);
  // };

  // this.setState({
  //   firstName: '',
  //   lastName: '',
  //   phoneNumber: '',
  //   email: '',
  //   location: '',
  // });

  return (
    <div className="App">
{/*     
        <Signup /> */}
        <Router>

        <Switch>
           <Route path ="/sign" component={Signup } /> 


          <Route path="/usersdetail" component={Users} />
        </Switch>

        </Router>
   
    </div>
  );
}

export default App;
