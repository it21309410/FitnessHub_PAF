package com.example.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Objects;
import com.example.backend.Dto.GoogleSignUpDto;
import com.example.backend.Dto.LoginDto;
import com.example.backend.Model.User;
import com.example.backend.Service.UserService;

@RestController
@RequestMapping("api/v1/student")
public class UserController {  // Corrected class name
    @Autowired
    private UserService userServices;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Check if username or email already exists
        if (userServices.findByUsername(user.getUserName()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        if (userServices.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        // Register the user
        User registeredUser = userServices.register(user);

        // Create HATEOAS response with self link
        EntityModel<User> resource = EntityModel.of(registeredUser);
        resource.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(UserController.class).registerUser(user)).withSelfRel());

        // Return the response with created status and HATEOAS links
        return ResponseEntity.status(HttpStatus.CREATED).body(resource);
    }
    @PostMapping("/googleSignUp")
    public ResponseEntity<?> registerUserByGoogle(@RequestBody GoogleSignUpDto gUser) {
        // Check if username or email already exists
        System.out.print(gUser.getEmail());
        User userR = userServices.findByEmail(gUser.getEmail());
        System.out.print(userR);
        if (userServices.findByEmail(gUser.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(userR);
        }
        User newUser = new User();
        newUser.setUserName(gUser.getName());
        newUser.setEmail(gUser.getEmail());
        //newUser.setProfilePicURL(gUser.getProfileImageUrl());
        newUser.setFirstName(gUser.getName());
        newUser.setUserType("User");

        // Register the user
        User registeredUser = userServices.register(newUser);

        // Create HATEOAS response with self link
        EntityModel<User> resource = EntityModel.of(registeredUser);
        resource.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(UserController.class).registerUser(newUser)).withSelfRel());

        // Return the response with created status and HATEOAS links
        return ResponseEntity.status(HttpStatus.CREATED).body(resource);
    }



    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginDto loginDto){
        User user = userServices.findByEmail(loginDto.getEmail());

        if(user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        else{
            if(Objects.equals(loginDto.getPassword(), user.getPassword())){
                EntityModel<User> resource = EntityModel.of(user);
                resource.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(UserController.class).getUserByEmail(loginDto.getEmail())).withSelfRel());

                // Return response with HATEOAS links
                return ResponseEntity.ok(resource);
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password Incorrect");
            }

        }
    }


    @GetMapping("/getUserByEmail/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        User user = userServices.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Add self link
        EntityModel<User> resource = EntityModel.of(user);
        resource.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(UserController.class).getUserByEmail(email)).withSelfRel());

        // Return response with HATEOAS links
        return ResponseEntity.ok(resource);
    }





    @PostMapping(value = "/save")
    private String saveStudent(@RequestBody User students) {
        userServices.saveorUpdate(students);
        return students.get_id();
    }

    @GetMapping(value = "/getall")
    private Iterable<User> getStudents() {
        return userServices.listAll();
    }

    @RequestMapping("/search/{id}")
    private User getStudents(@PathVariable(name = "id") String studentid) {
        return userServices.getStudentByID(studentid);
    }

    @PutMapping(value = "/edit/{id}")
    private User update(@RequestBody User student, @PathVariable(name = "id") String _id) {
        student.set_id(_id);
        userServices.saveorUpdate(student);
        return student;
    }

    @DeleteMapping("/delete/{id}")
    private void deleteStudent(@PathVariable("id") String _id) {
        userServices.deleteStudent(_id);
    }
}
