package com.unmsm.materiales.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.unmsm.materiales.entity.Material;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
    // Busca todos los materiales asociados a un código de curso
    List<Material> findByCursoCodigo(String cursoCodigo);
}
