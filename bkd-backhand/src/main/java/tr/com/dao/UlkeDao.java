package tr.com.dao;

import java.util.List;

import tr.com.entities.Ulke;

public interface UlkeDao {

    public Ulke saveOrUpdate(Ulke entity);

    public List<Ulke> getAll();

    public void deleteById(Ulke prim);

    public Ulke getById(Long id);
}
