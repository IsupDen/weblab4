import React, { Component } from "react";
import HitList from "./components/hits-list.component";
import { connect } from 'react-redux';
import { hitAction } from "./actions";
import Graph from "./components/graph.component";
import HitForm from "./components/form.component";
import ClearButton from "./components/clear-button.component";
import LogoutButton from "./components/logout.component";

class Main extends Component {

    componentDidMount() {
        this.props.dispatch(hitAction.getHits())
    }

    render() {
        return (
            <div className={'app-div'}>
                <div className={'main-div'}>
                    <HitForm/>
                    <Graph/>
                </div>
                <LogoutButton/>
                <ClearButton/>
                <HitList/>
            </div>

        )
    }
}

export default connect()(Main)