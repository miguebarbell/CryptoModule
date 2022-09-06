package com.crypto.server.user;

import org.bson.types.ObjectId;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, ObjectId> {

}
