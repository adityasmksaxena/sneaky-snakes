import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Grid, Header, Message, Segment, Container } from 'semantic-ui-react';
import EmailField from '../../components/common/InputFields/EmailField';
import PasswordField from '../../components/common/InputFields/PasswordField';
import StyledButton from '../../components/common/styledButton/StyledButton';
import apiv1 from '../../utils/apiV1';
import './signin.css';

class SignIn extends Component {
  propTypes = {
    history: PropTypes.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  handleFormSubmission = async event => {
    event.preventDefault();
    event.stopPropagation();
    const { email, password } = this.state;
    try {
      const response = await apiv1.noAuth.post('/signin', { email, password });
      if (response) {
        const token = response.headers && response.headers['x-auth'];
        localStorage.setItem('authToken', token);
        const { history } = this.props;
        history.push('/');
      }

      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  onChange = event => {
    event.stopPropagation();
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-form">
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ width: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Sign In
            </Header>
            <Form size="large" onSubmit={this.handleFormSubmission}>
              <Segment stacked>
                <EmailField name="email" value={email} onChange={this.onChange} required />
                <PasswordField name="password" value={password} onChange={this.onChange} required />
                <StyledButton text="Submit" size="large" color="teal" fluid />
                <Container className="forgot-password-container" textAlign="right">
                  <Link to="/forgotPassword">Forgot Password?</Link>
                </Container>
              </Segment>
            </Form>
            <Message>
              New user?&nbsp;&nbsp;
              <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SignIn;
