import React from 'react'
import classNames from 'classnames'

const Icons = props => {
  const { type, spin, className = '', ...others } = props

  const cls = classNames(
    {
      lwuiconfont: true,
      [`${type}`]: true,
      'iconfont-spin': !!spin
    },
    className
  )

  return <i className={cls} {...others} />
}

export default Icons
