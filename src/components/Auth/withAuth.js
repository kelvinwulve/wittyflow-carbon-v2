
import React, {Component} from 'react';
import Auth from './Auth';
import { Redirect } from 'react-router-dom';

export default function AuthRoutes(AuthComponent) {
    // return a new class
    return class AuthWrapped extends Component{

        constructor(props){
            super(props)
            this.state = {
                isLoggedIn: false,
                isDisconnected: false,
                url: '/en/'
            };
        }

        componentWillMount(){
            const {
                history: {
                  location: { state }
                }
              } = this.props;
              if (state != undefined) {
                //console.log(state.from.pathname);
                this.setState({ url: state.from.pathname });
              }
            if(Auth.getAuth()){
                this.setState({ isLoggedIn: true })
            }
        }    

        render() {
            if(!this.state.isLoggedIn){
                return (
                <AuthComponent 
                        history={this.props.history} 
                        connection={this.state.isDisconnected} 
                        />
                )}else{
                return <Redirect  to={{
                    pathname:`/en/`
                }}/> }   
        }
    }
}