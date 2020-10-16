import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './account-entity.reducer';
// import { getTransactionByAccountEntities } from './account-entity.reducer';
import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';


export interface IAccountEntityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AccountEntityDetail = (props: IAccountEntityDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);

  }, []);
  
 
  
  const { accountEntityEntity } = props;
  const transactions= accountEntityEntity.transactionEntities;
 // const transactionEntityDebitDateList= transactions.filter(transactionEntity=>transactionEntity.transType==="DEBIT");
// const transactionEntityCREDITDateList= transactions.
  return (
    <div>
      <div>
    <Row>
      <Col md="12">
        <h2>
          AccountEntity [<b>{accountEntityEntity.id}</b>]
        </h2>
        <div className="jh-entity-details">
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
            <td>{accountEntityEntity.id}</td>
            <td>{accountEntityEntity.code}</td>
                  <td>{accountEntityEntity.accountName}</td>
                  <td>{accountEntityEntity.description}</td>
                  <td>{accountEntityEntity.openingBalance}</td>
                  <td>{accountEntityEntity.closingBalance}</td>
                  <td>
                    {accountEntityEntity.createdAt ? <TextFormat type="date" value={accountEntityEntity.createdAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  </tbody>
                  </Table>
          </div>
        <div>
        <Button tag={Link} to="/account-entity" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/account-entity/${accountEntityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
        </div>
        
      </Col>
    </Row>
</div>
<div>
<Row>
   <Col md="6">
   <div className="container">
  <div className="row justify-content-center">
    <h3>Debit</h3>
  </div>
</div>
   <div className="table-responsive">
      {transactions && transactions.length > 0  ? (
  
  
      <Table responsive  bordered size="sm">
         <thead>
            <tr>
               <th>Trans ID</th>
               <th>Trans Ammount</th>
               <th>Trans Date</th>
               <th>Trans Type</th>
               <th>Entry Date</th>
               <th>Description</th>
               
            </tr>
         </thead>
         <tbody>
       
            {transactions.filter(transactionEntity=>transactionEntity.transType==="DEBIT").map((transactionEntity, i) => (
              
            <tr key={`entity-${i}`}>
               <td>
                  {transactionEntity.id}
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
   
      {transactions&& transactions.length > 0  ? (
      <Table responsive  bordered size="sm">
         <thead>
            <tr>
               <th>Trans ID</th>
               <th>Trans Ammount</th>
               <th>Trans Date</th>
               <th>Trans Type</th>
               <th>Entry Date</th>
               <th>Description</th>
              
            </tr>
         </thead>
         <tbody>{transactions.filter(transactionEntity=>transactionEntity.transType==="CREDIT").map((transactionEntity, i) => (
              
              <tr key={`entity-${i}`}>
                 <td>
                    {transactionEntity.id}
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
              </tr>
                    
              ))}</tbody>
         </Table>
      ):(<div></div>)}</div>
</Col>
</Row>
</div>

</div>
   
      
        
    
  );
};

const mapStateToProps = ({ accountEntity }: IRootState) => ({
  accountEntityEntity: accountEntity.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccountEntityDetail);
