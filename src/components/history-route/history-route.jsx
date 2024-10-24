/* eslint-disable react/prop-types */
import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

function HistoryRouter({ history, basename, children }) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
