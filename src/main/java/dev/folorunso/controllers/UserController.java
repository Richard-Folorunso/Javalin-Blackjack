package dev.folorunso.controllers;

import com.google.gson.Gson;
import dev.folorunso.models.User;
import dev.folorunso.repo.UserRepo;
import io.javalin.http.Handler;

public class UserController {

    UserRepo ur;
    Gson gson;

    public UserController(UserRepo ur, Gson gson) {
        this.ur = ur;
        this.gson = gson;
    }

    public Handler addUser = (ctx -> {
        ur.addUser(ctx.body());
        ctx.status(200);
    });

    public Handler getUserByUsername = (ctx -> {
        User u = ur.getUserByUsername(ctx.body());
        ctx.result(gson.toJson(u));
        ctx.status(200);
    });

    public Handler changeRings = (ctx -> {
        ur.changeRings(ctx.body());
        ctx.status(200);
    });
}
