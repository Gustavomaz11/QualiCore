package com.AppFSPH.AppFSPH.services;

import com.AppFSPH.AppFSPH.models.TiposNaoConformidade;
import java.util.List;
import java.util.Optional;

public interface TiposNaoConformidadeService {
    List<TiposNaoConformidade> findAll();
    Optional<TiposNaoConformidade> findById(int id);
    TiposNaoConformidade save(TiposNaoConformidade tiposNaoConformidade);
    void deleteById(int id);
}
