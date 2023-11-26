/*
 * Copyright (c) 2023 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import type React from 'react'

declare module 'next' {
  // Add type support for Next APP router's layout and page
  // Please remove this after the official type support being added
  interface LayoutDefaultProps {
    children?: React.ReactNode
    params: Record<string, any>
  }

  export type NextAppLayout<
    P = Record<string, never>,
    D = LayoutDefaultProps,
  > = React.FC<P & D>

  interface PageDefaultProps {
    params: Record<string, any>
    searchParams: Record<string, any>
  }

  export type NextAppPage<
    P = Record<string, never>,
    D = PageDefaultProps,
  > = React.FC<P & D>
  // End
}
