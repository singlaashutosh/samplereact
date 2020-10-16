import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col,Table } from 'reactstrap';
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
    const { transactionEntityDateList, match, loading } = props;
    const transactionEntityDebitDateList= transactionEntityDateList.filter(transactionEntity=>transactionEntity.transType==="DEBIT");
    const transactionEntityCREDITDateList= transactionEntityDateList.filter(transactionEntity=>transactionEntity.transType==="CREDIT");
    return (
    <div><h4>hello</h4>
        <h3 id="transaction-entity-heading">
        Transactions
        
        </h3>

        
      
<div>
<Row>
   <Col md="6">
   <div className="container">
  <div className="row justify-content-center">
    <h3>Debit</h3>
  </div>
</div>
   <div className="table-responsive">
      {transactionEntityDebitDateList&& transactionEntityDebitDateList.length > 0  ? (
  
  
      <Table responsive  bordered size="sm">
         <thead>
            <tr>
               <th>Trans ID</th>
               <th>Trans Date</th>
               <th>Trans Ammount</th>
               <th>Description</th>
               
            </tr>
         </thead>
         <tbody>
       
            {transactionEntityDebitDateList.map((transactionEntity, i) => (
              
            <tr key={`entity-${i}`}>
               <td>
                  {transactionEntity.id}
               </td>
               <td>
                  {transactionEntity.transDate ? (
                  <TextFormat type="date" value={transactionEntity.transDate} format={APP_LOCAL_DATE_FORMAT} />
                  ) : null}
               </td>
               <td>{transactionEntity.transAmmount}</td>
               <td>{transactionEntity.description}</td>
            </tr>
                  
            ))}
         </tbody>
      </Table>
      ) : (
      <div ></div>
      )
}</div>
      </Col>
     
      <Col md="6">
      <div className="container">
  <div className="row justify-content-center">
    <h3>Credit</h3>
  </div>
</div>
   <div className="table-responsive">
      {transactionEntityCREDITDateList && transactionEntityCREDITDateList.length > 0  ? (
      <Table responsive bordered size="sm">
         <thead>
            <tr>
            <th>Trans ID</th>
               <th>Trans Date</th>
               <th>Trans Ammount</th>
               <th>Description</th>
               <th />
            </tr>
         </thead>
         <tbody>
       
            {transactionEntityCREDITDateList.map((transactionEntity, i) => (
              
              <tr key={`entity-${i}`}>
              <td>
                 {transactionEntity.id}
              </td>
              <td>
                 {transactionEntity.transDate ? (
                 <TextFormat type="date" value={transactionEntity.transDate} format={APP_LOCAL_DATE_FORMAT} />
                 ) : null}
              </td>
              <td>{transactionEntity.transAmmount}</td>
              <td>{transactionEntity.description}</td>
           </tr>
                  
            ))}
         </tbody>
         </Table>
      ):(<div></div>)}</div>
</Col>
</Row>
</div>
    
    
    </div>);
}

const mapStateToProps = ({ transactionEntity }: IRootState) => ({
    transactionEntityDateList: transactionEntity.entities,
    loading: transactionEntity.loading,
  });
  
  const mapDispatchToProps = {
    getEntitiesbydate,
  };
  
  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;
  
  export default connect(mapStateToProps, mapDispatchToProps)(TransactionEntityDate);