package com.example.backend.Model;

import java.util.List;


import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Meal {
    @Id
    private String id;
      
    private String name;

    private List<String> ingredients;

    private String instructions;

    private String size;

    private List<String> nutritious;

    

    /*public Meal(String name,List<String>ingredients,String instructions,String Size,List<String>nutritious,String imageUrl) {
        this.name=name;
        this.ingredients=ingredients;
        this.instructions=instructions;
        this.Size=Size;
        this.nutritious=nutritious; 
        this.imageUrl=imageUrl;
    }*/
}
