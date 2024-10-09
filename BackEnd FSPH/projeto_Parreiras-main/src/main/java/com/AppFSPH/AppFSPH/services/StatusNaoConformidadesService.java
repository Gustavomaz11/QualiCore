package com.AppFSPH.AppFSPH.services;

import com.AppFSPH.AppFSPH.models.StatusNaoConformidades;

import java.util.List;
import java.util.Optional;

public interface StatusNaoConformidadesService {
    List<StatusNaoConformidades> findAll();
    Optional<StatusNaoConformidades> findById(int id);
    StatusNaoConformidades save(StatusNaoConformidades statusNaoConformidades);
    void deleteById(int id);
}
