import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './account-entity.reducer';
import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAccountEntityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AccountEntity = (props: IAccountEntityProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { accountEntityList, match, loading } = props;
  return (
    <div>
      <h2 id="account-entity-heading">
        Account Entities
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Account Entity
        </Link>
      </h2>
      <div className="table-responsive">
        {accountEntityList && accountEntityList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Account Name</th>
                <th>Description</th>
                <th>Opening Balance</th>
                <th>Closing Balance</th>
                <th>Created At</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {accountEntityList.map((accountEntity, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${accountEntity.id}`} color="link" size="sm">
                      {accountEntity.id}
                    </Button>
                  </td>
                  <td>{accountEntity.code}</td>
                  <td>{accountEntity.accountName}</td>
                  <td>{accountEntity.description}</td>
                  <td>{accountEntity.openingBalance}</td>
                  <td>{accountEntity.closingBalance}</td>
                  <td>
                    {accountEntity.createdAt ? <TextFormat type="date" value={accountEntity.createdAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${accountEntity.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${accountEntity.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${accountEntity.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Account Entities found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ accountEntity }: IRootState) => ({
  accountEntityList: accountEntity.entities,
  loading: accountEntity.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccountEntity);
