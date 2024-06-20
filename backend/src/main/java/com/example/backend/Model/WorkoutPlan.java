package com.example.backend.Model;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "workoutplans")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class WorkoutPlan {
    @Id
    public String id;

    private String name;

    private String description;

    private String workoutLocation;

    //private boolean visibility;

    private String level; 

    private Date createDate;

    private Date updateDate;

    private List<Exercise> exercises;

    private String createrId;

    private String workoutPicURL;

     private List<Comment> comments = new ArrayList<>();

     private List<Likes> likes = new ArrayList<>();

    public WorkoutPlan(String createrId,  String name,String description,String workoutLocation,String level,Date createDate, Date updateDate, List<Exercise> exercises , String workoutPicURL) {
        this.createrId = createrId;
        this.name = name;
        this.description=description;
        this.workoutLocation = workoutLocation;
        this.level = level;
        this.createDate= createDate;
        this.updateDate = updateDate;
        this.exercises = exercises;
        
        this. workoutPicURL= workoutPicURL;

        

    }

}
