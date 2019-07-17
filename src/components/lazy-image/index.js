import { Component } from 'react'

class LazyImage extends Component {
  constructor(props) {
    super(props)
    this.imgRef = null
    this.state = {}
  }

  lazyLoad (target) {
    if (!!window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        (entrances, observer) => {
          entrances.forEach(entrance => {
            if (entrance.isIntersecting) {
              const img = entrance.target
              const src = img.getAttribute('data-src')
              img.setAttribute('src', src)
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '0px',
          threshold: 1.0
        }
      )
      observer.observe(target)
    }
  }

  componentDidMount () {
    this.lazyLoad(this.imgRef)
  }

  render () {
    return !!window.IntersectionObserver ? (
      <img
        alt="alt"
        src={require('@/assets/images/default.png')}
        style={this.props.style}
        data-src={this.props.src}
        ref={el => (this.imgRef = el)}
      />
    ) : (
        <img alt="alt" style={this.props.style} src={this.props.src} />
      )
  }
}

export default LazyImage
