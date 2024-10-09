package com.AppFSPH.AppFSPH.services;

import com.AppFSPH.AppFSPH.models.TiposNaoConformidade;
import com.AppFSPH.AppFSPH.repositories.TiposNaoConformidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TiposNaoConformidadeServiceImpl implements TiposNaoConformidadeService {

    private final TiposNaoConformidadeRepository repository;

    @Autowired
    public TiposNaoConformidadeServiceImpl(TiposNaoConformidadeRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<TiposNaoConformidade> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<TiposNaoConformidade> findById(int id) {
        return repository.findById(id);
    }

    @Override
    public TiposNaoConformidade save(TiposNaoConformidade tiposNaoConformidade) {
        return repository.save(tiposNaoConformidade);
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }
}
