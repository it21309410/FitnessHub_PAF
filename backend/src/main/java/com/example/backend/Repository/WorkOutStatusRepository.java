package com.example.backend.Repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.Model.WorkOutStatus;

@Repository
public interface WorkOutStatusRepository extends MongoRepository<WorkOutStatus, String> {

   


}
