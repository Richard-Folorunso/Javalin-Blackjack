package dev.folorunso.repo;

import dev.folorunso.models.Stats;

import java.util.ArrayList;
import java.util.List;

public class StatsRepo {

    List<Stats> statsList = new ArrayList<>();

    public void addStats(Stats stats) {
        statsList.add(stats);
    }

    public List<Stats> getStatsByUsername(String username) {
        List<Stats> stats = new ArrayList<>();
        for (Stats stats1 : statsList) {
            if (username.equalsIgnoreCase(stats1.getUsername())) {
                stats.add(stats1);
            }
        }
        return stats;
    }
}
