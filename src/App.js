import React, { Component } from "react";
import Test from "./containers/Test";
import CourseListPage from "./containers/CourseListPage";
import CourseAuthoringPage from "./containers/CourseAuthoringPage";
import CourseDetailsPage from "./containers/CourseDetailsPage";
// import CourseTeamPage from "./containers/CourseTeamPage";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={CourseListPage} />   
                    <Route exact={true} path="/cat/courses/:id/edit" component={CourseAuthoringPage} />
                    <Route exact={true} path="/cat/courses/:id/details" component={CourseDetailsPage} />    
                    {/* <Route exact={true} path="/cat/courses/:id/team" component={CourseTeamPage} />     */}
                    <Route exact={true} path="/test" component={Test} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;