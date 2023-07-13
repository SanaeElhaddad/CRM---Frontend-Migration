package com.bagile.ems.crm.dto;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by fama on 22/08/2016.
 */
public class TypeService extends BaseDTO implements Serializable {

    private static final long serialVersionUID = -5240220383063230018L;
    private long typeSId;
    private String typeSCode;
    private String typeSDescription;
    private Date typeSCreationDate;
    private Date typeSUpdateDate;
    private User typeSUser;

    public long getTypeSId() {
        return typeSId;
    }
    public void setTypeSId(long typeSId) {
        this.typeSId = typeSId;
    }

    public String getTypeSCode() {
        return typeSCode;
    }
    public void setTypeSCode(String typeSCode) {
        this.typeSCode = typeSCode;
    }


    public String getTypeSDescription() {
        return typeSDescription;
    }
    public void setTypeSDescription(String typeSDescription) {
        this.typeSDescription = typeSDescription;
    }

    public Date getTypeSCreationDate() {
        return typeSCreationDate;
    }

    public void setTypeSCreationDate(Date typeSCreationDate) {
        this.typeSCreationDate = typeSCreationDate;
    }

    public Date getTypeSUpdateDate() {
        return typeSUpdateDate;
    }

    public void setTypeSUpdateDate(Date typeSUpdateDate) {
        this.typeSUpdateDate = typeSUpdateDate;
    }

    public User getTypeSUser() {
        return typeSUser;
    }

    public void setTypeSUser(User typeSUser) {
        this.typeSUser = typeSUser;
    }

    @Override
    public boolean equals(Object object) {
        boolean result = false;
        if (object == null || object.getClass() != getClass()) {
            result = false;
        } else {
            TypeService obj = (TypeService) object;
            if (this.typeSId == obj.getTypeSId()) {
                result = true;
            }
        }
        return result;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 7 * hash + (int) this.typeSId;
        hash = 7 * hash + (int) this.typeSId;
        return hash;
    }
}
