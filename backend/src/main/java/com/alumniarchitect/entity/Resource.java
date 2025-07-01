package com.alumniarchitect.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "resources")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Resource {
    @Id
    private String id;
    private String email;
    private String fullName;
    private String title;
    private String description;
    private String profileImgUrl;
    private String sem;
    private String branch;
    private String resourceUrl;
}
