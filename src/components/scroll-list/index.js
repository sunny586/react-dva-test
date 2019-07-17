import React from 'react'
import BScroll from 'better-scroll'
import Icon from '../icon'

class ScrollList extends React.Component {
  // 常量定义
  PULLDOWN_REFRESH = '下拉刷新'
  REFRESH_ING = '刷新中...'
  NO_DATA = '没有更多的数据了...'
  LOADING = '加载中...'
  RELEASE_REFRESH = '释放刷新'

  constructor(props) {
    super(props)
    this.scroll = null
    this.isUp = true
    this.state = {
      dragTip: {
        text: this.PULLDOWN_REFRESH,
        showLoding: false
      },
      isLoading: false,
      isDone: false
    }
  }

  componentDidMount() {
    if (this.wrapper) {
      let opts = {
        probeType: 1,
        click: true,
        scrollX: false
      }
      if(this.props.opts){
        opts = {
          ...opts,
          ...this.props.opts
        }
      }
      this.scroll = new BScroll(this.wrapper, { ...opts })
      this.bindEvent()
    }
  }

  render() {
    const { className } = this.props
    return (
      <div ref={el => (this.wrapper = el)}  className={ className } style={{ height: this.props.height, overflow: 'hidden' }}>
        <div>
          {this.state.dragTip.showLoding && this.props.pullDown ? (
            <div>
              <div>
                <div style={{ textAlign: 'center' }}>
                  {this.state.dragTip.text === this.REFRESH_ING ? <Icon style={{ position: 'relative', top: '2px' }} type="lwuiconsimui-loading" spin /> : null}
                  {this.state.dragTip.text}
                </div>
              </div>
            </div>
          ) : null}
          <div>{this.props.children}</div>
          <div style={{ height: '24px', lineHeight: '24px' }}>
            {this.state.isLoading ? (
              <div style={{ textAlign: 'center' }}>
                <Icon style={{ position: 'relative', top: '2px' }} type="lwuiconsimui-loading" spin /> {this.LOADING}
              </div>
            ) : null}
            {!this.state.isLoading && this.state.isDone ? <div style={{ textAlign: 'center' }}>{this.NO_DATA}</div> : null}
          </div>
        </div>
      </div>
    )
  }

  bindEvent() {
    this.scroll.on('scroll', pos => {
      if (pos.y > 50 && this.props.pullDown) {
        this.setState({
          dragTip: {
            text: this.RELEASE_REFRESH,
            showLoding: true
          }
        })
      }
    })
    this.scroll.on('touchEnd', pos => {
      // 上拉加载
      if (this.props.pullUp && pos.y <= this.scroll.maxScrollY + 50) {
        this.isUp = true
        this.props.pullUpChange && this.props.pullUpChange()
      }
      // 下拉刷新
      if (this.props.pullDown && pos.y > 50) {
        this.isUp = false
        setTimeout(() => {
          this.setState({
            dragTip: {
              text: this.REFRESH_ING,
              showLoding: true
            }
          })
          this.props.pullDownChange && this.props.pullDownChange()
        }, 300)
      }
    })
  }

  reInit() {
    //  下拉刷新
    if (!this.isUp && this.props.pullDown) {
      this.setState({
        dragTip: {
          text: this.REFRESH_ING,
          showLoding: true
        }
      })
      this.disable()
    }
    // 上拉加载更多
    if (this.isUp && this.props.pullUp) {
      this.setState({
        isLoading: true,
        isDone: false
      })
      this.disable()
    }
  }

  disable() {
    this.scroll && this.scroll.disable()
  }

  enable() {
    this.scroll && this.scroll.enable()
  }
  // 完成一次数据的加载
  finishLoad() {
    //  下拉刷新
    if (!this.isUp && this.props.pullDown) {
      this.setState({
        dragTip: {
          text: this.REFRESH_ING,
          showLoding: false
        }
      })
      this.enable()
    }
    // 上拉加载更多
    if (this.isUp && this.props.pullUp) {
      this.setState({
        isLoading: false
      })
      this.enable()
    }
  }
  // 完成所有的数据加载
  loadedDone() {
    this.setState({
      isLoading: false,
      isDone: true
    })
    this.enable()
  }
}

export default ScrollList
