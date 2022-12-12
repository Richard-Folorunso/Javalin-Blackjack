package dev.folorunso.models;

public class User {

    int id;
    String username = "";
    int rings;
    int referralCode;
    String referralList;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getRings() {
        return rings;
    }

    public void setRings(int rings) {
        this.rings = rings;
    }

    public int getReferralCode() {
        return referralCode;
    }

    public void setReferralCode(int referralCode) {
        this.referralCode = referralCode;
    }

    public String getReferralList() {
        return referralList;
    }

    public void setReferralList(String referralList) {
        this.referralList = referralList;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", rings=" + rings +
                ", referralCode=" + referralCode +
                ", referralList='" + referralList + '\'' +
                '}';
    }
}
