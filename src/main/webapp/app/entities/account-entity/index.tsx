import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AccountEntity from './account-entity';
import AccountEntityDetail from './account-entity-detail';
import AccountEntityUpdate from './account-entity-update';
import AccountEntityDeleteDialog from './account-entity-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AccountEntityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AccountEntityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AccountEntityDetail} />
      <ErrorBoundaryRoute path={match.url} component={AccountEntity} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AccountEntityDeleteDialog} />
  </>
);

export default Routes;
