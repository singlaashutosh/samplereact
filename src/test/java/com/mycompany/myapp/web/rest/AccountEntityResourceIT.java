package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SampleReactApp;
import com.mycompany.myapp.domain.AccountEntity;
import com.mycompany.myapp.repository.AccountEntityRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AccountEntityResource} REST controller.
 */
@SpringBootTest(classes = SampleReactApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AccountEntityResourceIT {

    private static final Integer DEFAULT_CODE = 1;
    private static final Integer UPDATED_CODE = 2;

    private static final String DEFAULT_ACCOUNT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_OPENING_BALANCE = 1D;
    private static final Double UPDATED_OPENING_BALANCE = 2D;

    private static final Double DEFAULT_CLOSING_BALANCE = 1D;
    private static final Double UPDATED_CLOSING_BALANCE = 2D;

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AccountEntityRepository accountEntityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccountEntityMockMvc;

    private AccountEntity accountEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountEntity createEntity(EntityManager em) {
        AccountEntity accountEntity = new AccountEntity()
            .code(DEFAULT_CODE)
            .accountName(DEFAULT_ACCOUNT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .openingBalance(DEFAULT_OPENING_BALANCE)
            .closingBalance(DEFAULT_CLOSING_BALANCE)
            .createdAt(DEFAULT_CREATED_AT);
        return accountEntity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountEntity createUpdatedEntity(EntityManager em) {
        AccountEntity accountEntity = new AccountEntity()
            .code(UPDATED_CODE)
            .accountName(UPDATED_ACCOUNT_NAME)
            .description(UPDATED_DESCRIPTION)
            .openingBalance(UPDATED_OPENING_BALANCE)
            .closingBalance(UPDATED_CLOSING_BALANCE)
            .createdAt(UPDATED_CREATED_AT);
        return accountEntity;
    }

    @BeforeEach
    public void initTest() {
        accountEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccountEntity() throws Exception {
        int databaseSizeBeforeCreate = accountEntityRepository.findAll().size();
        // Create the AccountEntity
        restAccountEntityMockMvc.perform(post("/api/account-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountEntity)))
            .andExpect(status().isCreated());

        // Validate the AccountEntity in the database
        List<AccountEntity> accountEntityList = accountEntityRepository.findAll();
        assertThat(accountEntityList).hasSize(databaseSizeBeforeCreate + 1);
        AccountEntity testAccountEntity = accountEntityList.get(accountEntityList.size() - 1);
        assertThat(testAccountEntity.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testAccountEntity.getAccountName()).isEqualTo(DEFAULT_ACCOUNT_NAME);
        assertThat(testAccountEntity.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAccountEntity.getOpeningBalance()).isEqualTo(DEFAULT_OPENING_BALANCE);
        assertThat(testAccountEntity.getClosingBalance()).isEqualTo(DEFAULT_CLOSING_BALANCE);
        assertThat(testAccountEntity.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
    }

    @Test
    @Transactional
    public void createAccountEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountEntityRepository.findAll().size();

        // Create the AccountEntity with an existing ID
        accountEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountEntityMockMvc.perform(post("/api/account-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountEntity)))
            .andExpect(status().isBadRequest());

        // Validate the AccountEntity in the database
        List<AccountEntity> accountEntityList = accountEntityRepository.findAll();
        assertThat(accountEntityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAccountNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = accountEntityRepository.findAll().size();
        // set the field null
        accountEntity.setAccountName(null);

        // Create the AccountEntity, which fails.


        restAccountEntityMockMvc.perform(post("/api/account-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountEntity)))
            .andExpect(status().isBadRequest());

        List<AccountEntity> accountEntityList = accountEntityRepository.findAll();
        assertThat(accountEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = accountEntityRepository.findAll().size();
        // set the field null
        accountEntity.setDescription(null);

        // Create the AccountEntity, which fails.


        restAccountEntityMockMvc.perform(post("/api/account-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountEntity)))
            .andExpect(status().isBadRequest());

        List<AccountEntity> accountEntityList = accountEntityRepository.findAll();
        assertThat(accountEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOpeningBalanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = accountEntityRepository.findAll().size();
        // set the field null
        accountEntity.setOpeningBalance(null);

        // Create the AccountEntity, which fails.


        restAccountEntityMockMvc.perform(post("/api/account-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountEntity)))
            .andExpect(status().isBadRequest());

        List<AccountEntity> accountEntityList = accountEntityRepository.findAll();
        assertThat(accountEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAccountEntities() throws Exception {
        // Initialize the database
        accountEntityRepository.saveAndFlush(accountEntity);

        // Get all the accountEntityList
        restAccountEntityMockMvc.perform(get("/api/account-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].accountName").value(hasItem(DEFAULT_ACCOUNT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].openingBalance").value(hasItem(DEFAULT_OPENING_BALANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].closingBalance").value(hasItem(DEFAULT_CLOSING_BALANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getAccountEntity() throws Exception {
        // Initialize the database
        accountEntityRepository.saveAndFlush(accountEntity);

        // Get the accountEntity
        restAccountEntityMockMvc.perform(get("/api/account-entities/{id}", accountEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accountEntity.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.accountName").value(DEFAULT_ACCOUNT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.openingBalance").value(DEFAULT_OPENING_BALANCE.doubleValue()))
            .andExpect(jsonPath("$.closingBalance").value(DEFAULT_CLOSING_BALANCE.doubleValue()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAccountEntity() throws Exception {
        // Get the accountEntity
        restAccountEntityMockMvc.perform(get("/api/account-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccountEntity() throws Exception {
        // Initialize the database
        accountEntityRepository.saveAndFlush(accountEntity);

        int databaseSizeBeforeUpdate = accountEntityRepository.findAll().size();

        // Update the accountEntity
        AccountEntity updatedAccountEntity = accountEntityRepository.findById(accountEntity.getId()).get();
        // Disconnect from session so that the updates on updatedAccountEntity are not directly saved in db
        em.detach(updatedAccountEntity);
        updatedAccountEntity
            .code(UPDATED_CODE)
            .accountName(UPDATED_ACCOUNT_NAME)
            .description(UPDATED_DESCRIPTION)
            .openingBalance(UPDATED_OPENING_BALANCE)
            .closingBalance(UPDATED_CLOSING_BALANCE)
            .createdAt(UPDATED_CREATED_AT);

        restAccountEntityMockMvc.perform(put("/api/account-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccountEntity)))
            .andExpect(status().isOk());

        // Validate the AccountEntity in the database
        List<AccountEntity> accountEntityList = accountEntityRepository.findAll();
        assertThat(accountEntityList).hasSize(databaseSizeBeforeUpdate);
        AccountEntity testAccountEntity = accountEntityList.get(accountEntityList.size() - 1);
        assertThat(testAccountEntity.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testAccountEntity.getAccountName()).isEqualTo(UPDATED_ACCOUNT_NAME);
        assertThat(testAccountEntity.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAccountEntity.getOpeningBalance()).isEqualTo(UPDATED_OPENING_BALANCE);
        assertThat(testAccountEntity.getClosingBalance()).isEqualTo(UPDATED_CLOSING_BALANCE);
        assertThat(testAccountEntity.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingAccountEntity() throws Exception {
        int databaseSizeBeforeUpdate = accountEntityRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountEntityMockMvc.perform(put("/api/account-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountEntity)))
            .andExpect(status().isBadRequest());

        // Validate the AccountEntity in the database
        List<AccountEntity> accountEntityList = accountEntityRepository.findAll();
        assertThat(accountEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAccountEntity() throws Exception {
        // Initialize the database
        accountEntityRepository.saveAndFlush(accountEntity);

        int databaseSizeBeforeDelete = accountEntityRepository.findAll().size();

        // Delete the accountEntity
        restAccountEntityMockMvc.perform(delete("/api/account-entities/{id}", accountEntity.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AccountEntity> accountEntityList = accountEntityRepository.findAll();
        assertThat(accountEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
