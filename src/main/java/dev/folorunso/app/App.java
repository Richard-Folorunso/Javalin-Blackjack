package dev.folorunso.app;

import com.google.gson.Gson;
import dev.folorunso.controllers.StatsController;
import dev.folorunso.controllers.UserController;
import dev.folorunso.repo.StatsRepo;
import dev.folorunso.repo.UserRepo;
import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;

public class App {

    public static void main(String[] args) {

        Javalin app = Javalin.create(
                config -> {
                    config.addStaticFiles("./html", Location.EXTERNAL);
                    config.enableCorsForAllOrigins();
                }
        );
        app.start();
        establishRoutes(app);
    }

    private static void establishRoutes(Javalin app) {
        Gson gson = new Gson();
        UserRepo ur = new UserRepo();
        UserController uc = new UserController(ur, gson);
        StatsRepo sr = new StatsRepo();
        StatsController sc = new StatsController(sr, gson);

        app.post("/login", uc.addUser);
        app.post("/get-user", uc.getUserByUsername);
        app.post("/deposit", uc.changeRings);
        app.post("/stats", sc.addStats);
        app.post("/stats-username", sc.getStatsByUsername);
    }
}
