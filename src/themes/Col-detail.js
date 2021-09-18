import React, { Component } from 'react';

import Header from '../components/Header/Header';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
// import ItemDetail from '../components/ItemDetails/ItemDetails';
// import LiveAuctions from '../components/Auctions/AuctionsThree';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Colmaindetail from '../components/ItemDetails/Coldetail';
// import ExploreFive from '../components/Explore/ExploreTwo';
 class Coldetails extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                {/* <Breadcrumb title="Collection Details" subpage="Explore" page="Collection Details" /> */}
                {/* <ItemDetail /> */}
                {/* <LiveAuctions /> */}
                <Colmaindetail/>
                {/* <ExploreFive/> */}
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Coldetails;