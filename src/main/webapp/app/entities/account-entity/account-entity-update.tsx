import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './account-entity.reducer';
import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAccountEntityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AccountEntityUpdate = (props: IAccountEntityUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { accountEntityEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/account-entity');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);

    if (errors.length === 0) {
      const entity = {
        ...accountEntityEntity,
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
          <h2 id="sampleReactApp.accountEntity.home.createOrEditLabel">Create or edit a AccountEntity</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : accountEntityEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="account-entity-id">ID</Label>
                  <AvInput id="account-entity-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="account-entity-code">
                  Code
                </Label>
                <AvField
                  id="account-entity-code"
                  type="string"
                  className="form-control"
                  name="code"
                  validate={{
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="accountNameLabel" for="account-entity-accountName">
                  Account Name
                </Label>
                <AvField
                  id="account-entity-accountName"
                  type="text"
                  name="accountName"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="account-entity-description">
                  Description
                </Label>
                <AvField
                  id="account-entity-description"
                  type="text"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="openingBalanceLabel" for="account-entity-openingBalance">
                  Opening Balance
                </Label>
                <AvField
                  id="account-entity-openingBalance"
                  type="string"
                  className="form-control"
                  name="openingBalance"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="closingBalanceLabel" for="account-entity-closingBalance">
                  Closing Balance
                </Label>
                <AvField id="account-entity-closingBalance" type="string" className="form-control" name="closingBalance" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="account-entity-createdAt">
                  Created At
                </Label>
                <AvInput
                  id="account-entity-createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.accountEntityEntity.createdAt)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/account-entity" replace color="info">
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
  accountEntityEntity: storeState.accountEntity.entity,
  loading: storeState.accountEntity.loading,
  updating: storeState.accountEntity.updating,
  updateSuccess: storeState.accountEntity.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccountEntityUpdate);
