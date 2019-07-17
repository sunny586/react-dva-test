import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim'
import styles from './index.scss'

class Fold extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: this.props.open || false
    }
  }

  toggle() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div style={{ paddingBottom: `${this.state.open ? '0' : '0.36rem'}` }} {...this.props} className={`${styles['yui-fold-item']} ${this.props.className}`}>
        <div onClick={this.toggle}>{this.props.title}</div>
        <QueueAnim key="demo">
          {this.state.open ? (
            <div key="a">
              <ul className={styles['child-list']}>
                {React.Children.map(this.props.children, child => {
                  return <li>{child}</li>
                })}
              </ul>
            </div>
          ) : null}
        </QueueAnim>
      </div>
    )
  }
}

class FoldItem extends Component {
  render() {
    return (
      <div {...this.props}>
        {React.Children.map(this.props.children, child => {
          return <span>{child}</span>
        })}
      </div>
    )
  }
}

export { Fold, FoldItem }
