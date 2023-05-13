/**
 * @file An HTTP client implementation
 */

'use strict'

import { Buffer } from 'buffer'
import { EventEmitter } from 'events'

/**
 * Exports an implementation of a client
 * @type {Client}
 */
export default class Client extends EventEmitter {
  /**
   * Creates a new instance of Client
   * @param {Object} props Properties of the client
   * @param {String} props.id The unique name of the client
   * @param {String} [props.hostname='localhost'] The hostname of the Portal server
   * @param {Number} [props.port=80] The port of the Portal server
   * @param {String} [props.pathname='/api/v1/updates'] The path to the updates channel
   * @param {Object} [props.credentials] Credentials maintained by the client
   */
  constructor (props) {
    if (props == null) {
      throw Error('no properties specified for the client!')
    } else if (props.id == null || typeof props.id !== 'string') {
      throw Error('A client must be provided a unique identifier!')
    }

    super()

    this.id = props.id
    this.hostname = props.hostname || 'localhost'
    this.port = props.port || 80
    this.pathname = props.pathname || '/api/v1/updates'
    this.credentials = props.credentials
    this.websocket = null

    this.on('log', (level, ...args) => console[level](...args))

    Object.seal(this)
  }

  /**
   * Returns whether or not the client is connected to the server
   * @returns {Boolean}
   */
  get isConnected () {
    return (this.websocket != null) && (this.websocket.readyState === 1)
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
    return {
      '@type': this.constructor.name,
      id: this.id,
      hostname: this.hostname,
      port: this.port,
      pathname: this.pathname,
      connected: this.isConnected,
      credentials: this.credentials
    }
  }

  /**
   * Opens a connection to the server
   * @returns {Promise<Void>}
   */
  connect () {
    return new Promise((resolve, reject) => {
      const url = `ws://${this.hostname}:${this.port}${this.pathname}/${this.id}`
      const ws = new WebSocket(url)

      ws.onerror = () => { reject }
      ws.onclose = () => { this.websocket = null }
      ws.onopen = () => {
        ws.onmessage = (...args) => { this._onMessage(...args) }
        this.emit('connected')
        resolve()
      }

      this.websocket = ws
    })
  }

  /**
   * Closes the connection to the server
   * @returns {Promise<Void>}
   */
  disconnect () {
    return new Promise((resolve, reject) => {
      // this.websocket.onerror = (error) => { reject; log("disconnect error", error) } // TODO
      // this.websocket.onclose = () => { this.emit('disconnected'); resolve() } // TODO
      // this.websocket.close() // TODO
    })
  }

  /**
   * Adds a limit order to the orderbook
   * @param {Object} order The limit order to add the orderbook
   */
  submitLimitOrder (order) {
    return this._request('/api/v1/orderbook/limit', { method: 'PUT' }, {
      uid: this.id,
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
    return this._request('/api/v1/orderbook/limit', { method: 'DELETE' }, {
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
    return this._request('/api/v1/swap', { method: 'PUT' }, { swap, opts })
  }

  /**
   * Completes the atomic swap
   * @param {Swap|Object} swap The swap to commit
   * @param {Object} opts Options for the operation
   * @returns {Promise<Void>}
   */
  swapCommit (swap, opts) {
    return this._request('/api/v1/swap', { method: 'POST' }, { swap, opts })
  }

  /**
   * Abort the atomic swap optimistically and returns funds to owners
   * @param {Swap|Object} swap The swap to abort
   * @param {Object} opts Options for the operation
   * @returns {Promise<Void>}
   */
  swapAbort (swap, opts) {
    return this._request('/api/v1/swap', { method: 'DELETE' }, { swap, opts })
  }

  /**
    * Performs an HTTP request and returns the response
    * @param {String} url The URL path for the request
    * @param {Object} args Arguments for the operation
    * @param {Object} [obj] Optional data to be sent as part of the request
    * @returns {Promise<Object>}
    */
  _request (url, args, obj) {
    return new Promise((resolve, reject) => {
      const body = (obj && JSON.stringify(obj)) || ''
      const creds = `${this.id}:${this.id}`
      const headers = Object.assign(args.headers || {}, {
        accept: 'application/json',
        'accept-encoding': 'application/json',
        authorization: `Basic ${Buffer.from(`${creds}`).toString('base64')}`,
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(body),
        'content-encoding': 'identity'
      })

      this.emit('log', 'info', 'request', { url, headers, body: obj })
      args = Object.assign(args, { headers, body })

      fetch(url, args)
        .then(res => {
          const { status } = res
          const contentType = res.headers.get('Content-Type')

          if (status !== 200 && status !== 400) {
            const err = Error(`unexpected status code ${status}`)
            this.emit('log', 'error', 'response', err)
            reject(err)
          } else if (!contentType.startsWith('application/json')) {
            const err = Error(`unexpected content-type ${contentType}`)
            this.emit('log', 'error', 'response', err)
            reject(err)
          } else {
            res.json()
              .then(obj => {
                if (status === 200) {
                  this.emit('log', 'info', 'response', obj)
                  resolve(obj)
                } else {
                  this.emit('log', 'error', 'response', obj)
                  reject(Error(obj.message))
                }
              })
              .catch(err => {
                this.emit('log', 'error', 'response', err)
                reject(err)
              })
          }
        })
        .catch(err => {
          this.emit('log', 'error', 'response', err)
          reject(err)
        })
    })
  }

  /**
   * Send data to the server
   * @param {Object} obj The object to send
   * @returns {Promise<Void>}
   */
  _send (obj) {
    return new Promise((resolve, reject) => {
      const buf = Buffer.from(JSON.stringify(obj))
      const opts = { binary: false }

      this.emit('log', 'info', 'send', obj)
      this.websocket.send(buf, opts, err => {
        if (err == null) {
          resolve()
        } else {
          this.emit('log', 'error', 'send', err)
          reject(err)
        }
      })
    })
  }

  /**
    * Handles incoming websocket messages
    * @param {Buffer|Object} msg The message received over the websocket
    * @returns {Void}
    */
  _onMessage (msg) {
    let event, arg

    try {
      arg = JSON.parse(msg.data)
      event = (arg['@type'] != null && arg.status != null)
        ? `${arg['@type'].toLowerCase()}.${arg.status}`
        : 'message'
    } catch (err) {
      event = 'error'
      arg = err
    } finally {
      this.emit('log', 'info', event, arg)
      this.emit(event, arg)
    }
  }
}
