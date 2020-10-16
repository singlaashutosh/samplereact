import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './transaction-entity.reducer';
import { ITransactionEntity } from 'app/shared/model/transaction-entity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import moment from 'moment';
export interface ITransactionEntityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TransactionEntity = (props: ITransactionEntityProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { transactionEntityList, match, loading } = props;
  return (
    <div>
      <h2 id="transaction-entity-heading">
        Transaction Entities
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Transaction Entity
        </Link>
      </h2>
      <Button tag={Link} to={`${match.url}/Date/${moment().format("YYYY-MM-DD")}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Dates</span>
                      </Button>
      <div className="table-responsive">
        {transactionEntityList && transactionEntityList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Trans Ammount</th>
                <th>Trans Date</th>
                <th>Trans Type</th>
                <th>Entry Date</th>
                <th>Description</th>
                <th>Account Entity</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {transactionEntityList.map((transactionEntity, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${transactionEntity.id}`} color="link" size="sm">
                      {transactionEntity.id}
                    </Button>
                  </td>
                  <td>{transactionEntity.transAmmount}</td>
                  <td>
                    {transactionEntity.transDate ? (
                      <TextFormat type="date" value={transactionEntity.transDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{transactionEntity.transType}</td>
                  <td>
                    {transactionEntity.entryDate ? (
                      <TextFormat type="date" value={transactionEntity.entryDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{transactionEntity.description}</td>
                  <td>
                    {transactionEntity.accountEntity ? (
                      <Link to={`account-entity/${transactionEntity.accountEntity.id}`}>{transactionEntity.accountEntity.code}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${transactionEntity.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${transactionEntity.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${transactionEntity.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/Date/${(transactionEntity.transDate)}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Date</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Transaction Entities found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ transactionEntity }: IRootState) => ({
  transactionEntityList: transactionEntity.entities,
  loading: transactionEntity.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionEntity);
