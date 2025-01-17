import browserHistory from '../../browser-history';

export const redirect =
  () => (next) => (action ) => {
    if (action.type === 'data/redirectToRoute') {
      browserHistory.push(action.payload);
    }
    return next(action);
  };
