import React from 'react';
import { Redirect } from "react-router-dom";
import Auth from '../../services/stunbox/auth/auth';
import AppHeader from "../../components/header/Header";
import { Grid, Form, Segment, Input, Button, Header, Icon } from 'semantic-ui-react';
import '../../css/signin.css';

class Login extends React.Component {

  state = {
    username: "slackmagic",
    password: "slayer2005",
  }

  login = () => {
    Auth.authenticate(this.state.username.trim(), this.state.password.trim(), () => { this.forceUpdate(); });
  };

  onChange = (e) => {
    e.preventDefault();
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.login();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };


    if (Auth.isAuthenticated()) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <AppHeader />
        <Grid verticalAlign='middle' textAlign='center'>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Form size="large" >
              <Header as='h3' attached='top' inverted>
                <Icon name='key' />
                <Header.Content>Login form</Header.Content>
              </Header>
              <Segment stacked attached>
                <Form.Field>
                  <Input icon='user' iconPosition='left' placeholder='Username' name='username' onChange={this.onChange} />
                </Form.Field>
                <Form.Field>
                  <Input icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' onChange={this.onChange} />
                </Form.Field>
                <Button size='large' type='submit' fluid onClick={this.onSubmit}>Log in</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>

    );
  }
}

export default Login;