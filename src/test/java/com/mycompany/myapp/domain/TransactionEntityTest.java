package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class TransactionEntityTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionEntity.class);
        TransactionEntity transactionEntity1 = new TransactionEntity();
        transactionEntity1.setId(1L);
        TransactionEntity transactionEntity2 = new TransactionEntity();
        transactionEntity2.setId(transactionEntity1.getId());
        assertThat(transactionEntity1).isEqualTo(transactionEntity2);
        transactionEntity2.setId(2L);
        assertThat(transactionEntity1).isNotEqualTo(transactionEntity2);
        transactionEntity1.setId(null);
        assertThat(transactionEntity1).isNotEqualTo(transactionEntity2);
    }
}
