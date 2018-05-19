import React from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

class Main extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                    <div class="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 class="display-4 font-weight-normal">STUNBOX</h1>
                        <p class="lead font-weight-normal">Home applications & more...</p>
                    </div>
                    <div class="product-device box-shadow d-none d-md-block"></div>
                    <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
                </div>

                <div class="container body-content">
                    <br />

                    <hr />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Main;