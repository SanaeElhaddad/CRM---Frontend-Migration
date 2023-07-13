package com.bagile.ems.crm.dto;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by fama on 22/08/2016.
 */
public class TypeFunction extends BaseDTO implements Serializable {

    private static final long serialVersionUID = -7423582703452344078L;
    private long typeFId;
    private String typeFCode;
    private String typeFDescription;
    private Date typeFCreationDate;
    private Date typeFUpdateDate;
    private User typeFUser;

    public long getTypeFId() {
        return typeFId;
    }

    public void setTypeFId(long typeFId) {
        this.typeFId = typeFId;
    }

    public String getTypeFCode() {
        return typeFCode;
    }

    public void setTypeFCode(String typeFCode) {
        this.typeFCode = typeFCode;
    }

    public String getTypeFDescription() {
        return typeFDescription;
    }

    public void setTypeFDescription(String typeFDescription) {
        this.typeFDescription = typeFDescription;
    }

    public Date getTypeFCreationDate() {
        return typeFCreationDate;
    }

    public void setTypeFCreationDate(Date typeFCreationDate) {
        this.typeFCreationDate = typeFCreationDate;
    }

    public Date getTypeFUpdateDate() {
        return typeFUpdateDate;
    }

    public void setTypeFUpdateDate(Date typeFUpdateDate) {
        this.typeFUpdateDate = typeFUpdateDate;
    }

    public User getTypeFUser() {
        return typeFUser;
    }

    public void setTypeFUser(User typeFUser) {
        this.typeFUser = typeFUser;
    }

    @Override
    public boolean equals(Object object) {
        boolean result = false;
        if (object == null || object.getClass() != getClass()) {
            result = false;
        } else {
            TypeFunction obj = (TypeFunction) object;
            if (this.typeFId == obj.getTypeFId()) {
                result = true;
            }
        }
        return result;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 7 * hash + (int) this.typeFId;
        hash = 7 * hash + (int) this.typeFId;
        return hash;
    }

}
