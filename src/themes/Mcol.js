import React from 'react'
import MyExplore from '../components/Explore/MyExplore';
import Header from '../components/Header/Header';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
function Mcol() {
    return (
        <div className="main">
             <Header />
                {/* <Breadcrumb title="Create" subpage="Pages" page="Create" /> */}
                {/* <Creates /> */}
                <MyExplore/>
                {/* <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup /> */}
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
        </div>
    )
}

export default Mcol
