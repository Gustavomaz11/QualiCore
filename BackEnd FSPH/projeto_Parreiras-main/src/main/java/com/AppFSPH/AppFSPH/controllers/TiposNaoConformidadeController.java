package com.AppFSPH.AppFSPH.controllers;

import com.AppFSPH.AppFSPH.models.TiposNaoConformidade;
import com.AppFSPH.AppFSPH.services.TiposNaoConformidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-nao-conformidade")
public class TiposNaoConformidadeController {

    private final TiposNaoConformidadeService service;

    @Autowired
    public TiposNaoConformidadeController(TiposNaoConformidadeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TiposNaoConformidade>> getAll() {
        List<TiposNaoConformidade> tiposNaoConformidadeList = service.findAll();
        return ResponseEntity.ok(tiposNaoConformidadeList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TiposNaoConformidade> getById(@PathVariable int id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<TiposNaoConformidade> create(@RequestBody TiposNaoConformidade tiposNaoConformidade) {
        TiposNaoConformidade createdTipoNaoConformidade = service.save(tiposNaoConformidade);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTipoNaoConformidade);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TiposNaoConformidade> update(@PathVariable int id, @RequestBody TiposNaoConformidade tiposNaoConformidade) {
        if (service.findById(id).isPresent()) {
            tiposNaoConformidade.setId(id);
            TiposNaoConformidade updatedTipoNaoConformidade = service.save(tiposNaoConformidade);
            return ResponseEntity.ok(updatedTipoNaoConformidade);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
