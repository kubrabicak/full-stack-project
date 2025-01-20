package com.project.ums.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotEmpty(message = "Full name must not be empty")
    @Column(name = "full_name")
    private String fullName;

    @Column(name = "display_name")
    private String displayName;

    @Email(message = "Email must be valid")
    @Column(name = "email")
    private String email;

    @Column(name = "details")
    private String details;
}

