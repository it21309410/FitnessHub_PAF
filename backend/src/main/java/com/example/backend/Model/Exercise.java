package com.example.backend.Model;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class Exercise {

    @Id
    private String id;
    private String name;
    private String discription;
    private String targetAreas;
    private String equipments;
    private String sets;
    private String reps;

    
    
}
