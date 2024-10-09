package com.AppFSPH.AppFSPH.controllers;

import com.AppFSPH.AppFSPH.models.StatusNaoConformidades;
import com.AppFSPH.AppFSPH.services.StatusNaoConformidadesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/status-nao-conformidades")
public class StatusNaoConformidadesController {

    private final StatusNaoConformidadesService service;

    @Autowired
    public StatusNaoConformidadesController(StatusNaoConformidadesService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<StatusNaoConformidades>> getAll() {
        List<StatusNaoConformidades> statusList = service.findAll();
        return ResponseEntity.ok(statusList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatusNaoConformidades> getById(@PathVariable int id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<StatusNaoConformidades> create(@RequestBody StatusNaoConformidades statusNaoConformidades) {
        StatusNaoConformidades createdStatus = service.save(statusNaoConformidades);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStatus);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StatusNaoConformidades> update(@PathVariable int id, @RequestBody StatusNaoConformidades statusNaoConformidades) {
        if (service.findById(id).isPresent()) {
            statusNaoConformidades.setId(id);
            StatusNaoConformidades updatedStatus = service.save(statusNaoConformidades);
            return ResponseEntity.ok(updatedStatus);
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
