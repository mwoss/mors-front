import React, {Component} from 'react';
import {Form, notification} from 'antd';
import {seo} from "../../utils/APIUtils";
import LoadingIndicator from "../common/LoadingIndicator";
import SEOResult from "./SEOResult";
import SEORequestForm from "./SEORequest";

import '../../assets/styles/seo/seo.css';

const SEO = () => {
    const AntWrappedSEOForm = Form.create()(SEOForm);
    return (
        <div className="seo-container">
            <h1 className="page-title">SEO Booster</h1>
            <div>
                <AntWrappedSEOForm/>
            </div>
        </div>
    )
};

class SEOForm extends Component {
    state = {
        isQuerySent: true,
        isLoading: false,
        score: null,
        queryKeywords: [],
        documentKeywords: [],
        general: null,
        specific: null,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const seoRequest = Object.assign({}, values);
                this.setState({isLoading: true});
                seo(seoRequest)
                    .then(response => {
                        this.setState({
                            score: response.score,
                            queryKeywords: response.query_keywords,
                            documentKeywords: response.document_keywords,
                            general: response.general,
                            specific: response.specific,
                            isQuerySent: false,
                            isLoading: false,
                        })
                    }).catch(error => {
                    notification.error({
                        message: 'Polling App',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });
                });
            }
        });
    };

    render() {
        if (this.state.isLoading)
            return <LoadingIndicator/>;

        return (
            this.state.isQuerySent ? <SEORequestForm form={this.props.form} onSubmit={this.handleSubmit}/> :
                <SEOResult score={this.state.score}
                           general={this.state.general}
                           specific={this.state.specific}
                           queryKeywords={this.state.queryKeywords}
                           documentKeywords={this.state.documentKeywords}/>
        );
    }
}

export default SEO;