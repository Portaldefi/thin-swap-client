'use strict'

import Core  from './core.js'
import { EventEmitter } from 'events'
export default class Client  extends EventEmitter {


    constructor (props) {

        if (props == null) {
            throw Error('no properties specified for the client!')
        } else if (props.id == null || typeof props.id !== 'string') {
            throw Error('A client must be provided a unique identifier!')
        }

        super()

        this.username = props.id
        // props.pathname = props.pathname || '/api/v2/dev'
        props.pathname = props.pathname || '/api/v2/updates'
        this.core = new Core(props)

        Object.seal(this)
    }

    /**
     * Returns whether or not the client is connected to the server
     * @returns {Boolean}
     */
    get isConnected () {
        return this.core.isConnected
    }

    /**
     * Returns the current state of the instance
     * @type {String}
     */
    [Symbol.for('nodejs.util.inspect.custom')] () {
        return this.toJSON()
    }

    /**
     * Returns the JSON representation of this instance
     * @returns {Object}
     */
    toJSON () {
        return this.core.toJSON()
    }

    /**
     * Opens a connection to the server
     * @returns {Promise<Void>}
     */
    connect () {
        return this.core.connect()
    }

    /**
     * Closes the connection to the server
     * @returns {Promise<Void>}
     */
    disconnect () {
        return this.core.disconnect()
    }

    _send(obj) {
        return this.core._send(obj)
    }

    listen(eventName, listener) {
        this.core.on(eventName, listener)
    }


    /**
     * Adds a limit order to the orderbook
     * @param {Object} order The limit order to add the orderbook
     */
    submitLimitOrder (order) {
        return this.core._request('/api/v2/orderbook/limit', { method: 'PUT' }, {
            uid: this.username,
            side: order.side,
            hash: order.hash,
            baseAsset: order.baseAsset,
            baseNetwork: order.baseNetwork,
            baseQuantity: order.baseQuantity,
            quoteAsset: order.quoteAsset,
            quoteNetwork: order.quoteNetwork,
            quoteQuantity: order.quoteQuantity
        })
    }

    /**
     * Adds a limit order to the orderbook
     * @param {Object} order The limit order to delete the orderbook
     */
    cancelLimitOrder (order) {
        return this.core._request('/api/v2/orderbook/limit', { method: 'DELETE' }, {
            id: order.id,
            baseAsset: order.baseAsset,
            quoteAsset: order.quoteAsset
        })
    }

    /**
     * Create the required state for an atomic swap
     * @param {Swap|Object} swap The swap to open
     * @param {Object} opts Options for the operation
     * @returns {Swap}
     */
    swapOpen (swap, opts) {
        return this.core._request('/api/v2/swap', { method: 'PUT' }, { swap, opts })
    }

    /**
     * Completes the atomic swap
     * @param {Swap|Object} swap The swap to commit
     * @param {Object} opts Options for the operation
     * @returns {Promise<Void>}
     */
    swapCommit (swap, opts) {
        return this.core._request('/api/v2/swap', { method: 'POST' }, { swap, opts })
    }

    /**
     * Abort the atomic swap optimistically and returns funds to owners
     * @param {Swap|Object} swap The swap to abort
     * @param {Object} opts Options for the operation
     * @returns {Promise<Void>}
     */
    swapAbort (swap, opts) {
        return this.core._request('/api/v2/swap', { method: 'DELETE' }, { swap, opts })
    }

    _send(obj) {
        return this.core._send(obj)
    }

}