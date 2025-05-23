package com.dms.document.repository;

import com.dms.document.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DocumentRepository extends JpaRepository<Document, UUID> {
    List<Document> findByCreatedBy(UUID userId);
    List<Document> findByType(String type);
}
