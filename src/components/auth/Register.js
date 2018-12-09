import React, {Component} from 'react';
import {Form, Input, Button, notification} from 'antd';
import {Link} from 'react-router-dom';
import {register} from '../../utils/APIUtils';
import {validateEmail, validateUsername, validatePassword, validateName} from "../../utils/DummyValidators";
import {passwordEqualityState} from "../../utils/StateUtils"

import "../../assets/styles/auth/register.css";

const FormItem = Form.Item;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password1: {
                value: ''
            },
            password2: {
                value: ''
            }
        };
    }

    handleInputChange = (event, validationFun) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const signupRequest = {
            fullname: this.state.fullname.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password1: this.state.password1.value,
            password2: this.state.password2.value
        };
        register(signupRequest)
            .then(response => {
                notification.success({
                    message: 'Mors SEO',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });
                this.props.history.push("/login");
            }).catch(error => {
            const error_msg = Object.values(error).map(e => e[0]).join("\n");
            notification.error({
                message: 'Mors SEO',
                description: `Error! ${error_msg} Please try again!`
            });
        });
    };

    isFormInvalid = () => {
        return !(this.state.fullname.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password1.validateStatus === 'success' &&
            this.state.password2.validateStatus === 'success'
        );
    };

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem
                            hasFeedback
                            validateStatus={this.state.fullname.validateStatus}
                            help={this.state.fullname.errorMsg}>
                            <Input
                                size="large"
                                name="fullname"
                                autoComplete="off"
                                placeholder="Input your real first and last name"
                                value={this.state.fullname.value}
                                onChange={(event) => this.handleInputChange(event, validateName)}/>
                        </FormItem>
                        <FormItem hasFeedback
                                  validateStatus={this.state.username.validateStatus}
                                  help={this.state.username.errorMsg}>
                            <Input
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder="Input a unique username"
                                value={this.state.username.value}
                                onChange={(event) => this.handleInputChange(event, validateUsername)}/>
                        </FormItem>
                        <FormItem
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Input your active email"
                                value={this.state.email.value}
                                onChange={(event) => this.handleInputChange(event, validateEmail)}/>
                        </FormItem>
                        <FormItem
                            validateStatus={this.state.password1.validateStatus}
                            help={this.state.password1.errorMsg}>
                            <Input
                                size="large"
                                name="password1"
                                type="password"
                                autoComplete="off"
                                placeholder="Input a password"
                                value={this.state.password1.value}
                                onBlur={this.validatePasswordsEquality}
                                onChange={(event) => this.handleInputChange(event, validatePassword)}/>
                        </FormItem>
                        <FormItem
                            validateStatus={this.state.password2.validateStatus}
                            help={this.state.password2.errorMsg}>
                            <Input
                                size="large"
                                name="password2"
                                type="password"
                                autoComplete="off"
                                placeholder="Confirm password"
                                value={this.state.password2.value}
                                onBlur={this.validatePasswordsEquality}
                                onChange={(event) => this.handleInputChange(event, validatePassword)}/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>Sign up</Button>
                            Already registered? <Link to="/login">Login now!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    validatePasswordsEquality = () => {
        const firstPassword = this.state.password1.value;
        const secondPassword = this.state.password2.value;
        if (firstPassword && secondPassword && firstPassword !== secondPassword) {
            this.setState(passwordEqualityState(
                firstPassword, secondPassword, 'error', 'Both passwords must match'
            ));
        } else {
            this.setState(passwordEqualityState(
                firstPassword, secondPassword, 'success', null
            ));
        }
    }
}

export default Register;