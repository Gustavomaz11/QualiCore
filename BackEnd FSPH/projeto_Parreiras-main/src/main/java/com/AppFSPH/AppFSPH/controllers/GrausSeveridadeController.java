package com.AppFSPH.AppFSPH.controllers;

import com.AppFSPH.AppFSPH.models.GrausSeveridade;
import com.AppFSPH.AppFSPH.services.GrausSeveridadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/graus-severidade")
public class GrausSeveridadeController {

    private final GrausSeveridadeService service;

    @Autowired
    public GrausSeveridadeController(GrausSeveridadeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<GrausSeveridade>> getAll() {
        List<GrausSeveridade> grausSeveridadeList = service.findAll();
        return ResponseEntity.ok(grausSeveridadeList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrausSeveridade> getById(@PathVariable int id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<GrausSeveridade> create(@RequestBody GrausSeveridade grausSeveridade) {
        GrausSeveridade createdGrausSeveridade = service.save(grausSeveridade);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGrausSeveridade);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrausSeveridade> update(@PathVariable int id, @RequestBody GrausSeveridade grausSeveridade) {
        if (service.findById(id).isPresent()) {
            grausSeveridade.setId(id);
            GrausSeveridade updatedGrausSeveridade = service.save(grausSeveridade);
            return ResponseEntity.ok(updatedGrausSeveridade);
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
