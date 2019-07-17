import { Component } from 'react'
import BScroll from 'better-scroll'

class XScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (this.wrapper) {
      if(!this.scroll){
        this.scroll = new BScroll(this.wrapper, {
          startX: 0,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: 'vertical'
        })
      }else {
        this.scroll.refresh()
      }
    }
  }

  render() {
    return (
      <div ref={el => (this.wrapper = el)} { ...this.props } style={{ width: '100vw', overflow: 'hidden' }}>
       {this.props.children}
      </div>
    )
  }
}

export default XScroll
