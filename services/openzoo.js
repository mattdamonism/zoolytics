import axios from 'axios';

export async function getCollections() {
    let res = await axios.get("https://api-mainnet.openzoo.io/info/getcollections");
    if (res.data.status === "success") {
        return res.data.data;
    } else {
        return false;
    }
}

export async function getAttributeFilter(contract) {
    let res = await axios.get("https://api-mainnet.openzoo.io/collection/"+contract+"/attributeFilter");
    if (res.data.status === "success") {
        return res.data.data;
    } else {
        return false;
    }
}

export function fetchTokens() {

}