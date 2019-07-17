import { connect } from 'dva'
import {  Link } from 'dva/router'
import { Fold, FoldItem } from '@/components/fold'
import styles from './index.scss'

export default connect(({ app }) => ({
  app
}))(props => {
  console.log(props)
  return (
    <div className={styles['yui-main-container']}>
      <h1 className={styles['title']}>Ui Mobile</h1>
      <em>移动端组件库</em>
      <Fold title="布局" className={styles['fold']}>
        <FoldItem><Link to="/example/white-space"><div>WhiteSpace</div></Link></FoldItem>
      </Fold>
      <Fold title="基础组件" className={styles['fold']}>
        <FoldItem><Link to="/example/button"><div>Button</div></Link></FoldItem>
        <FoldItem>Input</FoldItem>
      </Fold>
      <Fold title="导航" className={styles['fold']}>
        <FoldItem><Link to="/example/fold"><div>Fold</div></Link></FoldItem>
      </Fold>
      <Fold title="手势" className={styles['fold']}>
        <FoldItem><Link to="/example/scroll"><div>Scroll</div></Link></FoldItem>
      </Fold>
    </div>
  )
})
