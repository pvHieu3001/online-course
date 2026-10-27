import { ComponentType } from 'react'

export interface LocationStates {
  '/'?: object
  '/book-detail'?: object
  '/login'?: object
  '/signup'?: object
  '/forgot-pass'?: object
  '/page404'?: object
}

export type PathName = keyof LocationStates

export interface Page {
  path: PathName
  component: ComponentType<unknown>
}
