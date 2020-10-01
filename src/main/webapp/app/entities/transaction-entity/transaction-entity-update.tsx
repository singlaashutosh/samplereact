import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { getEntities as getAccountEntities } from 'app/entities/account-entity/account-entity.reducer';
import { getEntity, updateEntity, createEntity, reset } from './transaction-entity.reducer';
import { ITransactionEntity } from 'app/shared/model/transaction-entity.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransactionEntityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionEntityUpdate = (props: ITransactionEntityUpdateProps) => {
  const [accountEntityId, setAccountEntityId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { transactionEntityEntity, accountEntities, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/transaction-entity');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAccountEntities();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.entryDate = convertDateTimeToServer(values.entryDate);

    if (errors.length === 0) {
      const entity = {
        ...transactionEntityEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sampleReactApp.transactionEntity.home.createOrEditLabel">Create or edit a TransactionEntity</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : transactionEntityEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="transaction-entity-id">ID</Label>
                  <AvInput id="transaction-entity-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="transAmmountLabel" for="transaction-entity-transAmmount">
                  Trans Ammount
                </Label>
                <AvField
                  id="transaction-entity-transAmmount"
                  type="string"
                  className="form-control"
                  name="transAmmount"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="transDateLabel" for="transaction-entity-transDate">
                  Trans Date
                </Label>
                <AvField
                  id="transaction-entity-transDate"
                  type="date"
                  className="form-control"
                  name="transDate"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="transTypeLabel" for="transaction-entity-transType">
                  Trans Type
                </Label>
                <AvInput
                  id="transaction-entity-transType"
                  type="select"
                  className="form-control"
                  name="transType"
                  value={(!isNew && transactionEntityEntity.transType) || 'DEBIT'}
                >
                  <option value="DEBIT">DEBIT</option>
                  <option value="CREDIT">CREDIT</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="entryDateLabel" for="transaction-entity-entryDate">
                  Entry Date
                </Label>
                <AvInput
                  id="transaction-entity-entryDate"
                  type="datetime-local"
                  className="form-control"
                  name="entryDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.transactionEntityEntity.entryDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="transaction-entity-description">
                  Description
                </Label>
                <AvField id="transaction-entity-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label for="transaction-entity-accountEntity">Account Entity</Label>
                <AvInput id="transaction-entity-accountEntity" type="select" className="form-control" name="accountEntity.id">
                  <option value="" key="0" />
                  {accountEntities
                    ? accountEntities.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.code}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/transaction-entity" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  accountEntities: storeState.accountEntity.entities,
  transactionEntityEntity: storeState.transactionEntity.entity,
  loading: storeState.transactionEntity.loading,
  updating: storeState.transactionEntity.updating,
  updateSuccess: storeState.transactionEntity.updateSuccess,
});

const mapDispatchToProps = {
  getAccountEntities,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionEntityUpdate);
