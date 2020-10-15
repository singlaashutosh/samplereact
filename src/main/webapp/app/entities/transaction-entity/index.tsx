import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TransactionEntity from './transaction-entity';
import TransactionEntityDetail from './transaction-entity-detail';
import TransactionEntityUpdate from './transaction-entity-update';
import TransactionEntityDeleteDialog from './transaction-entity-delete-dialog';
import TransactionEntityDate from './transaction-entity-Date';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TransactionEntityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TransactionEntityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransactionEntityDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/Date/:date`} component={TransactionEntityDate} />
      <ErrorBoundaryRoute path={match.url} component={TransactionEntity} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TransactionEntityDeleteDialog} />
  </>
);

export default Routes;
