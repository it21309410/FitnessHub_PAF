package com.example.backend.Controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.Model.MealPlan;
import com.example.backend.Model.Posts;
import com.example.backend.Service.Postservice;

@RestController
@RequestMapping("/api/v1/post")

public class PostController {

    @Autowired
    private Postservice postservice;

    /*@PostMapping(value = "/save")
    private String savePost(@RequestBody Posts post)
    {
        postservice.saveorUpdate(post);
        return post.get_id();

    }*/
   @PostMapping
    public ResponseEntity<?>savePost (@RequestBody Posts post) {

        // Create the MealPlan
        Posts savedPost = postservice.saveorUpdate(post);
        

        // Create HATEOAS response with self link
        EntityModel<Posts> resource = EntityModel.of(savedPost);
        resource.add(WebMvcLinkBuilder
                .linkTo(WebMvcLinkBuilder.methodOn(PostController.class).savePost(post)).withSelfRel());

        // Return the response with created status and HATEOAS links
        return ResponseEntity.status(HttpStatus.CREATED).body(resource);
   
    }

    
    @GetMapping("/getAll")
    public ResponseEntity<?> getPost()
    {
        List<Posts> postList = postservice.listAll();
        System.out.println(postList);
        return ResponseEntity.ok(postList);

    }
/*
    @PutMapping(value = "/edit/{id}")
    private Posts update(@RequestBody Posts posts,@PathVariable(name="id")String _id)
    {
        //posts.set_id(_id);
        postservice.saveorUpdate(posts);
        return posts;

    }*/

    @PutMapping(value = "/edit/{id}")
    private Posts updatePost(@RequestBody Posts posts, @PathVariable(name="id") String _id) {
        posts.setId(_id); // Set the _id from the path variable into the Posts object
        postservice.saveorUpdate(posts); // Save or update the post using the service method
        return posts; // Return the updated post
    }
    @PostMapping("/comment/{postId}")
    public ResponseEntity<?> addCommentToPost(@PathVariable(name="postId") String postId, @RequestBody String comment) {
        try {
            // Fetch the post by postId
            Optional<Posts> optionalPost = postservice.findById(postId);
            if (optionalPost.isPresent()) {
                Posts post = optionalPost.get();
                // Add the comment to the post's comments list
                post.getComments().add(comment);
                // Save the updated post
                postservice.saveorUpdate(post);
                return ResponseEntity.ok("Comment added successfully");
            } else {
                return ResponseEntity.notFound().build(); // Post not found
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding comment");
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable(name="id") String _id) {
    postservice.deletePost(_id); // Delete the post using the service method
    return ResponseEntity.ok("Post deleted successfully"); // Return a success message
}
@GetMapping("/get/{userId}")
    public ResponseEntity<?> getPostByUserId(@PathVariable(name = "userId") String userId) {
        List<Posts> userPosts = postservice.getPostByUserId(userId);
        if (userPosts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No posts found for the user");
        }

        CollectionModel<Posts> resource = CollectionModel.of(userPosts);

        for (Posts usePosts : userPosts) {
            Link selfLink = WebMvcLinkBuilder
                    .linkTo(WebMvcLinkBuilder.methodOn(PostController.class).getPostByUserId(userId))
                    .withSelfRel();
            resource.add(selfLink.withRel("usePosts-" + usePosts.getId()));
        }

        // Return response with HATEOAS links
        return ResponseEntity.ok(resource);
    }
    
}