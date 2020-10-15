import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntitiesbydate } from './transaction-entity.reducer';
import { ITransactionEntity } from 'app/shared/model/transaction-entity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
export interface ITransactionEntityDateProps extends StateProps, DispatchProps, RouteComponentProps<{ date: string }> {}

export const TransactionEntityDate = (props: ITransactionEntityDateProps) => {
    useEffect(() => {
      props.getEntitiesbydate(props.match.params.date);
    }, []);
    return (<div><h4>hello</h4></div>);
}

const mapStateToProps = ({ transactionEntity }: IRootState) => ({
    transactionEntityList: transactionEntity.entities,
    loading: transactionEntity.loading,
  });
  
  const mapDispatchToProps = {
    getEntitiesbydate,
  };
  
  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;
  
  export default connect(mapStateToProps, mapDispatchToProps)(TransactionEntityDate);