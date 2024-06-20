package com.example.backend.Repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.Model.WorkoutPlan;
import java.util.List;



@Repository
public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan,String>{

    List<WorkoutPlan> findByCreaterId(String createrId);

   



}
