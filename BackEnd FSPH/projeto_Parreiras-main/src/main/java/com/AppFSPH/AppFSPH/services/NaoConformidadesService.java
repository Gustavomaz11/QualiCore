package com.AppFSPH.AppFSPH.services;

import com.AppFSPH.AppFSPH.models.NaoConformidades;
import com.AppFSPH.AppFSPH.repositories.NaoConformidadesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NaoConformidadesService {

    private final NaoConformidadesRepository naoConformidadesRepository;

    @Autowired
    public NaoConformidadesService(NaoConformidadesRepository naoConformidadesRepository) {
        this.naoConformidadesRepository = naoConformidadesRepository;
    }

    public List<NaoConformidades> findAll() {
        return naoConformidadesRepository.findAll();
    }

    public Optional<NaoConformidades> findById(int id) {
        return naoConformidadesRepository.findById(id);
    }

    public NaoConformidades save(NaoConformidades naoConformidade) {
        return naoConformidadesRepository.save(naoConformidade);
    }

    public void deleteById(int id) {
        naoConformidadesRepository.deleteById(id);
    }

    public List<NaoConformidades> findByDepartamentoId(int departamentoId) {
        return naoConformidadesRepository.findByDepartamentoId(departamentoId);
    }

    public long countByDepartamentoId(int departamentoId) {
        return naoConformidadesRepository.countByDepartamentoId(departamentoId);
    }
}
