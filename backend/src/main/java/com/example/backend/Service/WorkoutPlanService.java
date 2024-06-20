package com.example.backend.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.backend.Model.Comment;
import com.example.backend.Model.Likes;


import com.example.backend.Model.WorkoutPlan;
import com.example.backend.Repository.WorkoutPlanRepository;

@Service
public class WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    public WorkoutPlan createWorkoutPlan(WorkoutPlan workoutPlan){
        workoutPlan.setCreateDate(new Date(System.currentTimeMillis()));
        workoutPlan.setUpdateDate(new Date(System.currentTimeMillis()));
        return workoutPlanRepository.save(workoutPlan);
    }

    public List<WorkoutPlan> getWorkoutPlansByUserId(String userId) {
        return workoutPlanRepository.findByCreaterId(userId);
    }

    public List<WorkoutPlan> getAllWorkoutPlans(){
        return workoutPlanRepository.findAll();
    }

    public WorkoutPlan updateWorkoutPlan(WorkoutPlan updatedWorkoutPlan) {
        String workoutPlanId = updatedWorkoutPlan.getId();
        Optional<WorkoutPlan> existingWorkoutPlanOptional = workoutPlanRepository.findById(workoutPlanId);
        if (existingWorkoutPlanOptional.isPresent()) {
            WorkoutPlan existingWorkoutPlan = existingWorkoutPlanOptional.get();
            // Update fields of existingWorkoutPlan with updatedWorkoutPlan
            existingWorkoutPlan.setName(updatedWorkoutPlan.getName());
            existingWorkoutPlan.setDescription(updatedWorkoutPlan.getDescription());
            existingWorkoutPlan.setWorkoutLocation(updatedWorkoutPlan.getWorkoutLocation());
            //existingWorkoutPlan.setVisibility(updatedWorkoutPlan.isVisibility());
            existingWorkoutPlan.setLevel(updatedWorkoutPlan.getLevel());
            existingWorkoutPlan.setExercises(updatedWorkoutPlan.getExercises());
            existingWorkoutPlan.setUpdateDate(new Date()); // Set the update date to current date/time

            // Save the updated workout plan
            return workoutPlanRepository.save(existingWorkoutPlan);
        } else {
            // Workout plan not found
            throw new RuntimeException("Workout Plan not found with ID: " + workoutPlanId);
        }
    }

    // public WorkoutPlan getWorkoutPlanById(String id) {
    //     Optional<WorkoutPlan> workoutPlanOptional = workoutPlanRepository.findById(id);
    //     return workoutPlanOptional.orElse(null);
    // }

    public boolean existsById(String workoutPlanId) {
        return workoutPlanRepository.existsById(workoutPlanId);
    }

    public void deleteWorkoutPlanById(String workoutPlanId) {
        workoutPlanRepository.deleteById(workoutPlanId);
    }
    public Optional<WorkoutPlan> getWorkoutPlanById(String id){
        return workoutPlanRepository.findById(id);
    }
     public WorkoutPlan addCommentToWorkOutPlan(String workoutPlanId, Comment comment) {
        WorkoutPlan existingWorkoutPlan = workoutPlanRepository.findById(workoutPlanId)
                .orElseThrow(() -> new RuntimeException("Workout Plan not found"));

                existingWorkoutPlan.getComments().add(comment);

        return workoutPlanRepository.save(existingWorkoutPlan);
    }

     public WorkoutPlan like(String workoutPlanId, Likes like) {
        WorkoutPlan existingWorkoutPlan = workoutPlanRepository.findById(workoutPlanId)
                .orElseThrow(() -> new RuntimeException("Workout Plan not found"));

                existingWorkoutPlan.getLikes().add(like);

        return workoutPlanRepository.save(existingWorkoutPlan);
    }
    public WorkoutPlan unlike(String workoutPlanId, Likes unlike) {
        WorkoutPlan existingWorkoutPlan = workoutPlanRepository.findById(workoutPlanId)
                .orElseThrow(() -> new RuntimeException("Mealplan not found"));

                existingWorkoutPlan.getLikes().remove(unlike);

        return workoutPlanRepository.save(existingWorkoutPlan);
    }
    

    



}
