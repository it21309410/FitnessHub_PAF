package com.example.backend.Service;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Model.MealPlan;
import com.example.backend.Model.Posts;
import com.example.backend.Repository.Postrepo;

@Service
public class Postservice {

    @Autowired
    private Postrepo reop;

    public List<Posts> getPostByUserId(String userId) {
        return reop.findByUserId(userId);
    }

    public Posts saveorUpdate(Posts posts) {

        return reop.save(posts);
    }

    public List<Posts> listAll() {
        return reop.findAll();
    }

    public void deletePost(String id) {
        reop.deleteById(id);
    }
    public Optional<Posts> findById(String id) {
        return reop.findById(id);
    }
}
