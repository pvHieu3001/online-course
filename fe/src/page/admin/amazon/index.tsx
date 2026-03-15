import { Outlet } from 'react-router-dom'
import ListAmazon from './_components/list'

export default function AmazonManagement() {
  return (
    <div>
      <ListAmazon />
      <Outlet />
    </div>
  )
}
