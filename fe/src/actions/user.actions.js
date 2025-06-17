import { delay } from "framer-motion";
import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./alert.actions";

export const getAll = (data) => async (dispatch) => {
  dispatch({ type: userConstants.GETALL_REQUEST });

  await userService.getAll(data).then(
    (res) =>
      dispatch({ type: userConstants.GETALL_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: userConstants.GETALL_FAILURE,
        payload: error.toString(),
      })
  );
};

export const get = (id) => async (dispatch) => {
  await userService.get(id).then(
    (res) => {
      dispatch({ type: userConstants.GETBYID_SUCCESS, payload: res.data });
    },
    (error) => {
      dispatch({
        type: userConstants.GETBYID_FAILURE,
        payload: error.toString(),
      });
    }
  );
};

export const approve = (userId) => async (dispatch) => {
  await userService.approve(userId).then(
    (res) => {
      dispatch({ type: userConstants.APPROVE_SUCCESS, payload: res.data });
      // Send email to user
      userService.get(userId).then(
        (res) => {
          userService.sendOkEmail(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    (error) => {
      dispatch({
        type: userConstants.APPROVE_FAILURE,
        payload: error.toString(),
      });
    }
  );
};

export const getUserLoggedIn = () => async (dispatch) => {
  await userService.getUserLoggedIn().then(
    (res) => {
      dispatch({ type: userConstants.GETLOGGEDIN_SUCCESS, payload: res.data });
    },
    (error) => {
      dispatch({
        type: userConstants.GETLOGGEDIN_FAILURE,
        payload: error.toString(),
      });
    }
  );
};

export const getUsers = (keyword, data) => async (dispatch) => {
  dispatch({ type: userConstants.GET_USERS_REQUEST });

  await userService.getUsers(keyword, data).then(
    (res) =>
      dispatch({ type: userConstants.GET_USERS_SUCCESS, payload: res.data }),
    (error) =>
      dispatch({
        type: userConstants.GET_USERS_FAILURE,
        payload: error.toString(),
      })
  );
};

export const getUnApproveUsers = (keyword, data) => async (dispatch) => {
  dispatch({ type: userConstants.GET_UNAPPROVE_USERS_REQUEST });

  await userService.getUnApproveUsers(keyword, data).then(
    (res) =>
      dispatch({
        type: userConstants.GET_UNAPPROVE_USERS_SUCCESS,
        payload: res.data,
      }),
    (error) =>
      dispatch({
        type: userConstants.GET_UNAPPROVE_USERS_FAILURE,
        payload: error.toString(),
      })
  );
};

export const login = (token) => async (dispatch) => {
  dispatch({ type: userConstants.LOGIN_REQUEST });

  await userService.login(token).then(
    (res) => {
      dispatch({ type: userConstants.LOGIN_SUCCESS, payload: res.token });
    },
    (error) => {
      dispatch({
        type: userConstants.LOGIN_FAILURE,
        payload: error.toString(),
      });
    }
  );
};

export const create = (user) => async (dispatch) => {
  dispatch({ type: userConstants.CREATE_REQUEST });

  await userService.create(user).then(
    (res) => {
      dispatch({ type: userConstants.CREATE_SUCCESS, payload: res.data });
      // dispatch(alertActions.success("Thêm mới thành công"));
    },
    (error) => {
      dispatch({
        type: userConstants.CREATE_FAILURE,
        payload: error.response.data,
      });
      dispatch(alertActions.error(error));
    }
  );
};

export const update = (user) => async (dispatch) => {
  dispatch({ type: userConstants.UPDATE_REQUEST, user });

  await userService.update(user.id, user).then(
    (res) => {
      dispatch({ type: userConstants.UPDATE_SUCCESS, payload: res.data });
      // dispatch(alertActions.success("Cập nhật dữ liệu thành công"));
    },
    (error) => {
      dispatch({
        type: userConstants.UPDATE_FAILURE,
        payload: error.response.data,
      });
      dispatch(alertActions.error(error));
    }
  );
};

export const deleteItem = (id) => async (dispatch) => {
  dispatch({ type: userConstants.DELETE_REQUEST });

  await userService.delete(id).then(
    (res) => {
      dispatch({ type: userConstants.DELETE_SUCCESS });
      // dispatch(alertActions.success("Xóa dữ liệu thành công"));
    },
    (error) => {
      dispatch({
        type: userConstants.DELETE_FAILURE,
        payload: error.toString(),
      });
      dispatch(alertActions.error(error));
    }
  );
};

export const reject = (userId) => async (dispatch) => {
  dispatch({ type: userConstants.REJECT_REQUEST });

  await userService.reject(userId).then(
    (res) => {
      dispatch({ type: userConstants.REJECT_SUCCESS });
      // Send email to user
      userService.get(userId).then(
        (res) => {
          userService.sendRejectEmail(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    (error) =>
      dispatch({
        type: userConstants.REJECT_FAILURE,
        payload: error.toString(),
      })
  );
};

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

export const reissuePassword = (email) => async (dispatch) => {
  dispatch({ type: userConstants.ISSUEPASSWORD_REQUEST });

  var data = {
    to: email,
  };
  await userService.reissuePassword(data).then(
    (res) => {
      dispatch({ type: userConstants.ISSUEPASSWORD_SUCCESS, payload: res.data });
    },
    (error) =>
      dispatch({
        type: userConstants.ISSUEPASSWORD_FAILURE,
        payload: error.response.data,
      })
  );
};

export const getLogs = (month, year) => async (dispatch) => {
  dispatch({ type: userConstants.GETLOGS_REQUEST });

  var data = {
    month: month,
    year: year,
  };
  await userService.getLogs(data).then(
    (res) => {
      dispatch({ type: userConstants.GETLOGS_SUCCESS });
      const url = window.URL.createObjectURL(
        new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          encoding: "UTF-8",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `user_access_logs_${year}_${month}.xlsx`);
      document.body.appendChild(link);
      link.click();
    },
    (error) =>
      dispatch({
        type: userConstants.GETLOGS_FAILURE,
        payload: error.toString(),
      })
  );
};

export const userActions = {
  getAll,
  get,
  login,
  getUserLoggedIn,
  getUsers,
  getUnApproveUsers,
  create,
  update,
  approve,
  reject,
  delete: deleteItem,
  logout,
  reissuePassword,
  getLogs,
};
