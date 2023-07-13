package com.bagile.ems.crm.dto;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by ffamm on 25/08/2017.
 */
public class StatusTicket extends BaseDTO implements Serializable {

    private static final long serialVersionUID = 5895011746550714947L;
    private long statusTId;
    private String statusTCode;
    private String statusTDescription;
    private Date statusTCreationDate;
    private Date statusTUpdateDate;
    private User statusTUser;

    public long getStatusTId() {
        return statusTId;
    }

    public void setStatusTId(long statusTId) {
        this.statusTId = statusTId;
    }

    public String getStatusTCode() {
        return statusTCode;
    }

    public void setStatusTCode(String statusTCode) {
        this.statusTCode = statusTCode;
    }

    public String getStatusTDescription() {
        return statusTDescription;
    }

    public void setStatusTDescription(String statusTDescription) {
        this.statusTDescription = statusTDescription;
    }

    public Date getStatusTCreationDate() {
        return statusTCreationDate;
    }

    public void setStatusTCreationDate(Date statusTCreationDate) {
        this.statusTCreationDate = statusTCreationDate;
    }

    public Date getStatusTUpdateDate() {
        return statusTUpdateDate;
    }

    public void setStatusTUpdateDate(Date statusTUpdateDate) {
        this.statusTUpdateDate = statusTUpdateDate;
    }


    public User getStatusTUser() {
        return statusTUser;
    }

    public void setStatusTUser(User statusTUser) {
        this.statusTUser = statusTUser;
    }

    @Override
    public boolean equals(Object object) {
        boolean result = false;
        if (object == null || object.getClass() != getClass()) {
            result = false;
        } else {
            StatusTicket obj = (StatusTicket) object;
            if (this.statusTId == obj.getStatusTId()) {
                result = true;
            }
        }
        return result;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 7 * hash + (int) this.statusTId;
        hash = 7 * hash + (int) this.statusTId;
        return hash;
    }
}
