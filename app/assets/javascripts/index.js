const Eth = require('./template/ethjs');


const $ = require('jquery');
const Vue = require('vue');
const Popper = require('./template/popper');



const bootstrap = require('./template/bootstrap.min');
const main = require('./template/main');





//move me

function getEthBalance(address){
    return new Eth(new Eth.HttpProvider("https://mainnet.infura.io/MnFOXCPE2oOhWpOCyEBT")).getBalance(address, "latest");
}

function moveProgressBar(percent, element_id) {
    let elem = document.getElementById(element_id);
    let width = 0;
    let interval_id = setInterval(function(){
        if (width >= percent) {
            clearInterval(interval_id);
        } else {
            width += Math.max(0.001, (percent-width)/5)
            elem.style.width = width + '%';
            elem.innerHTML = Math.round(width) * 1 + '%';
        }
    }, 33.333);

}

function loadFundraiserData() {
    let element_id = "fundraiser-progress-bar";
    let address = "0xc22E34923F14f1663DdAB4956F92784DD4FE360a";
    let name = "CCN Donation Fund";
    let goal_balance_eth = 9;
    getEthBalance(address).then((result) => {
        return 100 * Number(Eth.fromWei(result, "ether")) / goal_balance_eth
    }).then((result) => {
        moveProgressBar(result, element_id)
    }).catch((error) => {
        console.log("err", error)
    });
}

$(document).ready(function() {
  console.log("DOMready");

  loadFundraiserData();

});
