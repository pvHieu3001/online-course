import { Dispatch } from '@reduxjs/toolkit'
import { orderServices } from '../services/orders.service'
import {
  isFetching,
  fetchedDone,
  getOrdersSuccessFully,
  getOrdersFailure,
  deleteSuccessfully,
  deleteFailure,
  updateSuccessfully,
  updateFailure,
  createFailure,
  createSuccessfully,
  getByIdFailure,
  getByIdSuccessFully
} from '../slices/order.reducer'

export const getOrder = () => (dispatch: Dispatch) => {
  dispatch(isFetching())

  orderServices
    .getOrder()
    .then((res) => dispatch(getOrdersSuccessFully(res.data)))
    .catch((error) => dispatch(getOrdersFailure(error)))
    .finally(() => dispatch(fetchedDone()))
}

export const getOrderById = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  orderServices
    .getOrderById(id)
    .then((res) => dispatch(getByIdSuccessFully(res.data)))
    .catch((error) => dispatch(getByIdFailure(error)))
    .finally(() => dispatch(fetchedDone()))
}

export const createOrder = (data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  orderServices
    .createOrder(data)
    .then((res) => dispatch(createSuccessfully(res.data)))
    .catch(() => dispatch(createFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const updateOrder = (id, data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  orderServices
    .updateOrder(id, data)
    .then((res) => dispatch(updateSuccessfully(res.data)))
    .catch(() => dispatch(updateFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const deleteOrder = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  orderServices
    .deleteOrder(id)
    .then(() => dispatch(deleteSuccessfully()))
    .catch(() => dispatch(deleteFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const OrderActions = {
  getOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
}
