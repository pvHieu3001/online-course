import { Dispatch } from '@reduxjs/toolkit'
import { Orderervices } from '../services/Order.service'
import {
  isFetching,
  fetchedDone,
  getOrderSuccessFully,
  getOrderFailure,
  deleteSuccessfully,
  deleteFailure,
  updateSuccessfully,
  updateFailure,
  createFailure,
  createSuccessfully,
  getByIdFailure,
  getByIdSuccessFully
} from '../slices/Order.reducer'

export const getOrder = () => (dispatch: Dispatch) => {
  dispatch(isFetching())

  Orderervices
    .getOrder()
    .then((res) => dispatch(getOrderSuccessFully(res.data)))
    .catch((error) => dispatch(getOrderFailure(error)))
    .finally(() => dispatch(fetchedDone()))
}

export const getOrderById = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  Orderervices
    .getOrderById(id)
    .then((res) => dispatch(getByIdSuccessFully(res.data)))
    .catch((error) => dispatch(getByIdFailure(error)))
    .finally(() => dispatch(fetchedDone()))
}

export const createOrder = (data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  Orderervices
    .createOrder(data)
    .then((res) => dispatch(createSuccessfully(res.data)))
    .catch(() => dispatch(createFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const updateOrder = (id, data) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  Orderervices
    .updateOrder(id, data)
    .then((res) => dispatch(updateSuccessfully(res.data)))
    .catch(() => dispatch(updateFailure()))
    .finally(() => dispatch(fetchedDone()))
}

export const deleteOrder = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  Orderervices
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
