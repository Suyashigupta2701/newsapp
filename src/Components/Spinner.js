import React, { Component } from 'react'
import Book from './Book.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <img src={Book} alt='Loading'/>
      </div>
    )
  }
}
