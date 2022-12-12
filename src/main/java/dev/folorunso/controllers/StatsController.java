package dev.folorunso.controllers;

import com.google.gson.Gson;
import dev.folorunso.models.Stats;
import dev.folorunso.repo.StatsRepo;
import io.javalin.http.Handler;

public class StatsController {

    StatsRepo sr;
    Gson gson;

    public StatsController(StatsRepo sr, Gson gson) {
        this.sr = sr;
        this.gson = gson;
    }

    public Handler addStats = (ctx -> {
        Stats s = gson.fromJson(ctx.body(), Stats.class);
        sr.addStats(s);
        ctx.status(200);
    });

    public Handler getStatsByUsername = (ctx -> {
        ctx.result(gson.toJson(sr.getStatsByUsername(ctx.body())));
        ctx.status(200);
    });
}
