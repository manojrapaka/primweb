package tr.com.util;

import java.io.Serializable;

public interface GenericDAO<T, ID extends Serializable> {
    T save(T entity);
    void delete(T entity);
}