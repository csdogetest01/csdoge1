import React, { Component } from 'react';

import Header from '../components/Header/Header';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
// import LiveAuctions from '../components/Auctions/AuctionsOne';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Collections from '../components/Collections/Collections';

class Allcol extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                {/* <Breadcrumb title="Auctions" subpage="Explore" page="Live Auctions" /> */}
                <Collections/> 
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Allcol;