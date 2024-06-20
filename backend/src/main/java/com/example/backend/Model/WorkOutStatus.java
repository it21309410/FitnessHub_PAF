package com.example.backend.Model;

import java.util.Date;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "workOutStatus")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkOutStatus {

    @Id
    private String _id;

    @Field("user_id")
    private String userId; // ID of the user associated with this workout status

    private String exercise;

    private String description;

    private String metrix;//List<WorkOutMetric> metrices;
    //nooflikes recieved for status
    private int likes;

    private String image;

    @CreatedDate
    private Date createdAt; //date and time for when the post is created

    @LastModifiedDate
    private Date updatedAt; //date and time for when the post is updated

    public WorkOutStatus(String exercise, String description, String metrix, int likes, String image, String userId){
        this.exercise = exercise;
        this.description = description;
        this.metrix = metrix;
        this.likes = likes;
        this.image = image;
        this.userId = userId;
    }

}
