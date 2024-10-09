package com.AppFSPH.AppFSPH.services;

import com.AppFSPH.AppFSPH.models.GrausSeveridade;

import java.util.List;
import java.util.Optional;

public interface GrausSeveridadeService {
    List<GrausSeveridade> findAll();
    Optional<GrausSeveridade> findById(int id);
    GrausSeveridade save(GrausSeveridade grausSeveridade);
    void deleteById(int id);
}
