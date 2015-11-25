package tr.com.dao;

import java.util.List;

import tr.com.entities.Gorev;

public interface GorevDao {

    public Gorev saveOrUpdate(Gorev entity);

    public List<Gorev> getAll();

    public void deleteById(Gorev gorev);

    public Gorev getById(Long id);
}
