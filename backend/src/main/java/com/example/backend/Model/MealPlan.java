package com.example.backend.Model;

import java.util.List;
import java.util.ArrayList;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

 @Document(collection = "meal_plans")
 @Data
 @AllArgsConstructor
 @NoArgsConstructor
public class MealPlan {
    @Id
    private String id;

    // ID of the user who created the meal plan
    private String userId;

    // Name of the Meal Plan
    private String title;
   // Dietary preference of the meal plan (vegetarian, vegan, keto, etc.)
    private String mealtype;
    // List of meals included in the Meal plan
    private List<Meal> meals;
    
    private String mealsPicURL;

    private List<Comment> comments = new ArrayList<>();

    private List<Likes> likes = new ArrayList<>();

    public MealPlan(String userId, String title,String mealtype, List<Meal> meals, String mealsPicURL) {
        this.userId = userId;
        this.title = title;
        this.mealtype=mealtype;
        this.meals = meals;
        this.mealsPicURL=mealsPicURL;

        /*for (Meal meal : meals) {
            new Meal(meal.getName(), meal.getIngredients(), meal.getInstructions(), meal.getSize(),
                    meal.getNutritious(), meal.getImageUrl());
        }*/

    }
}
