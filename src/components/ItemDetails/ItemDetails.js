import React, {  useEffect, useState } from 'react';
import {  useLocation, useHistory } from 'react-router-dom';

import Web3 from 'web3'
import nft from '../../abi/nft.json'
// import { Link } from 'react-router-dom';

import { addrs } from '../../abi/address'

import { Modal, Spinner } from 'react-bootstrap'
import ExploreFive from '../../components/Explore/ExploreTwo';
import fromExponential from 'from-exponential';

function ItemDetails() {
    const location = useLocation()
    const fdata = location.state
    useEffect(()=>{
        if(fdata){
            window.scrollTo(0,0)
        }
    },[fdata])

    const [buyprice, setbuyprice] = useState()
    const [buyaucprice, setaucbuyprice] = useState()
    const [openbid, setopenbid] = useState()
    const [auch, setauch] = useState()
    const [auctionprice, setauctionprice] = useState()
    const [time, settime] = useState()
    const [accountid, setaccountid] = useState()
    const [hour, sethour] = useState()
    const [days, setdays] = useState()
    const [saleval, setsaleval] = useState()
    const [auctionval, setauctionvalue] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    console.log('ssa', buyprice)
    console.log('€auc ssa', auctionprice)
    const history = useHistory()
    useEffect(async () => {

        salenft(fdata[0])
        auctiondetail(fdata[0])
        timer(fdata[0])
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1[0])
    }, [fdata])
    console.log('accoutid', accountid)
    const salenft = async (id) => {
        // console.log('2')
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    console.log('aaa', length[2]);
                    // setlist(length[0])
                    // setlist2(length[1])
                    // console.log('listone',length[0])
                    setbuyprice((Number(length[3])).length > 21 ? (Number(length[3])) / 1000000000000000000000000000000000000 : (Number(length[3])) / 1000000000000000000)
                    setaucbuyprice((Number(length[2])).length > 21 ? (Number(length[2])) / 1000000000000000000000000000000000000 : (Number(length[2])) / 1000000000000000000)
                    // setcheckm(length[0])
                    // var listlen = length[0]?.length
                    // // console.log('bn',length)
                    // setaucprice(Number(length[2]))


                })
                .catch()

        }
    }
    const buyfixednft = async (collectionid, tokenid, amount) => {
        console.log(`${collectionid}, ${tokenid}, ${amount}`)



        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            setShow(true)

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amountIn = window.web3.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));
            console.log('amout', amountIn)
            let address = '0x0000000000000000000000000000000000000000'
            swaping.methods.buynft(collectionid, tokenid, address).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)

                    history.push('/mycollection')
                })
                .catch((err) => {
                    setShow(false)

                })

        }
    }
    const auctiondetail = async (id) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.auctiondetail(id).call({ from: userwalletaddresss })
                .then((value) => {
                    // console.log('assasacvbv',value);     
                    // localStorage.setItem(`highauc${id}`, value[0])
                    // localStorage.setItem(`highaucid${id}`, value[1])
                    var aucde = {
                        id: value[1],
                        val: (Number(value[0]))?.length > 21 ? Number(value[0]) / 1000000000000000000000000000000000000 : Number(value[0]) / 1000000000000000000,
                        userid: id
                    }
                    setauch(aucde)
                    console.log('auction high bid', aucde)
                }).catch()

        }
    }
    const buyauctionnft = async (tokenid, amount) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            // settokenid(accounts)
            setShow(true)

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amountIn = window.web3.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));
            swaping.methods.buyauction(tokenid).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)
                    // history.push('/')
                    window.location.reload()
                })
                .catch((err) => {
                    setShow(false)
                    // settokenid('')
                })
        }
    }
    const timer = async (id) => {
        // console.log('saa',id)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)


            swaping.methods.timing(id).call({ from: userwalletaddresss })
                .then((fees) => {

                    var day = Math.floor(fees / 86400)
                    var hr = Math.floor((fees - day * 86400) / 3600)
                    var minutesout = Math.floor((fees - day * 86400 - hr * 3600) / 60);
                    // console.log("hr",hr)
                    // console.log("day",day)
                    // console.log("min",minutesout)
                    settime({ id: id, d: day, h: hr, m: minutesout })


                }).catch()

        }
    }
    const claimauctionnft = async (collectionid, tokenid) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);

            // settokenid(accounts)
            setShow(true)
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            // let amountIn = window.web3.utils.toBN(fromExponential((amount) * Math.pow(10,18)));
            swaping.methods.claim(collectionid, tokenid).send({ from: userwalletaddresss })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)
                    history.push('/mycollection')
                })
                .catch((err) => {
                    setShow(false)
                    // settokenid('')
                })
        }
    }
    console.log('time', time)
    console.log('fdata', fdata)

    // console.log("mmm", fdata)
    const fixedsale = async (tokenid, price) => {
        console.log('akhj', price)
        console.log('tokenakhj', tokenid)
        setShow(true)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts);

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amount = window.web3.utils.toBN(fromExponential(((parseFloat(price)) * Math.pow(10, 18))));
            console.log('mainamout', amount)

            swaping.methods.fixedsales(tokenid, amount, false).send({ from: userwalletaddresss })
                .then((length) => {
                    console.log(length);
                    if (length.status === true) {
                        setShow(false)
                        history.push('/mycollection')

                    } else {
                        alert('failed')
                    }
                })
                .catch((err) => {
                    setShow(false)

                })

        }
    }

    const auction = async (tokenid, price, endday, endhours) =>
    // console.log('aa',price)
    {
        console.log('aaaa,', price)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);

            setShow(true)

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amountIn = window.web3.utils.toBN(fromExponential((price) * Math.pow(10, 18)));

            swaping.methods.startauction(tokenid, amountIn, endday, endhours).send({ from: userwalletaddresss })
                .then((recipt) => {
                    console.log(recipt);
                    if (recipt.status === true) {

                        setShow(false)
                        history.push('/mycollection')

                    } else {
                        alert('failed')
                    }

                })
                .catch(err => {

                    setShow(false)


                })

        }
    }


    return (
        <>

            <section className="item-details-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-5">
                            <div className="item-info">
                                <div className="item-thumb coll-img text-center">
                                    <img src={`https://ipfs.infura.io/ipfs/${fdata ? fdata[6] : null}`} alt="" />
                                </div>
                                {/* <div className="card no-hover countdown-times my-4">
                                    <div className="countdown d-flex justify-content-center" data-date={this.state.initData.date} />
                                </div> */}
                                {
                                    buyaucprice > 0 ?

                                        <div className="card no-hover countdown-times my-4">

                                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                                    {/* <p style={{ margin: '0px', fontSize: '20px', color: 'white' }}>Days</p> */}
                                                   
                                                    <p style={{ display:'flex',justifyContent:'center',alignItems:'center',margin: '0px',width:'60px',height:'80px',borderRadius:'5px', marginTop: '5px',fontSize:'40px', fontWeight: 'bold', color: 'black',background:'white' }}>{time?.d} </p>
                                                    <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Days</p>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                                  
                                                    <p style={{ display:'flex',justifyContent:'center',alignItems:'center',margin: '0px',width:'60px',height:'80px',borderRadius:'5px', marginTop: '5px',fontSize:'40px', fontWeight: 'bold', color: 'black',background:'white' }}>{time?.h}</p>
                                                    <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Hours</p>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    
                                                    <p style={{ display:'flex',justifyContent:'center',alignItems:'center',margin: '0px',width:'60px',height:'80px',borderRadius:'5px', marginTop: '5px',fontSize:'40px', fontWeight: 'bold', color: 'black',background:'white' }}>{time?.m}</p>
                                                    <p style={{ margin: '0px', fontSize: '15px', color: 'white' }}>Minutes</p>
                                                </div>

                                            </div>

                                        </div> : null
                                }
                                {/* Netstorm Tab */}
                                {/* <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                                    <li>
                                        <a className="active" id="nav-home-tab" data-toggle="pill" href="#nav-home">
                                            <h5 className="m-0">{this.state.initData.tab_1}</h5>
                                        </a>
                                    </li>
                                    <li>
                                        <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
                                            <h5 className="m-0">{this.state.initData.tab_2}</h5>
                                        </a>
                                    </li>
                                    <li>
                                        <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
                                            <h5 className="m-0">{this.state.initData.tab_3}</h5>
                                        </a>
                                    </li>
                                </ul> */}
                                {/* Tab Content */}
                                {
                                    fdata[8].toLowerCase() === accountid ?

                                        <div className="item-info-list mt-5 card" style={{borderRadius:'20px'}} >
                                            <form onSubmit={(e) => {
                                                e.preventDefault()
                                                fixedsale(fdata[0], saleval)

                                            }}>
                                                <div className="item-info-list mt-4">
                                                    <h3 style={{fontSize:'25px',color:'whitesmoke',textTransform:'capitalize'}}>Sale</h3>
                                                    <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)',borderRadius:'5px', outline: 'none' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setsaleval(e.target.value)} required />
                                                    <button type="submit" className="d-block btn btn-bordered-white mt-4 w-100" >Sale</button>
                                                </div>
                                            </form>
                                            {/* <form onSubmit={(e) => {
                                                e.preventDefault()
                                                auction(fdata[0], auctionval, days, hour)
                                            }}>
                                                <div className="item-info-list mt-4">
                                                    <h3>Auction</h3>
                                                    <input style={{ border: 'none', outline: 'none' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setauctionvalue(e.target.value)} required />
                                                    <input style={{ border: 'none', outline: 'none' }} type="Number" placeholder="Enter Days" min="0" max="30" onChange={(e) => setdays(e.target.value)} required />
                                                    <input style={{ border: 'none', outline: 'none' }} type="Number" placeholder="Enter Hours" min="0" max="24" onChange={(e) => sethour(e.target.value)} required />
                                                    <button type="submit" className="d-block btn btn-bordered-white mt-4 w-100" >Auction</button>
                                                </div>
                                            </form> */}
                                        </div> : null
                                }


                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            {/* Content */}
                            <div className="content mt-5 mt-lg-0">
                                <h3 style={{fontSize:'30px',color:'#99B7FF',textTransform:'capitalize',fontFamily:"Georgia, 'Times New Roman', Times, serif"}} className="m-0">{fdata[1]}</h3>
                                <p style={{ fontSize: '15px', textTransform: 'capitalize',fontFamily:"Georgia, 'Times New Roman', Times, serif" }}>{fdata[5]}</p>
                                {/* Owner */}
                                <div className="owner d-flex align-items-center">
                                    <span>Owned By</span>
                                    <a className="owner-meta no-hover d-flex align-items-center ml-3" >
                                        <img className="avatar-sm rounded-circle" src={`https://ipfs.infura.io/ipfs/${fdata ? fdata[6] : null}`} alt="" />
                                        <h6 className="ml-2">{fdata[3]}</h6>
                                    </a>
                                </div>
                                {/* Item Info List */}
                                <div className="item-info-list mt-4">
                                    {/* <ul className="list-unstyled">
                                        <li className="price d-flex justify-content-between">
                                            <span>Current Price {this.state.initData.price_1}</span>
                                            <span>{this.state.initData.price_2}</span>
                                            <span>{this.state.initData.count}</span>
                                        </li>
                                        <li>
                                            <span>Size </span>
                                            <span>{this.state.initData.size}</span>
                                        </li>
                                        <li>
                                            <span>Volume Traded </span>
                                            <span>{this.state.initData.volume}</span>
                                        </li>
                                    </ul> */}
                                </div>
                                <div className="row items">

                                    {buyaucprice ?
                                        <div className="col-12 item px-lg-2">
                                            <div className="card no-hover">
                                                <h4 className="mt-0 mb-2">Highest Bid</h4>
                                                <div className="price d-flex justify-content-between align-items-center">
                                                    <span>{buyaucprice > auch?.val ? buyaucprice : auch?.val}</span>
                                                    <span>{buyaucprice}</span>
                                                </div>
                                            </div>
                                        </div> : null}
                                    {
                                        buyprice > 0 ? <div className="col-12 item px-lg-2">
                                            <div className="card no-hover">
                                                <h4 className="mt-0 mb-2">Price</h4>
                                                <div className="price d-flex justify-content-between align-items-center">
                                                    <span>{buyprice}</span>
                                                    {/* <span>{this.state.initData.bid_count}</span> */}
                                                </div>
                                            </div>
                                        </div> : null
                                    }
                                </div>
                                {
                                    buyprice > 0 ? <button style={{border:'2px solid #99B7FF'}} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => buyfixednft(fdata[7], fdata[0], buyprice)} >BUY</button> : null
                                }
                                {openbid ? null :
                                    buyaucprice > 0 ?
                                        time?.d === 0 && time?.h === 0 && time?.m === 0 ? <button style={{border:'2px solid #99B7FF'}} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => claimauctionnft(fdata[7], fdata[0])}  >CLAIM</button> :
                                            <button style={{border:'2px solid #99B7FF'}} className="d-block btn btn-bordered-white mt-4 w-100" onClick={() => setopenbid(true)} >BID</button> : null
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    buyauctionnft(fdata[0], auctionprice)

                                }}>
                                    {openbid ?
                                        <div className="item-info-list mt-4">
                                            <input style={{ border: 'none', outline: 'none' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setauctionprice(e.target.value)} required />

                                        </div> : null
                                    }
                                    {openbid ?
                                        buyaucprice > 0 ?
                                            <button style={{border:'2px solid #99B7FF'}} type="submit" className="d-block btn btn-bordered-white mt-4 w-100" >BID</button> : null
                                        : null}
                                </form>


                                {
                                    fdata[8].toLowerCase() === accountid ?

                                        <div className="item-info-list mt-5 card" style={{borderRadius:'20px'}}>
                                            {/* <form onSubmit={(e) => {
                                                e.preventDefault()
                                                fixedsale(fdata[0], saleval)

                                            }}>
                                                <div className="item-info-list mt-4">
                                                    <h3>Sale</h3>
                                                    <input style={{ border: 'none', outline: 'none' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setsaleval(e.target.value)} required />
                                                    <button type="submit" className="d-block btn btn-bordered-white mt-4 w-100" >Sale</button>
                                                </div>
                                            </form> */}
                                            <form onSubmit={(e) => {
                                                e.preventDefault()
                                                auction(fdata[0], auctionval, days, hour)
                                            }}>
                                                <div className="item-info-list mt-4" >
                                                    <h3 style={{fontSize:'25px',color:'whitesmoke',textTransform:'capitalize'}}>Auction</h3>
                                                    <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)',borderRadius:'5px', outline: 'none',marginBottom:'4px' }} type="Number" placeholder="Enter bid value" step="any" min={buyaucprice > auch?.val ? buyaucprice : auch?.val} onChange={(e) => setauctionvalue(e.target.value)} required />
                                                    <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)',borderRadius:'5px', outline: 'none',marginBottom:'4px' }} type="Number" placeholder="Enter Days" min="0" max="30" onChange={(e) => setdays(e.target.value)} required />
                                                    <input style={{ border: '2px solid rgba(255, 255, 255, 0.12)',borderRadius:'5px', outline: 'none',marginBottom:'4px' }} type="Number" placeholder="Enter Hours" min="0" max="24" onChange={(e) => sethour(e.target.value)} required />
                                                    <button type="submit" className="d-block btn btn-bordered-white mt-4 w-100" >Auction</button>
                                                </div>
                                            </form>
                                        </div> : null
                                }

                            </div>
                        </div>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >

                            <Modal.Body>


                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}><Spinner animation="grow" variant="light" />
                                    <Spinner animation="grow" variant="light" />
                                    <Spinner animation="grow" variant="light" />
                                    <Spinner animation="grow" variant="light" />
                                    <Spinner animation="grow" variant="light" />
                                    <Spinner animation="grow" variant="light" />
                                </div>






                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </section>
            <ExploreFive colid={fdata[7]} ckkid={fdata[1]} />
        </>
    );
}


export default ItemDetails;