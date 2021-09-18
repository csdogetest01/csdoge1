import React, { Component } from 'react';

import Header from '../components/Header/Header';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
// import Creates from '../components/Create/Create';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Astcreate from '../components/Create/Astcreate';

class Assetcreate extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                {/* <Breadcrumb title="Create" subpage="Pages" page="Create" /> */}
                <Astcreate />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Assetcreate;