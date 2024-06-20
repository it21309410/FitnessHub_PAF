package com.example.backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Model.WorkOutStatus;
import com.example.backend.Repository.WorkOutStatusRepository;


@Service
public class WorkOutStatusService {

    @Autowired
    private WorkOutStatusRepository workOutStatusRepository;

    public boolean addStatus(WorkOutStatus workOutStatus){

        try {
            workOutStatusRepository.save(workOutStatus);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteStatus(String id){
        Optional<WorkOutStatus> workOutStatus = workOutStatusRepository.findById(id);

        if(!workOutStatus.isEmpty()){
            workOutStatusRepository.deleteById(id);
            return true;
        }

        return false;
    }

    public boolean updateStatus(WorkOutStatus updatedWorkOutStatus){
        Optional<WorkOutStatus> workOutStatus = workOutStatusRepository.findById(updatedWorkOutStatus.get_id());

        if(!workOutStatus.isEmpty()){
            updatedWorkOutStatus.setCreatedAt(workOutStatus.get().getCreatedAt());
            workOutStatusRepository.save(updatedWorkOutStatus);
            return true;
        }

        return false;
    }

    public List<WorkOutStatus> allWorkouts(){
        return workOutStatusRepository.findAll();
    }

    public Optional<WorkOutStatus> singleStatus(String id){
        return workOutStatusRepository.findById(id);
    }
}
