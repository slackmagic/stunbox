import React from 'react';
import Title from "./cmTitle";
import SubHeader from "./cmHeader";
import Footer from "../../components/footer/Footer";

class GrimoireDashboard extends React.Component {

    state = {
        type: undefined,
        ref: undefined
    }

    componentDidMount() {
        const state = this.state
        state['type'] = this.props.match.params.typeid;
        state['ref'] = -1;
        this.setState(state);
    }

    render() {
        return (
            <div>
                <SubHeader />
                <div class="container body-content">
                    <br />
                    <Title type={this.state.type} />
                    <hr />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default GrimoireDashboard;