package com.AppFSPH.AppFSPH.controllers;

import com.AppFSPH.AppFSPH.models.NaoConformidades;
import com.AppFSPH.AppFSPH.services.NaoConformidadesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nao-conformidades")
public class NaoConformidadesController {

    private final NaoConformidadesService service;

    @Autowired
    public NaoConformidadesController(NaoConformidadesService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<NaoConformidades>> getAll() {
        List<NaoConformidades> naoConformidadesList = service.findAll();
        return ResponseEntity.ok(naoConformidadesList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NaoConformidades> getById(@PathVariable int id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<NaoConformidades> create(@RequestBody NaoConformidades naoConformidade) {
        // Não é necessário converter, já que o Jackson deve lidar com isso se o JSON for válido
        NaoConformidades createdNaoConformidade = service.save(naoConformidade);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNaoConformidade);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NaoConformidades> update(@PathVariable int id, @RequestBody NaoConformidades naoConformidade) {
        if (service.findById(id).isPresent()) {
            naoConformidade.setId(id);
            NaoConformidades updatedNaoConformidade = service.save(naoConformidade);
            return ResponseEntity.ok(updatedNaoConformidade);
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
    
    @GetMapping("/departamento/{departamentoId}")
    public ResponseEntity<List<NaoConformidades>> getByDepartamentoId(@PathVariable int departamentoId) {
        List<NaoConformidades> naoConformidadesList = service.findByDepartamentoId(departamentoId);
        if (naoConformidadesList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(naoConformidadesList);
    }
    @GetMapping("/departamento/{departamentoId}/count")
    public ResponseEntity<Long> countByDepartamentoId(@PathVariable int departamentoId) {
        long count = service.countByDepartamentoId(departamentoId);
        return ResponseEntity.ok(count);
    }


}
