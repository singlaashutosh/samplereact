import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transaction-entity.reducer';
import { ITransactionEntity } from 'app/shared/model/transaction-entity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionEntityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionEntityDetail = (props: ITransactionEntityDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { transactionEntityEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          TransactionEntity [<b>{transactionEntityEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="transAmmount">Trans Ammount</span>
          </dt>
          <dd>{transactionEntityEntity.transAmmount}</dd>
          <dt>
            <span id="transDate">Trans Date</span>
          </dt>
          <dd>
            {transactionEntityEntity.transDate ? (
              <TextFormat value={transactionEntityEntity.transDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="transType">Trans Type</span>
          </dt>
          <dd>{transactionEntityEntity.transType}</dd>
          <dt>
            <span id="entryDate">Entry Date</span>
          </dt>
          <dd>
            {transactionEntityEntity.entryDate ? (
              <TextFormat value={transactionEntityEntity.entryDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{transactionEntityEntity.description}</dd>
          <dt>Account Entity</dt>
          <dd>{transactionEntityEntity.accountEntity ? transactionEntityEntity.accountEntity.code : ''}</dd>
        </dl>
        <Button tag={Link} to="/transaction-entity" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/transaction-entity/${transactionEntityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ transactionEntity }: IRootState) => ({
  transactionEntityEntity: transactionEntity.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionEntityDetail);
