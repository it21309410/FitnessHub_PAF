package com.example.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String _id;
    private String userName;
    private String firstName;
    private String lastName;
    private String studentaddress;
    private String age;
    private String weight;
    private String height;
    private String activitylevel;
    private String goal;
    private String preferences;
    private String medical;
    private String dietary;
    private String email;
    private String password;
    private String mobile;
    private String userType;

    /*public User(String _id, String studentname, String studentaddress, String age, String weight, String height,
            String activitylevel, String goal, String preferences, String medical, String dietary, String email,
            String mobile,String password) {
        this._id = _id;
        this.studentname = studentname;
        this.studentaddress = studentaddress;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.activitylevel = activitylevel;
        this.goal = goal;
        this.preferences = preferences;
        this.medical = medical;
        this.dietary = dietary;
        this.email = email;
        this.mobile = mobile;
        this.password =password;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getWeight() {
        return weight;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getActivitylevel() {
        return activitylevel;
    }

    public void setActivitylevel(String activitylevel) {
        this.activitylevel = activitylevel;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public String getPreferences() {
        return preferences;
    }

    public void setPreferences(String preferences) {
        this.preferences = preferences;
    }

    public String getMedical() {
        return medical;
    }

    public void setMedical(String medical) {
        this.medical = medical;
    }

    public String getDietary() {
        return dietary;
    }

    public void setDietary(String dietary) {
        this.dietary = dietary;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    ////////////
    public User() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getStudentname() {
        return studentname;
    }

    public void setStudentname(String studentname) {
        this.studentname = studentname;
    }

    public String getStudentaddress() {
        return studentaddress;
    }

    public void setStudentaddress(String studentaddress) {
        this.studentaddress = studentaddress;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Override
    public String toString() {
        return "User [_id=" + _id + ", studentname=" + studentname + ", studentaddress=" + studentaddress + ", age="
                + age + ", weight=" + weight + ", height=" + height + ", activitylevel=" + activitylevel + ", goal="
                + goal + ", preferences=" + preferences + ", medical=" + medical + ", dietary=" + dietary + ", email="
                + email + ", password=" + password + ", mobile=" + mobile + "]";
    }*/
}