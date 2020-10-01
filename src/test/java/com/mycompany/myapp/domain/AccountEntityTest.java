package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class AccountEntityTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountEntity.class);
        AccountEntity accountEntity1 = new AccountEntity();
        accountEntity1.setId(1L);
        AccountEntity accountEntity2 = new AccountEntity();
        accountEntity2.setId(accountEntity1.getId());
        assertThat(accountEntity1).isEqualTo(accountEntity2);
        accountEntity2.setId(2L);
        assertThat(accountEntity1).isNotEqualTo(accountEntity2);
        accountEntity1.setId(null);
        assertThat(accountEntity1).isNotEqualTo(accountEntity2);
    }
}
