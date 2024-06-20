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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.backend.Model.Comment;
import com.example.backend.Model.Likes;


import com.example.backend.Model.WorkoutPlan;
import com.example.backend.Service.WorkoutPlanService;

@RestController
@RequestMapping("/api/v1/workplans")

public class WorkoutPlanController {
    @Autowired
    private WorkoutPlanService workoutPlanService;

    @SuppressWarnings("rawtypes")
    @PostMapping
    public ResponseEntity createWorkoutPlan (@RequestBody WorkoutPlan workoutplan) {
        
        WorkoutPlan createdWorkoutPlan = workoutPlanService.createWorkoutPlan(workoutplan) ;

        EntityModel<WorkoutPlan> resource = EntityModel.of(createdWorkoutPlan);
        resource.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(WorkoutPlanController.class).createWorkoutPlan(workoutplan)).withSelfRel());

        return ResponseEntity.status(HttpStatus.CREATED).body(resource);

        
        
    }

    @GetMapping("/{userId}")
    
    public ResponseEntity<?> getWorkoutPlansByUserId(@PathVariable("userId") String userId) 
    { List<WorkoutPlan> workoutPlans = workoutPlanService.getWorkoutPlansByUserId(userId);

        // If no workout plans found, return 404 NOT FOUND
        
        if (workoutPlans.isEmpty()) {
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found for the userplan");
        
        }

                    // Create a collection model

            CollectionModel<WorkoutPlan> resource= CollectionModel.of(workoutPlans);

            // Add self link for each workout plan

            for (WorkoutPlan workoutPlan : workoutPlans) {

            Link selfLink= WebMvcLinkBuilder.linkTo (WebMvcLinkBuilder.methodOn (WorkoutPlanController.class).getWorkoutPlansByUserId(userId)).withSelfRel();

            resource.add(selfLink.withRel( "workoutPlan-" + workoutPlan.getId()));

            }

            // Return response with HATEOAS links

            return ResponseEntity.ok(resource);

            }


        @GetMapping("/allworkout")
        public ResponseEntity<List<WorkoutPlan>> getAllworkoutplan(){
            return new ResponseEntity<List<WorkoutPlan>>(workoutPlanService.getAllWorkoutPlans(), HttpStatus.OK);
        }

        
        @PutMapping("/{workoutPlanId}")
        public ResponseEntity<EntityModel<WorkoutPlan>> updateWorkoutPlan(
                @PathVariable("workoutPlanId") String workoutPlanId,
                @RequestBody WorkoutPlan updatedWorkoutPlan) {
    
            updatedWorkoutPlan.setId(workoutPlanId);
            WorkoutPlan updatedPlan = workoutPlanService.updateWorkoutPlan(updatedWorkoutPlan);
    
            EntityModel<WorkoutPlan> resource = EntityModel.of(updatedPlan);
            resource.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(WorkoutPlanController.class).updateWorkoutPlan(workoutPlanId, updatedWorkoutPlan)).withSelfRel());
    
            return ResponseEntity.ok(resource);
        }

        @DeleteMapping("/{workoutPlanId}")
        public ResponseEntity<?> deleteWorkoutPlanById(@PathVariable("workoutPlanId") String workoutPlanId) {
            // Check if the workout plan exists
            if (!workoutPlanService.existsById(workoutPlanId)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workout Plan not found");
            }

            // Delete the workout plan
            workoutPlanService.deleteWorkoutPlanById(workoutPlanId);
            
            return ResponseEntity.status(HttpStatus.OK).body("Workout Plan deleted successfully");
        }


        @GetMapping("/byId/{id}")
         public ResponseEntity<Optional<WorkoutPlan>> getWorkoutPlanById(@PathVariable String id) {
           return new ResponseEntity<Optional<WorkoutPlan>>(workoutPlanService.getWorkoutPlanById(id), HttpStatus.OK);
        }

        @PutMapping("/comments/{workoutPlanId}")
    public ResponseEntity<?> addCommentToWorkOutPlan(@PathVariable String workoutPlanId, @RequestBody Comment comment) {
        WorkoutPlan updatedPlan = workoutPlanService.addCommentToWorkOutPlan(workoutPlanId, comment);

        // Create self link
        Link selfLink = WebMvcLinkBuilder
                .linkTo(WebMvcLinkBuilder.methodOn(WorkoutPlanController.class).addCommentToWorkOutPlan(workoutPlanId, comment))
                .withSelfRel();

        // Create response entity with self link
        EntityModel<WorkoutPlan> response = EntityModel.of(updatedPlan);
        response.add(selfLink);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

     @PutMapping("/like/{workoutPlanId}")
    public ResponseEntity<?> Like(@PathVariable String workoutPlanId, @RequestBody Likes like) {
        WorkoutPlan updatedPlan = workoutPlanService.like(workoutPlanId, like);
        System.out.println(like);

        // Create self link
        Link selfLink = WebMvcLinkBuilder
                .linkTo(WebMvcLinkBuilder.methodOn(WorkoutPlanController.class).Like(workoutPlanId, like)).withSelfRel();

        // Create response entity with self link
        EntityModel<WorkoutPlan> response = EntityModel.of(updatedPlan);
        response.add(selfLink);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/unlike/{workoutPlanId}")
    public ResponseEntity<?> Unlike(@PathVariable String workoutPlanId, @RequestBody Likes unlike) {
        WorkoutPlan updatedPlan = workoutPlanService.unlike(workoutPlanId, unlike);

        // Create self link
        Link selfLink = WebMvcLinkBuilder
                .linkTo(WebMvcLinkBuilder.methodOn(WorkoutPlanController.class).Unlike(workoutPlanId, unlike)).withSelfRel();

        // Create response entity with self link
        EntityModel<WorkoutPlan> response = EntityModel.of(updatedPlan);
        response.add(selfLink);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    


}
