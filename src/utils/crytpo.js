const hashSecret = async function hash(bytes) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
    console.log('hashBuffer', hashBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    console.log('hashArray', hashArray)
    const hashHex = hashArray
        .map(bytes => bytes.toString(16).padStart(2, '0'))
        .join('');
    console.log('hashHex', hashHex);
    // log("hashSecret output utf8", utf8);
    // log("hashSecret output hashBuffer", hashBuffer);
    // log("hashSecret output hashArray", hashArray);
    // log("hashSecret output hashHex", hashHex);
    return hashHex;
}

const secret = crypto.getRandomValues(new Uint8Array(32))
const secretHex = [...secret]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
console.log('secret', secret)
console.log('secretHex', secretHex)
// const secret = Math.random().toString(36).slice(2);

// log("{secret, secretHash, secret256}",{secret, secretHash: await hashSecret(secret)});
const secretHash = await hashSecret(secret);
console.log('secretHash', secretHash)
//
// setSecret(secretHex);
// setOrderSecret(secretHash);