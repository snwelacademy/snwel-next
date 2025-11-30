'use client'

import { Render } from '@measured/puck'
import React from 'react'
import { conf } from './builder'

const RenderPage = (props: any) => {
  return (
    <Render config={conf as any} {...props} />
  )
}

export default RenderPage