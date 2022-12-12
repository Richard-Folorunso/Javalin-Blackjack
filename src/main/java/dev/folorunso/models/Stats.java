package dev.folorunso.models;

public class Stats {

    String username;
    int gameID;
    long date;
    boolean won;
    int amount;

    public String getUsername() {
        return username;
    }

    @Override
    public String toString() {
        return "Stats{" +
                "username='" + username + '\'' +
                ", gameID=" + gameID +
                ", date=" + date +
                ", won=" + won +
                ", amount=" + amount +
                '}';
    }
}
