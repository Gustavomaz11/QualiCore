package com.AppFSPH.AppFSPH.repositories;

import com.AppFSPH.AppFSPH.models.TiposNaoConformidade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TiposNaoConformidadeRepository extends JpaRepository<TiposNaoConformidade, Integer> {
    // Você pode adicionar métodos personalizados aqui, se necessário
}
