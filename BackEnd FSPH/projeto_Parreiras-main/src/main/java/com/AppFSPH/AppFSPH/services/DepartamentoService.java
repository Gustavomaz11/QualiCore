package com.AppFSPH.AppFSPH.services;

import com.AppFSPH.AppFSPH.models.Departamento;

import java.util.List;

public interface DepartamentoService {
    List<Departamento> findAll();
    Departamento findById(Long id); // Alterado para Long
    Departamento save(Departamento departamento);
    void deleteById(Long id); // Alterado para Long
}
