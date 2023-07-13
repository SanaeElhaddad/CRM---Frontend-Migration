package com.bagile.ems.crm.dto;

import java.io.Serializable;
import java.util.Date;

public class TypeAccount extends BaseDTO implements Serializable {

    private static final long serialVersionUID = -4510702131599810407L;
    private long typeAccountId;
    private String typeAccountCode;
    private String typeAccountDescription;
    private User typeAccountUser;
    private Date typeAccountCreationDate;
    private Date typeAccountUpdateDate;

    public long getTypeAccountId() {
        return typeAccountId;
    }

    public void setTypeAccountId(long typeAccountId) {
        this.typeAccountId = typeAccountId;
    }

    public String getTypeAccountCode() {
        return typeAccountCode;
    }

    public void setTypeAccountCode(String typeAccountCode) {
        this.typeAccountCode = typeAccountCode;
    }

    public String getTypeAccountDescription() {
        return typeAccountDescription;
    }

    public void setTypeAccountDescription(String typeAccountDescription) {
        this.typeAccountDescription = typeAccountDescription;
    }

    public User getTypeAccountUser() {
        return typeAccountUser;
    }
    public void setTypeAccountUser(User typeAccountUser) {
        this.typeAccountUser = typeAccountUser;
    }

    public Date getTypeAccountCreationDate() {
        return typeAccountCreationDate;
    }

    public void setTypeAccountCreationDate(Date typeAccountCreationDate) {
        this.typeAccountCreationDate = typeAccountCreationDate;
    }

    public Date getTypeAccountUpdateDate() {
        return typeAccountUpdateDate;
    }

    public void setTypeAccountUpdateDate(Date typeAccountUpdateDate) {
        this.typeAccountUpdateDate = typeAccountUpdateDate;
    }

    @Override
    public boolean equals(Object object) {
        boolean result = false;
        if (object == null || object.getClass() != getClass()) {
            result = false;
        } else {
            TypeAccount obj = (TypeAccount) object;
            if (this.typeAccountId == obj.getTypeAccountId()) {
                result = true;
            }
        }
        return result;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 7 * hash + (int) this.typeAccountId;
        hash = 7 * hash + (int) this.typeAccountId;
        return hash;
    }
}
