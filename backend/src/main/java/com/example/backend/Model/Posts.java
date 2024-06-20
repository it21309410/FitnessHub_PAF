package com.example.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "posts") 
public class Posts {

    @Id
    private String id;
    private String userId;
    private String description;
    private String imageUrl;
    private String userName;
    private Integer likes;
    private String email;
    private List<String> comments; // Array of comments

    public Posts(String description, String userId, String imageUrl, Integer likes,String userName) {
        this.description = description;
        this.userId = userId;
        this.imageUrl = imageUrl;
        this.likes = likes;
        this.comments = new ArrayList<>(); 
        this.userName = userName;
        this.email = email;
    }

    public Posts() {
        this.comments = new ArrayList<>(); // Initialize the comments array
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }
    
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Posts [id=" + id + ", userId=" + userId + ", description=" + description + ", imageUrl=" + imageUrl
                + ", userName=" + userName + ", likes=" + likes + ", email=" + email + ", comments=" + comments + "]";
    }

    

    
}
