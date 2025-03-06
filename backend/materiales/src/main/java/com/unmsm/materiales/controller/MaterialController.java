package com.unmsm.materiales.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.unmsm.materiales.entity.Material;
import com.unmsm.materiales.repository.MaterialRepository;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
@CrossOrigin(origins = "http://localhost:5173") // 👈 permite solicitudes desde tu frontend
@RequestMapping("/api/materiales")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;

    // Obtener todos los materiales
    @GetMapping
    public ResponseEntity<List<Material>> getAllMaterials() {
        List<Material> materials = materialRepository.findAll();
        return ResponseEntity.ok(materials);
    }

    // Obtener material por ID
    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterialById(@PathVariable Long id) {
        Optional<Material> materialOpt = materialRepository.findById(id);
        return materialOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Obtener materiales por código de curso
    // Ejemplo: GET /api/materiales/curso/C001
    @GetMapping("/curso/{cursoCodigo}")
    public ResponseEntity<List<Material>> getMaterialsByCurso(@PathVariable String cursoCodigo) {
        List<Material> materiales = materialRepository.findByCursoCodigo(cursoCodigo);
        if(materiales.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(materiales);
    }

    // Crear un nuevo material
    @PostMapping
    public ResponseEntity<Material> createMaterial(@RequestBody Material material) {
        Material savedMaterial = materialRepository.save(material);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMaterial);
    }

    // Actualizar un material existente (por ID)
    @PutMapping("/{id}")
    public ResponseEntity<Material> updateMaterial(@PathVariable Long id, @RequestBody Material materialDetails) {
        Optional<Material> materialOpt = materialRepository.findById(id);
        if(materialOpt.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Material material = materialOpt.get();
        // Actualizar campos
        material.setCursoCodigo(materialDetails.getCursoCodigo());
        material.setLink(materialDetails.getLink());

        Material updatedMaterial = materialRepository.save(material);
        return ResponseEntity.ok(updatedMaterial);
    }

    // Eliminar un material (por ID)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id) {
        if(!materialRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        materialRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}