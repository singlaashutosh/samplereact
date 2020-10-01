package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SampleReactApp;
import com.mycompany.myapp.domain.TransactionEntity;
import com.mycompany.myapp.repository.TransactionEntityRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.TransType;
/**
 * Integration tests for the {@link TransactionEntityResource} REST controller.
 */
@SpringBootTest(classes = SampleReactApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TransactionEntityResourceIT {

    private static final Double DEFAULT_TRANS_AMMOUNT = 1D;
    private static final Double UPDATED_TRANS_AMMOUNT = 2D;

    private static final LocalDate DEFAULT_TRANS_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TRANS_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final TransType DEFAULT_TRANS_TYPE = TransType.DEBIT;
    private static final TransType UPDATED_TRANS_TYPE = TransType.CREDIT;

    private static final Instant DEFAULT_ENTRY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ENTRY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TransactionEntityRepository transactionEntityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTransactionEntityMockMvc;

    private TransactionEntity transactionEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransactionEntity createEntity(EntityManager em) {
        TransactionEntity transactionEntity = new TransactionEntity()
            .transAmmount(DEFAULT_TRANS_AMMOUNT)
            .transDate(DEFAULT_TRANS_DATE)
            .transType(DEFAULT_TRANS_TYPE)
            .entryDate(DEFAULT_ENTRY_DATE)
            .description(DEFAULT_DESCRIPTION);
        return transactionEntity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransactionEntity createUpdatedEntity(EntityManager em) {
        TransactionEntity transactionEntity = new TransactionEntity()
            .transAmmount(UPDATED_TRANS_AMMOUNT)
            .transDate(UPDATED_TRANS_DATE)
            .transType(UPDATED_TRANS_TYPE)
            .entryDate(UPDATED_ENTRY_DATE)
            .description(UPDATED_DESCRIPTION);
        return transactionEntity;
    }

    @BeforeEach
    public void initTest() {
        transactionEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransactionEntity() throws Exception {
        int databaseSizeBeforeCreate = transactionEntityRepository.findAll().size();
        // Create the TransactionEntity
        restTransactionEntityMockMvc.perform(post("/api/transaction-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transactionEntity)))
            .andExpect(status().isCreated());

        // Validate the TransactionEntity in the database
        List<TransactionEntity> transactionEntityList = transactionEntityRepository.findAll();
        assertThat(transactionEntityList).hasSize(databaseSizeBeforeCreate + 1);
        TransactionEntity testTransactionEntity = transactionEntityList.get(transactionEntityList.size() - 1);
        assertThat(testTransactionEntity.getTransAmmount()).isEqualTo(DEFAULT_TRANS_AMMOUNT);
        assertThat(testTransactionEntity.getTransDate()).isEqualTo(DEFAULT_TRANS_DATE);
        assertThat(testTransactionEntity.getTransType()).isEqualTo(DEFAULT_TRANS_TYPE);
        assertThat(testTransactionEntity.getEntryDate()).isEqualTo(DEFAULT_ENTRY_DATE);
        assertThat(testTransactionEntity.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTransactionEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transactionEntityRepository.findAll().size();

        // Create the TransactionEntity with an existing ID
        transactionEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionEntityMockMvc.perform(post("/api/transaction-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transactionEntity)))
            .andExpect(status().isBadRequest());

        // Validate the TransactionEntity in the database
        List<TransactionEntity> transactionEntityList = transactionEntityRepository.findAll();
        assertThat(transactionEntityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTransAmmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = transactionEntityRepository.findAll().size();
        // set the field null
        transactionEntity.setTransAmmount(null);

        // Create the TransactionEntity, which fails.


        restTransactionEntityMockMvc.perform(post("/api/transaction-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transactionEntity)))
            .andExpect(status().isBadRequest());

        List<TransactionEntity> transactionEntityList = transactionEntityRepository.findAll();
        assertThat(transactionEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = transactionEntityRepository.findAll().size();
        // set the field null
        transactionEntity.setTransDate(null);

        // Create the TransactionEntity, which fails.


        restTransactionEntityMockMvc.perform(post("/api/transaction-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transactionEntity)))
            .andExpect(status().isBadRequest());

        List<TransactionEntity> transactionEntityList = transactionEntityRepository.findAll();
        assertThat(transactionEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = transactionEntityRepository.findAll().size();
        // set the field null
        transactionEntity.setTransType(null);

        // Create the TransactionEntity, which fails.


        restTransactionEntityMockMvc.perform(post("/api/transaction-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transactionEntity)))
            .andExpect(status().isBadRequest());

        List<TransactionEntity> transactionEntityList = transactionEntityRepository.findAll();
        assertThat(transactionEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTransactionEntities() throws Exception {
        // Initialize the database
        transactionEntityRepository.saveAndFlush(transactionEntity);

        // Get all the transactionEntityList
        restTransactionEntityMockMvc.perform(get("/api/transaction-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].transAmmount").value(hasItem(DEFAULT_TRANS_AMMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].transDate").value(hasItem(DEFAULT_TRANS_DATE.toString())))
            .andExpect(jsonPath("$.[*].transType").value(hasItem(DEFAULT_TRANS_TYPE.toString())))
            .andExpect(jsonPath("$.[*].entryDate").value(hasItem(DEFAULT_ENTRY_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getTransactionEntity() throws Exception {
        // Initialize the database
        transactionEntityRepository.saveAndFlush(transactionEntity);

        // Get the transactionEntity
        restTransactionEntityMockMvc.perform(get("/api/transaction-entities/{id}", transactionEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(transactionEntity.getId().intValue()))
            .andExpect(jsonPath("$.transAmmount").value(DEFAULT_TRANS_AMMOUNT.doubleValue()))
            .andExpect(jsonPath("$.transDate").value(DEFAULT_TRANS_DATE.toString()))
            .andExpect(jsonPath("$.transType").value(DEFAULT_TRANS_TYPE.toString()))
            .andExpect(jsonPath("$.entryDate").value(DEFAULT_ENTRY_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingTransactionEntity() throws Exception {
        // Get the transactionEntity
        restTransactionEntityMockMvc.perform(get("/api/transaction-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransactionEntity() throws Exception {
        // Initialize the database
        transactionEntityRepository.saveAndFlush(transactionEntity);

        int databaseSizeBeforeUpdate = transactionEntityRepository.findAll().size();

        // Update the transactionEntity
        TransactionEntity updatedTransactionEntity = transactionEntityRepository.findById(transactionEntity.getId()).get();
        // Disconnect from session so that the updates on updatedTransactionEntity are not directly saved in db
        em.detach(updatedTransactionEntity);
        updatedTransactionEntity
            .transAmmount(UPDATED_TRANS_AMMOUNT)
            .transDate(UPDATED_TRANS_DATE)
            .transType(UPDATED_TRANS_TYPE)
            .entryDate(UPDATED_ENTRY_DATE)
            .description(UPDATED_DESCRIPTION);

        restTransactionEntityMockMvc.perform(put("/api/transaction-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransactionEntity)))
            .andExpect(status().isOk());

        // Validate the TransactionEntity in the database
        List<TransactionEntity> transactionEntityList = transactionEntityRepository.findAll();
        assertThat(transactionEntityList).hasSize(databaseSizeBeforeUpdate);
        TransactionEntity testTransactionEntity = transactionEntityList.get(transactionEntityList.size() - 1);
        assertThat(testTransactionEntity.getTransAmmount()).isEqualTo(UPDATED_TRANS_AMMOUNT);
        assertThat(testTransactionEntity.getTransDate()).isEqualTo(UPDATED_TRANS_DATE);
        assertThat(testTransactionEntity.getTransType()).isEqualTo(UPDATED_TRANS_TYPE);
        assertThat(testTransactionEntity.getEntryDate()).isEqualTo(UPDATED_ENTRY_DATE);
        assertThat(testTransactionEntity.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTransactionEntity() throws Exception {
        int databaseSizeBeforeUpdate = transactionEntityRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransactionEntityMockMvc.perform(put("/api/transaction-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transactionEntity)))
            .andExpect(status().isBadRequest());

        // Validate the TransactionEntity in the database
        List<TransactionEntity> transactionEntityList = transactionEntityRepository.findAll();
        assertThat(transactionEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransactionEntity() throws Exception {
        // Initialize the database
        transactionEntityRepository.saveAndFlush(transactionEntity);

        int databaseSizeBeforeDelete = transactionEntityRepository.findAll().size();

        // Delete the transactionEntity
        restTransactionEntityMockMvc.perform(delete("/api/transaction-entities/{id}", transactionEntity.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TransactionEntity> transactionEntityList = transactionEntityRepository.findAll();
        assertThat(transactionEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
