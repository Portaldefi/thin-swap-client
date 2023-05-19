

export const hashSecret = async function hash(bytes) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', bytes)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
        .map(bytes => bytes.toString(16).padStart(2, '0'))
        .join('')
    return hashHex
}

export const newSecret = async () => { return crypto.getRandomValues(new Uint8Array(32)) }

// const secret = newSecret;
export const generateSecret  = async (secret) => {
    const hex = [...secret]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}



