import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './account-entity.reducer';
import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAccountEntityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AccountEntityDetail = (props: IAccountEntityDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

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
