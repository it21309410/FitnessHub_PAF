package com.example.backend.Controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Request;
import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.backend.Model.WorkOutStatus;
import com.example.backend.Service.WorkOutStatusService;


@RestController
@RequestMapping("/api/v1/workouts")
public class WorkOutStatusController {

    @Autowired
    private WorkOutStatusService workOutStatusService;

    @PostMapping("/addStatus")
    public ResponseEntity<?> addStatus (@RequestBody WorkOutStatus workOutStatus){
        workOutStatus.setCreatedAt(new Date(System.currentTimeMillis()));
        workOutStatus.setUpdatedAt(new Date(System.currentTimeMillis()));

        System.out.println(Request.BASIC_AUTH);

        if (workOutStatus.getExercise() == null || workOutStatus.getExercise().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exercise is required");
        }

        if (workOutStatus.getDescription() == null || workOutStatus.getDescription().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Description is required");
        }
        if (workOutStatus.getMetrix() == null || workOutStatus.getMetrix().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Metric is required");
        }

        boolean created = workOutStatusService.addStatus(workOutStatus);
        if (created) {
            return ResponseEntity.status(HttpStatus.OK).body("Workout Status successfully created "+workOutStatus.get_id());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("not created");
        
        
    }

    @PutMapping("/updateStatus")
    public ResponseEntity<?> updateStatus (@RequestBody WorkOutStatus workOutStatus){
        workOutStatus.setUpdatedAt(new Date(System.currentTimeMillis()));
        if (workOutStatus.getExercise() == null || workOutStatus.getExercise().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exercise is required");
        }
        if (workOutStatus.getDescription() == null || workOutStatus.getDescription().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Description is required");
        }
        if (workOutStatus.getMetrix() == null || workOutStatus.getMetrix().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Atleast 1 metric is required");
        }

        boolean updated = workOutStatusService.updateStatus(workOutStatus);
        if (updated) {
            return ResponseEntity.status(HttpStatus.OK).body("Workout Status successfully updated");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workout Status Not Found");
    }

    @DeleteMapping("/deleteStatus/{id}")
    public ResponseEntity<?> deleteStatus(@PathVariable String id){
        boolean deleted = workOutStatusService.deleteStatus(id);

        if (deleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Workout Status successfully deleted");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Workout Status Not Found");
    }

    @GetMapping("/allWorkouts")
    public ResponseEntity<List<WorkOutStatus>> allWorkouts(){
        return new ResponseEntity<List<WorkOutStatus>>(workOutStatusService.allWorkouts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<WorkOutStatus>> getSingleStatus(@PathVariable String id){
        return new ResponseEntity<Optional<WorkOutStatus>>(workOutStatusService.singleStatus(id), HttpStatus.OK);
    }

}
