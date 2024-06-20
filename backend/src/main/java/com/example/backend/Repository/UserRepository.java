package com.example.backend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.Model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByUserName(String userNmae);
    User findByEmail(String email);
}
