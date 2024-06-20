package com.example.backend.Service;


import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Model.User;
import com.example.backend.Repository.UserRepository;
import java.util.List;
import java.util.Optional;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User register(User user) {
        return userRepository.save(user);
    }
    public User findByUsername(String name) {
        return userRepository.findByUserName(name);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findById(String Id) {
        return userRepository.findById(Id);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(ObjectId Id) {
        return userRepository.findById(String.valueOf(Id));
    }

    public void saveorUpdate(User students) {
        userRepository.save(students);
    }

    public Iterable<User> listAll() {

        return this.userRepository.findAll();

    }

    public User getStudentByID(String studentid) {
        return userRepository.findById(studentid).get();
    }

    public void deleteStudent(String id) {

        userRepository.deleteById(id);
    }

}
