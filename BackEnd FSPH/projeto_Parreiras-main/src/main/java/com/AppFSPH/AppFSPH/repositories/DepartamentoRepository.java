package com.AppFSPH.AppFSPH.repositories;

import com.AppFSPH.AppFSPH.models.Departamento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartamentoRepository extends CrudRepository<Departamento, Long> {
    // Métodos adicionais, se necessário
}
