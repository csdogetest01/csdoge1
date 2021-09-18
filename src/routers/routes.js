import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import ExploreOne from "../themes/explore-one";
import ExploreTwo from "../themes/explore-two";
// import ExploreThree from "../themes/explore-three";
// import ExploreFour from "../themes/explore-four";
import Auctions from "../themes/auctions";
import ItemDetails from "../themes/item-details";
// import Activity from "../themes/activity";
// import Blog from "../themes/blog";
// import BlogSingle from "../themes/blog-single";
// import HelpCenter from "../themes/help-center";
// import Authors from "../themes/authors";
// import Author from "../themes/author";
// import WalletConnect from "../themes/wallet-connect";
import Create from "../themes/create";
// import Login from "../themes/login";
// import Signup from "../themes/signup";
// import Contact from "../themes/contact";
// import MyExplore from "../components/Explore/MyExplore";
import Mcol from "../themes/Mcol";
import Coldetails from "../themes/Col-detail";
import Csdetails from "../themes/Cs-detail";
import Assetcreate from "../themes/assetcreate";
import Csdogemain from "../themes/csdogemain";
import Createcsdoge from "../themes/createcs";
import Allcol from "../themes/allcol";
import Allast from "../themes/Allast";
// import Csdetail from "../components/ItemDetails/Csdetail";
import ScrollToTop from "../ScrollToTop";
import Msearch from "../themes/mysearch";

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <ScrollToTop/>
          <Switch>

            <Route exact path="/" component={ThemeOne} />
            <Route exact path="/explore-1" component={ExploreOne} />
            <Route exact path="/explore-2" component={ExploreTwo} />
            {/* <Route exact path="/explore-3" component={ExploreThree} /> */}
            {/* <Route exact path="/explore-4" component={ExploreFour} /> */}
            <Route exact path="/auctions" component={Auctions} />
            <Route exact path="/item-details" component={ItemDetails} />
            <Route exact path="/col-details" component={Coldetails} />
            <Route exact path="/cs-details" component={Csdetails} />
            {/* <Route exact path="/activity" component={Activity} /> */}
            {/* <Route exact path="/blog" component={Blog} /> */}
            {/* <Route exact path="/blog-single" component={BlogSingle} /> */}
            {/* <Route exact path="/help-center" component={HelpCenter} /> */}
            {/* <Route exact path="/authors" component={Authors} /> */}
            {/* <Route exact path="/author" component={Author} /> */}
            {/* <Route exact path="/wallet-connect" component={WalletConnect} /> */}
            <Route exact path="/create" component={Create} />
            <Route exact path="/assetcreate/:colid" component={Assetcreate} />
            {/* <Route exact path="/login" component={Login} /> */}
            {/* <Route exact path="/signup" component={Signup} /> */}
            {/* <Route exact path="/contact" component={Contact} /> */}
            <Route exact path="/mycollection" component={Mcol}/>
            <Route exact path="/search/:word" component={Msearch}/>
            <Route exact path="/csdoge" component={Csdogemain}/>
            <Route exact path="/createcsdoge" component={Createcsdoge}/>
            <Route exact path="/allcol" component={Allcol}/>
            <Route exact path="/allnft" component={Allast}/>

          </Switch>
        </Router>
      </div>
    );
  }
}
export default MyRouts;