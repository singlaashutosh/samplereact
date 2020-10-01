package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

import com.mycompany.myapp.domain.enumeration.TransType;

/**
 * A TransactionEntity.
 */
@Entity
@Table(name = "transaction_entity")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TransactionEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "trans_ammount", nullable = false)
    private Double transAmmount;

    @NotNull
    @Column(name = "trans_date", nullable = false)
    private LocalDate transDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "trans_type", nullable = false)
    private TransType transType;

    @Column(name = "entry_date")
    private Instant entryDate;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties(value = "transactionEntities", allowSetters = true)
    private AccountEntity accountEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTransAmmount() {
        return transAmmount;
    }

    public TransactionEntity transAmmount(Double transAmmount) {
        this.transAmmount = transAmmount;
        return this;
    }

    public void setTransAmmount(Double transAmmount) {
        this.transAmmount = transAmmount;
    }

    public LocalDate getTransDate() {
        return transDate;
    }

    public TransactionEntity transDate(LocalDate transDate) {
        this.transDate = transDate;
        return this;
    }

    public void setTransDate(LocalDate transDate) {
        this.transDate = transDate;
    }

    public TransType getTransType() {
        return transType;
    }

    public TransactionEntity transType(TransType transType) {
        this.transType = transType;
        return this;
    }

    public void setTransType(TransType transType) {
        this.transType = transType;
    }

    public Instant getEntryDate() {
        return entryDate;
    }

    public TransactionEntity entryDate(Instant entryDate) {
        this.entryDate = entryDate;
        return this;
    }

    public void setEntryDate(Instant entryDate) {
        this.entryDate = entryDate;
    }

    public String getDescription() {
        return description;
    }

    public TransactionEntity description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AccountEntity getAccountEntity() {
        return accountEntity;
    }

    public TransactionEntity accountEntity(AccountEntity accountEntity) {
        this.accountEntity = accountEntity;
        return this;
    }

    public void setAccountEntity(AccountEntity accountEntity) {
        this.accountEntity = accountEntity;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TransactionEntity)) {
            return false;
        }
        return id != null && id.equals(((TransactionEntity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TransactionEntity{" +
            "id=" + getId() +
            ", transAmmount=" + getTransAmmount() +
            ", transDate='" + getTransDate() + "'" +
            ", transType='" + getTransType() + "'" +
            ", entryDate='" + getEntryDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
