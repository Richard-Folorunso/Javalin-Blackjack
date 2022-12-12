package dev.folorunso.repo;

import dev.folorunso.models.User;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class UserRepo {

    List<User> userList = new ArrayList<>();

    public void addUser(String login) {
        String[] loginData = login.split(",");
        String username = (loginData.length > 0 ? loginData[0] : "Empty");
        int referralCode = (loginData.length > 1 ? Integer.parseInt(loginData[1]) : 0);
        int validReferralID = -1;

        for (User user : userList) {
            if (username.equalsIgnoreCase(user.getUsername())) {
                return;
            }
            if (referralCode == user.getReferralCode()) {
                validReferralID = user.getId();
            }
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setId(userList.size());
        newUser.setReferralCode(Math.abs(ThreadLocalRandom.current().nextInt()));
        userList.add(newUser);

        if (validReferralID != -1) {
            userList.get(validReferralID).setRings(userList.get(validReferralID).getRings() + 500);
            userList.get(validReferralID).setReferralList(userList.get(validReferralID).getReferralList() + "," + username);
        }
    }

    public User getUserByUsername(String username) {
        for (User user : userList) {
            if (username.equalsIgnoreCase(user.getUsername())) {
                return user;
            }
        }
        return null;
    }

    public void changeRings(String data) {
        String[] changeRingsData = data.split(",");
        String username = (changeRingsData.length > 0 ? changeRingsData[0] : "Empty");
        int amount = (changeRingsData.length > 1 ? Integer.parseInt(changeRingsData[1]) : 0);
        int userID = getUserByUsername(username).getId();
        userList.get(userID).setRings(userList.get(userID).getRings() + amount);
    }
}
