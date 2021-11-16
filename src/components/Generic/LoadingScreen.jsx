import React, {Component} from 'react';
import {post} from "../../services/Transport";
import ActivityIndicator from 'react-activity-indicator'
import { Redirect } from 'react-router-dom';
import Alert from "./Alert";
import Loader from "../Dashboard/Pages/Loader";


class LoadingScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            user_id: "" ,
            token: "",
            verification_error: false,
            verification_error_message: ""
        }
    }

    componentDidMount() {
        this.submitToken(this.props.match.params);
    }

    submitToken = ({ user_id, token }) =>{
        post('verify-email',{user_id, token},null,data =>{
                this.setState({ loaded: true });
        },err=>{
            const { response } = err;
            if(response.code == "4000"){
                this.setState({
                    verification_error_message: response.message,
                    verification_error: true
                });
            }
        })
    }

    render() {

        //get the states
        const {loaded, verification_error, verification_error_message } = this.state

        if(loaded){
           return  <Redirect to="/auth/verify-email-success" />
        }

        return (
            <div className="d-flex flex-column justify-content-center align-content-center">
                <h2>{this.state.user_id}</h2>
                {!verification_error?<Loader />: <Alert type="danger" message={verification_error_message} />}
            </div>
        );
    }
}

export default LoadingScreen;