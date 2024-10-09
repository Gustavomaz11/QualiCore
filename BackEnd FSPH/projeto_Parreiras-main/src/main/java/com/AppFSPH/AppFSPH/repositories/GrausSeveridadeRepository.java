package com.AppFSPH.AppFSPH.repositories;

import com.AppFSPH.AppFSPH.models.GrausSeveridade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrausSeveridadeRepository extends JpaRepository<GrausSeveridade, Integer> {
    // Aqui você pode adicionar métodos personalizados, se necessário
}
