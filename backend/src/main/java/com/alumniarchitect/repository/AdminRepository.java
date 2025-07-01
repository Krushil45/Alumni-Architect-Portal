package com.alumniarchitect.repository;

import com.alumniarchitect.entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByEmail(String email);

    Admin findByCollegeName(String collegeName);
}
