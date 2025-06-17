import { errorConstants } from '../constants';

function unauthorized() {
  return { type: errorConstants.UNAUTHORIZED };
}

export const errorActions = {
  unauthorized
};
