package com.AppFSPH.AppFSPH.services;

import com.AppFSPH.AppFSPH.models.StatusNaoConformidades;
import com.AppFSPH.AppFSPH.repositories.StatusNaoConformidadesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatusNaoConformidadesServiceImpl implements StatusNaoConformidadesService {

    private final StatusNaoConformidadesRepository repository;

    @Autowired
    public StatusNaoConformidadesServiceImpl(StatusNaoConformidadesRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<StatusNaoConformidades> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<StatusNaoConformidades> findById(int id) {
        return repository.findById(id);
    }

    @Override
    public StatusNaoConformidades save(StatusNaoConformidades statusNaoConformidades) {
        return repository.save(statusNaoConformidades);
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }
}
