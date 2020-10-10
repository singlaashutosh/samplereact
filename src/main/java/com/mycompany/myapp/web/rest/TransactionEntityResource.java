package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.AccountEntity;
import com.mycompany.myapp.domain.TransactionEntity;
import com.mycompany.myapp.repository.TransactionEntityRepository;
import com.mycompany.myapp.repository.AccountEntityRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.micrometer.core.annotation.Timed;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.TransactionEntity}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TransactionEntityResource {

    private final Logger log = LoggerFactory.getLogger(TransactionEntityResource.class);

    private static final String ENTITY_NAME = "transactionEntity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransactionEntityRepository transactionEntityRepository;

    private final AccountEntityRepository accountEntityRepository;

    public TransactionEntityResource(TransactionEntityRepository transactionEntityRepository,AccountEntityRepository accountEntityRepository) {
        this.transactionEntityRepository = transactionEntityRepository;
        this.accountEntityRepository = accountEntityRepository;
    }

    /**
     * {@code POST  /transaction-entities} : Create a new transactionEntity.
     *
     * @param transactionEntity the transactionEntity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transactionEntity, or with status {@code 400 (Bad Request)} if the transactionEntity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transaction-entities")
    public ResponseEntity<TransactionEntity> createTransactionEntity(@Valid @RequestBody TransactionEntity transactionEntity) throws URISyntaxException {
        log.debug("REST request to save TransactionEntity : {}", transactionEntity);
        if (transactionEntity.getId() != null) {
            throw new BadRequestAlertException("A new transactionEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransactionEntity result = transactionEntityRepository.save(transactionEntity);
        return ResponseEntity.created(new URI("/api/transaction-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /transaction-entities} : Updates an existing transactionEntity.
     *
     * @param transactionEntity the transactionEntity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transactionEntity,
     * or with status {@code 400 (Bad Request)} if the transactionEntity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transactionEntity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transaction-entities")
    public ResponseEntity<TransactionEntity> updateTransactionEntity(@Valid @RequestBody TransactionEntity transactionEntity) throws URISyntaxException {
        log.debug("REST request to update TransactionEntity : {}", transactionEntity);
        if (transactionEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransactionEntity result = transactionEntityRepository.save(transactionEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, transactionEntity.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /transaction-entities} : get all the transactionEntities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transactionEntities in body.
     */
    @GetMapping("/transaction-entities")
    public List<TransactionEntity> getAllTransactionEntities() {
        log.debug("REST request to get all TransactionEntities");
        return transactionEntityRepository.findAll();
    }

    /**
     * {@code GET  /transaction-entities/:id} : get the "id" transactionEntity.
     *
     * @param id the id of the transactionEntity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transactionEntity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transaction-entities/{id}")
    public ResponseEntity<TransactionEntity> getTransactionEntity(@PathVariable Long id) {
        log.debug("REST request to get TransactionEntity : {}", id);
        Optional<TransactionEntity> transactionEntity = transactionEntityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transactionEntity);
    }

    /**
     * {@code DELETE  /transaction-entities/:id} : delete the "id" transactionEntity.
     *
     * @param id the id of the transactionEntity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transaction-entities/{id}")
    public ResponseEntity<Void> deleteTransactionEntity(@PathVariable Long id) {
        log.debug("REST request to delete TransactionEntity : {}", id);
        transactionEntityRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
    @GetMapping("/transaction-entities/account-entities/{id}")
    @Timed
    public Set<TransactionEntity> findAllTransactionsforAccountEntityCode(@PathVariable Long id) {
    log.debug("REST request to get all TransactionEntity for AccountEntity : {}", id);
    
    Optional<AccountEntity> accountEntity = accountEntityRepository.findById(id);

    Set<TransactionEntity> actions= transactionEntityRepository.findByAccountEntityCode(accountEntity.get().getCode());
    return actions;
    }
    @GetMapping("/transaction-entities/Date/{transDate}")
    @Timed
    public Set<TransactionEntity> findAllTransactionsbyDate(@PathVariable LocalDate transDate ) {
    log.debug("REST request to get all TransactionEntity for transDate : {}",transDate);
     
    Set<TransactionEntity> actions= transactionEntityRepository.findBytransDate(transDate);
    return actions;
    }
}
