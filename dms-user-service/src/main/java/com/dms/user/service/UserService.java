package com.dms.user.service;

import com.dms.common.dto.UserDto;
import com.dms.common.exception.ResourceNotFoundException;
import com.dms.user.entity.Department;
import com.dms.user.entity.User;
import com.dms.user.repository.DepartmentRepository;
import com.dms.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
            .map(this::mapToUserDto)
            .collect(Collectors.toList());
    }

    public UserDto getUserById(UUID id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return mapToUserDto(user);
    }

    public List<UserDto> getUsersByDepartment(UUID departmentId) {
        return userRepository.findByDepartmentId(departmentId).stream()
            .map(this::mapToUserDto)
            .collect(Collectors.toList());
    }

    @Transactional
    public UserDto createUser(UserDto userDto) {
        Department department = null;
        if (userDto.getDepartmentId() != null) {
            department = departmentRepository.findById(userDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        }
        
        User user = User.builder()
            .id(userDto.getId())
            .name(userDto.getName())
            .email(userDto.getEmail())
            .role(userDto.getRole())
            .active(userDto.isActive())
            .department(department)
            .build();
        
        User savedUser = userRepository.save(user);
        return mapToUserDto(savedUser);
    }

    @Transactional
    public UserDto updateUser(UUID id, UserDto userDto) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        
        Department department = null;
        if (userDto.getDepartmentId() != null) {
            department = departmentRepository.findById(userDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        }
        
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        user.setActive(userDto.isActive());
        user.setDepartment(department);
        
        User updatedUser = userRepository.save(user);
        return mapToUserDto(updatedUser);
    }

    public void deleteUser(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .role(user.getRole())
            .active(user.isActive())
            .departmentId(user.getDepartment() != null ? user.getDepartment().getId() : null)
            .departmentName(user.getDepartment() != null ? user.getDepartment().getName() : null)
            .build();
    }
}
