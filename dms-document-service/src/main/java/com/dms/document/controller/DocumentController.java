package com.dms.document.controller;

import com.dms.common.dto.DocumentDto;
import com.dms.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {
    private final DocumentService documentService;

    @GetMapping
    public ResponseEntity<List<DocumentDto>> getAllDocuments() {
        return ResponseEntity.ok(documentService.getAllDocuments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDto> getDocumentById(@PathVariable UUID id) {
        return ResponseEntity.ok(documentService.getDocumentById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DocumentDto>> getDocumentsByUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(documentService.getDocumentsByUser(userId));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<DocumentDto>> getDocumentsByType(@PathVariable String type) {
        return ResponseEntity.ok(documentService.getDocumentsByType(type));
    }

    @PostMapping
    public ResponseEntity<DocumentDto> createDocument(
            @RequestBody DocumentDto documentDto,
            @RequestHeader("X-User-Id") String userIdStr) {
        UUID userId = UUID.fromString(userIdStr);
        return new ResponseEntity<>(documentService.createDocument(documentDto, userId), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocumentDto> updateDocument(
            @PathVariable UUID id,
            @RequestBody DocumentDto documentDto,
            @RequestHeader("X-User-Id") String userIdStr) {
        UUID userId = UUID.fromString(userIdStr);
        return ResponseEntity.ok(documentService.updateDocument(id, documentDto, userId));
    }

    @PostMapping(value = "/{id}/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DocumentDto> uploadFile(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file,
            @RequestHeader("X-User-Id") String userIdStr) throws IOException {
        UUID userId = UUID.fromString(userIdStr);
        return ResponseEntity.ok(documentService.uploadFile(id, file, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable UUID id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
}
