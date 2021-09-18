import React, { Component, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import AuthorProfile from "../AuthorProfile/AuthorProfile";
// import React, { Component, useState } from 'react';

import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { addrs } from '../../abi/address'
import fromExponential from 'from-exponential'

import { Button, Fade, Modal, Spinner } from 'react-bootstrap'
const IPFS = require('ipfs-api');

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function Astcreate() {
    const { colid } = useParams()
    const [img, setimg] = useState()
    console.log('assetimg', img)
    const [buffer, setbuffer] = useState();
    const [displayimage, setdisplayimg] = useState()
    const [ownername, setownername] = useState()
    const [assetname, setassetname] = useState()
    const [assetimg, setassetimg] = useState()
    const [assetdescrip, setassetdescrip] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const history = useHistory()
    const [tokenid, settokenid] = useState()
    const [pay, setpay] = useState()
    const [price, setprice] = useState()
    const [aid, setaid] = useState()
    console.log('ap', colid)

    const choosepic = (e) => {
        setimg(e.target.files[0])
        const file = e.target.files[0];
        const render = new FileReader()
        render.onload = () => {
            if (render.readyState === 2) {
                setdisplayimg(render.result)
            }
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadend = () => {
                const buffer = Buffer.from(reader.result);
                setbuffer(buffer);
                console.log('buffer', buffer)
            }
        }
        render.readAsDataURL(e.target.files[0])
    }
    const submit = async (e) => {
        e.preventDefault()
        // setShow(true)
        // nftidn()
        if (price) {

            await ipfs.add(buffer, (error, result) => {
                console.log("ipfs result", result[0].hash);
                console.log(result[0].hash);
                swaps(result[0].hash);
                if (error) {
                    console.error(error)
                    return;
                }
            })
        } else {
            await ipfs.add(buffer, (error, result) => {
                console.log("ipfs result", result[0].hash);
                console.log(result[0].hash);
                swapsnull(result[0].hash);
                if (error) {
                    console.error(error)
                    return;
                }
            })

        }



    }


    const nftidn = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.tokenidmint().call({ from: userwalletaddresss })
                .then((id) => {
                    // console.log('iddnew',String(Number(id)+1));
                    console.log(String(Number(id) + 1))
                    fixedsale(id)

                })
                .catch()

        }
    }

    const swaps = async (e) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("buy");
            settokenid(accounts)
            setShow(true)

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let collectionid = colid;
            let copies = 1;
            swaping.methods.create(collectionid, userwalletaddresss, e, assetname, ownername, copies, assetdescrip, false).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    if (fees.status === true) {
                        //   history.goBack('/create') 
                        console.log('done')
                        nftidn()


                    } else {
                        alert('failed')
                    }
                }).catch((err) => {
                    setShow(false)


                })

        }
    }
    const swapsnull = async (e) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            settokenid(accounts)
            setShow(true)

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let collectionid = colid;
            let copies = 1;
            swaping.methods.create(collectionid, userwalletaddresss, e, assetname, ownername, copies, assetdescrip, false).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    if (fees.status === true) {
                        //   history.goBack('/create') 
                        console.log('done')
                        history.goBack()
                        setShow(false)



                    } else {
                        alert('failed')
                    }
                }).catch((err) => {
                    setShow(false)


                })

        }
    }

    // console.log("mmm", fdata)
    const fixedsale = async (tokenid) => {
        console.log('akhj', price)
        console.log('tokenakhj', tokenid)
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
                        history.goBack()

                    } else {
                        alert('failed')
                    }
                })
                .catch((err) => {
                    setShow(false)

                })

        }
    }


    return (
        <section className="author-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-md-4">
                        {/* Author Profile */}
                        <AuthorProfile sendpic={displayimage} />
                    </div>
                    <div className="col-12 col-md-7">
                        {/* Intro */}
                        <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                            <div className="intro-content">
                                <span>Get Started</span>
                                <h3 className="mt-3 mb-0">Create Asset</h3>
                            </div>
                        </div>
                        {/* Item Form */}
                        <form className="item-form card no-hover" onSubmit={submit}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group form-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" onChange={choosepic} id="inputGroupFile01" />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="name" onChange={(e) => setownername(e.target.value)} placeholder="Owner Name" required="required" />
                                    </div>
                                </div>

                                {/* <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="url" placeholder="Website URL" required="required" />
                                        </div>
                                    </div> */}
                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea className="form-control" name="textarea" placeholder="Description" onChange={(e) => setassetdescrip(e.target.value)} cols={30} rows={3} defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="dname" placeholder="Asset Name" onChange={(e) => setassetname(e.target.value)} required="required" />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group mt-3">
                                        <input type="number" className="form-control" name="price" placeholder="Price" min="0" step="any" onChange={(e) => setprice(e.target.value)} placeholder="Price" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Create Collection</button>
                                </div>
                            </div>
                        </form>
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
    );
}


export default Astcreate;