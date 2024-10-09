package com.AppFSPH.AppFSPH.services;

import com.AppFSPH.AppFSPH.models.GrausSeveridade;
import com.AppFSPH.AppFSPH.repositories.GrausSeveridadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GrausSeveridadeServiceImpl implements GrausSeveridadeService {

    private final GrausSeveridadeRepository repository;

    @Autowired
    public GrausSeveridadeServiceImpl(GrausSeveridadeRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<GrausSeveridade> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<GrausSeveridade> findById(int id) {
        return repository.findById(id);
    }

    @Override
    public GrausSeveridade save(GrausSeveridade grausSeveridade) {
        return repository.save(grausSeveridade);
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }
}
