package com.bagile.ems.crm.dto;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by ffamm on 23/08/2017.
 */
public class TypeProblem extends BaseDTO implements Serializable {

    private static final long serialVersionUID = -6045629652379068609L;
    private long typePId;
    private String typePCode;
    private String typePDescription;
    private Date typePCreationDate;
    private Date typePUpdateDate;
    private User typePUser;
    private TypeService typePService;

    public long getTypePId() {
        return typePId;
    }

    public void setTypePId(long typePId) {
        this.typePId = typePId;
    }

    public String getTypePCode() {
        return typePCode;
    }

    public void setTypePCode(String typePCode) {
        this.typePCode = typePCode;
    }

    public String getTypePDescription() {
        return typePDescription;
    }

    public void setTypePDescription(String typePDescription) {
        this.typePDescription = typePDescription;
    }

    public Date getTypePCreationDate() {
        return typePCreationDate;
    }

    public void setTypePCreationDate(Date typePCreationDate) {
        this.typePCreationDate = typePCreationDate;
    }

    public Date getTypePUpdateDate() {
        return typePUpdateDate;
    }

    public void setTypePUpdateDate(Date typePUpdateDate) {
        this.typePUpdateDate = typePUpdateDate;
    }

    public User getTypePUser() {
        return typePUser;
    }

    public void setTypePUser(User typePUser) {
        this.typePUser = typePUser;
    }

    public TypeService getTypePService() {
        return typePService;
    }

    public void setTypePService(TypeService typePService) {
        this.typePService = typePService;
    }

    @Override
    public boolean equals(Object object) {
        boolean result = false;
        if (object == null || object.getClass() != getClass()) {
            result = false;
        } else {
            TypeProblem obj = (TypeProblem) object;
            if (this.typePId == obj.getTypePId()) {
                result = true;
            }
        }
        return result;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 7 * hash + (int) this.typePId;
        hash = 7 * hash + (int) this.typePId;
        return hash;
    }
}
