import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './account-entity.reducer';
import { getTransactionByAccountEntities } from './account-entity.reducer';
import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAccountEntityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AccountEntityDetail = (props: IAccountEntityDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
    
  }, []);
  
 
  const {transactionEntityList}= props
  const { accountEntityEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          AccountEntity [<b>{accountEntityEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{accountEntityEntity.code}</dd>
          <dt>
            <span id="accountName">Account Name</span>
          </dt>
          <dd>{accountEntityEntity.accountName}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{accountEntityEntity.description}</dd>
          <dt>
            <span id="openingBalance">Opening Balance</span>
          </dt>
          <dd>{accountEntityEntity.openingBalance}</dd>
          <dt>
            <span id="closingBalance">Closing Balance</span>
          </dt>
          <dd>{accountEntityEntity.closingBalance}</dd>
          <dt>
            <span id="createdAt">Created At</span>
          </dt>
          <dd>
            {accountEntityEntity.createdAt ? (
              <TextFormat value={accountEntityEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/account-entity" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/account-entity/${accountEntityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ accountEntity }: IRootState) => ({
  accountEntityEntity: accountEntity.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccountEntityDetail);

<div>
      <h2 id="transaction-entity-heading">
        Transaction Entities 
      </h2>
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