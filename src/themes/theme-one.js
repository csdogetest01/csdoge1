import React, { Component } from 'react';

import Header from '../components/Header/Header';
// import Hero from '../components/Hero/Hero';
import Auctions from '../components/Auctions/AuctionsOne';
// import TopSeller from '../components/TopSeller/TopSellerOne';
import Collections from '../components/Collections/Collections';
import Explore from '../components/Explore/ExploreOne';
// import Work from '../components/Work/Work';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Explore1 from '../components/Explore/Allasset';

class ThemeOne extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                {/* <Hero /> */}
                <Auctions allauc={"allauc"} />
                {/* <TopSeller /> */}
                <Collections />
                <Explore />
                <Explore1/>
                {/* <Work /> */}
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ThemeOne;