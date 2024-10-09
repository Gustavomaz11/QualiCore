package com.AppFSPH.AppFSPH.repositories;

import com.AppFSPH.AppFSPH.models.StatusNaoConformidades;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusNaoConformidadesRepository extends JpaRepository<StatusNaoConformidades, Integer> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
