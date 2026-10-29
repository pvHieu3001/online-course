import { Dispatch } from '@reduxjs/toolkit'
import { bookServices } from '../services/book.service'
import {
  isFetching,
  fetchedDone,
  reset,
  getBooksSuccessFully,
  getBooksFailure,
  deleteSuccessfully,
  deleteFailure,
  updateSuccessfully,
  updateFailure,
  createFailure,
  createSuccessfully,
  getByIdFailure,
  getByIdSuccessFully,
  getBooksByCategorySuccessFully,
  getBooksByCategoryFailure,
  getRecommendBooksSuccessFully,
  getQuickViewBooksSuccessFully
} from '../slices/book.reducer'

export const getBooks =
  (
    status?: string,
    search?: string,
    isDisplayHot?: string,
    currentPage?: number,
    booksPerPage?: number,
    tag?: string
  ) =>
  (dispatch: Dispatch) => {
    dispatch(isFetching())

    return bookServices
      .getBooks(status, search, isDisplayHot, currentPage, booksPerPage, tag)
      .then((res) => {
        dispatch(getBooksSuccessFully(res.data))
        return res
      })
      .catch((error) => {
        dispatch(getBooksFailure(error))
        throw error
      })
      .finally(() => dispatch(fetchedDone()))
  }

export const getAdminBooks =
  (status?: string, search?: string, isDisplayHot?: string, currentPage?: number, booksPerPage?: number) =>
  (dispatch: Dispatch) => {
    dispatch(isFetching())

    return bookServices
      .getAdminBooks(status, search, isDisplayHot, currentPage, booksPerPage)
      .then((res) => {
        dispatch(getBooksSuccessFully(res.data))
        return res
      })
      .catch((error) => {
        dispatch(getBooksFailure(error))
        throw error
      })
      .finally(() => dispatch(fetchedDone()))
  }

export const getRecommendBooks = () => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return bookServices
    .getRecommendBooks()
    .then((res) => {
      dispatch(getRecommendBooksSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getBooksFailure(error))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const getQuickViewBooks = () => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return bookServices
    .getQuickViewBooks()
    .then((res) => {
      dispatch(getQuickViewBooksSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getBooksFailure(error))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const getBookById = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return bookServices
    .getBookById(id)
    .then((res) => {
      dispatch(getByIdSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getByIdFailure(error))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const getBookBySlug = (slug: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return bookServices
    .getBookBySlug(slug)
    .then((res) => {
      dispatch(getByIdSuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getByIdFailure(error))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const createBook = (data: FormData) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return bookServices
    .createBook(data)
    .then((res) => {
      dispatch(createSuccessfully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(createFailure())
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const updateBook = (id: string, data: FormData) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return bookServices
    .updateBook(id, data)
    .then((res) => {
      dispatch(updateSuccessfully(res.data))
      return res
    })
    .catch((err) => {
      dispatch(updateFailure())
      throw err
    })
    .finally(() => dispatch(fetchedDone()))
}

export const deleteBook = (id: string) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return bookServices
    .deleteBook(id)
    .then((res) => {
      dispatch(deleteSuccessfully())
      return res
    })
    .catch((error) => {
      dispatch(deleteFailure())
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const getBooksByCategory = (categoryId: number) => (dispatch: Dispatch) => {
  dispatch(isFetching())

  return bookServices
    .getBooksByCategory(categoryId)
    .then((res) => {
      dispatch(getBooksByCategorySuccessFully(res.data))
      return res
    })
    .catch((error) => {
      dispatch(getBooksByCategoryFailure(error))
      throw error
    })
    .finally(() => dispatch(fetchedDone()))
}

export const resetBook = () => (dispatch: Dispatch) => {
  dispatch(reset())
}

export const bookActions = {
  getBooks,
  getAdminBooks,
  getBookById,
  getBookBySlug,
  createBook,
  updateBook,
  deleteBook,
  getBooksByCategory,
  resetBook,
  getRecommendBooks,
  getQuickViewBooks
}
