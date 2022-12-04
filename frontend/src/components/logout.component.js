import {Button} from "reactstrap";
import {connect} from "react-redux";
import React from "react";


const LogoutButton = () => (
    <Button className={'logout-button'} onClick={() => {window.location = '/#/signin'}}><span>LogOut</span><i></i></Button>
)

export default connect()(LogoutButton)