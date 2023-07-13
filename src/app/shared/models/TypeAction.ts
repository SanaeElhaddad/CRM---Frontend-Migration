package com.bagile.ems.crm.dto;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by SOUKA on 03/08/2016.
 */
public class TypeAction extends BaseDTO implements Serializable {

    private static final long serialVersionUID = 6885445744512961770L;
    private long typeAId;
    private String typeACode;
    private int typeADuration;
    private String typeADescription;
    private Date typeACreationDate;
    private Date typeAUpdateDate;
    private User typeAUsrUser;

    public long getTypeAId() {
        return typeAId;
    }

    public void setTypeAId(long typeAId) {
        this.typeAId = typeAId;
    }

    public String getTypeACode() {
        return typeACode;
    }

    public void setTypeACode(String tpeACode) {
        this.typeACode = tpeACode;
    }


    public int getTypeADuration() {
        return typeADuration;
    }

    public void setTypeADuration(int typeADuration) {
        this.typeADuration = typeADuration;
    }

    public String getTypeADescription() {
        return typeADescription;
    }

    public void setTypeADescription(String typeADescription) {
        this.typeADescription = typeADescription;
    }

    public Date getTypeACreationDate() {
        return typeACreationDate;
    }

    public void setTypeACreationDate(Date typeACreationDate) {
        this.typeACreationDate = typeACreationDate;
    }

    public Date getTypeAUpdateDate() {
        return typeAUpdateDate;
    }

    public void setTypeAUpdateDate(Date typeAUpdateDate) {
        this.typeAUpdateDate = typeAUpdateDate;
    }

    public User getTypeAUsrUser() {
        return typeAUsrUser;
    }

    public void setTypeAUsrUser(User typeAUsrUser) {
        this.typeAUsrUser = typeAUsrUser;
    }

    @Override
    public boolean equals(Object object) {
        boolean result = false;
        if (object == null || object.getClass() != getClass()) {
            result = false;
        } else {
            TypeAction obj = (TypeAction) object;
            if (this.typeAId == obj.getTypeAId()) {
                result = true;
            }
        }
        return result;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 7 * hash + (int) this.typeAId;
        hash = 7 * hash + (int) this.typeAId;
        return hash;
    }
}
