import { connect } from 'dva'
import { useEffect } from 'react'
import { SearchBar } from 'antd-mobile'
import { XScroll, ScrollList, Star, LazyImage } from '@/components'
import styles from './index.scss'

export default connect(({ app }) => ({
  app
}))(props => {
  // 滚动列表
  let scrollListRef = null

  // 从store去数据
  const { recomendData, appListData } = props.app

  const loadData = (data = '') => {
    // 初始化page
    props.dispatch({
      type: 'app/CHANGE_PAGE',
      payload: {
        page: 0
      }
    })
    // 设置keywords
    props.dispatch({
      type: 'app/CHANGE_KWORDS',
      payload: {
        keywords: data
      }
    })
    // 调列表接口
    props.dispatch({
      type: 'app/queryAppListData',
      payload: {
        scrollListRef
      }
    })
    // 调推荐接口
    props.dispatch({
      type: 'app/queryRecomendData'
    })
  }

  // 初始化调用
  useEffect(() => {
    loadData()
  }, [])

  // 关键子搜索处理函数
  const searchOnChange = data => {
    // 清除state数据
    props.dispatch({
      type: 'app/CLEAR_DATA'
    })
    loadData(data)
  }

  // 关键字清除处理函数
  const searchOnClear = () => {
    // 清除state数据
    props.dispatch({
      type: 'app/CLEAR_DATA'
    })
    loadData()
  }

  // 列表数据模版函数
  const appListDataTpl = data => {
    return data && data.length > 0
      ? data.map((item, index) => {
          return (
            <li key={index} className={styles['list-item']}>
              <div className={styles['list-item-box']}>
                <div className={styles['index']}>{index + 1}</div>
                <div className={styles['images']}>
                {
                  index % 2 === 1 ? 
                  <LazyImage style={{ borderRadius: '50%',width:'1.5rem' }} src={item['im:image'][1].label} /> : 
                  <LazyImage style={{ borderRadius: '0.24rem',width:'1.5rem' }} src={item['im:image'][1].label} />
                }
                </div>
                <div className={styles['desc']}>
                  <div className={styles['title']}>{item['im:name'].label}</div>
                  <div className={styles['type']}>{item['category']['attributes'].label}</div>
                  <div className={styles['star']}>
                    <Star count="5" />
                    &#40;17&#41;
                  </div>
                </div>
              </div>
            </li>
          )
        })
      : null
  }

  // 推荐数据模版函数
  const recomendDataTpl = data => {
    return data && data.length > 0
      ? data.map((item, index) => {
          return (
            <li className={styles['tab-item']} key={index}>
              <a href={item['link']['attributes'].href}>
                <LazyImage style={{ width:'1.5rem' }} src={item['im:image'][1].label} /> 
                <div className={styles['name']} style={{ WebkitBoxOrient: 'vertical' }}>
                  {item['im:name'].label}
                </div>
                <div className={styles['desc']}>{item['category']['attributes'].label}</div>
              </a>
            </li>
          )
        })
      : null
  }

  // 上拉加载回调函数
  const pullUpChange = () => {
    props.dispatch({
      type: 'app/queryAppListData',
      payload: {
        scrollListRef
      }
    })
  }

  // 下拉刷新回调函数
  const pullDownChange = () => {
    props.dispatch({
      type: 'app/queryAppListData',
      payload: {
        scrollListRef,
        type: 'down'
      }
    })
  }

  return (
    <div className={styles['main-card']}>
      <div className={styles['cantainer']}>
        <SearchBar style={{ borderBottom: '1px solid #bbb', borderRadius: '0.04rem', height: '0.9rem' }} onChange={searchOnChange} onClear={searchOnClear} placeholder="搜索" />
        <h3 className={styles['title']}>推荐</h3>
        {recomendDataTpl(recomendData) ? (
          <XScroll className={styles['x-scroll']}>
            <ul className={styles['tab-content']}>{recomendDataTpl(recomendData)}</ul>
          </XScroll>
        ) : (
          <div className={styles['x-scroll-no-data']}>
            <img alt="alt" src={require('@/assets/images/no-data.png')} className={styles['x-scroll-no-data-icon']} />
            <div>暂无相关推荐</div>
          </div>
        )}
      </div>
      <ScrollList ref={el => (scrollListRef = el)} height="calc(100% - 5.4rem)" className={styles['scroll-list']} pullDown pullDownChange={pullDownChange} pullUp pullUpChange={pullUpChange}>
        <ul className={styles['list-content']}>{appListDataTpl(appListData)}</ul>
      </ScrollList>
    </div>
  )
})
