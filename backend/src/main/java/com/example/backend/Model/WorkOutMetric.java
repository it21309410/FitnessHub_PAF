package com.example.backend.Model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "workOutMetric")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class WorkOutMetric {

    private String  type;
    private double value;
    private String unit;

}
