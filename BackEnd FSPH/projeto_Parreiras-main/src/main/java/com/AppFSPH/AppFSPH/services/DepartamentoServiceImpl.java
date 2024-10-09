package com.AppFSPH.AppFSPH.services;

import com.AppFSPH.AppFSPH.models.Departamento;
import com.AppFSPH.AppFSPH.repositories.DepartamentoRepository; // Certifique-se de que o repositório exista
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DepartamentoServiceImpl implements DepartamentoService {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Override
    public List<Departamento> findAll() {
        // Converter Iterable para List
        List<Departamento> departamentos = new ArrayList<>();
        departamentoRepository.findAll().forEach(departamentos::add);
        return departamentos;
    }

    @Override
    public Departamento findById(Long id) { // Alterado para Long
        Optional<Departamento> departamento = departamentoRepository.findById(id);
        return departamento.orElse(null); // Retorna null se não encontrar
    }

    @Override
    public Departamento save(Departamento departamento) {
        return departamentoRepository.save(departamento);
    }

    @Override
    public void deleteById(Long id) { // Alterado para Long
        departamentoRepository.deleteById(id);
    }
}
