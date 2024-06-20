package com.example.backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.Model.Posts;

@Repository
public interface Postrepo extends MongoRepository<Posts,String> {
    Optional<Posts> findById(String id);
    List<Posts> findByUserId(String userId);
}

